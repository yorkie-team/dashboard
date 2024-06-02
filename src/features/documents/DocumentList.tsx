/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectDocumentList,
  listDocumentsAsync,
  searchDocumentsAsync,
  removeDocumentByAdminAsync,
} from './documentsSlice';
import { SearchBar, Icon, Checkbox } from 'components';
import { selectPreferences } from 'features/users/usersSlice';
import { Button, Flex, Box, Text } from 'yorkie-ui';

export function DocumentList({ isDetailOpen = false }: { isDetailOpen?: boolean }) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const documentKey = params.documentKey || '';
  const { type: queryType, documents, hasPrevious, hasNext, status } = useAppSelector(selectDocumentList);
  const { use24HourClock } = useAppSelector(selectPreferences);
  const previousProjectName = useLocation().state?.previousProjectName;
  const [selectedDocKeys, setSelectedDocKeys] = useState<Array<string>>([]);

  const [query, SetQuery] = useState<string | null>(null);
  const handleChangeQuery = useCallback((e: any) => {
    SetQuery(e.target.value);
  }, []);

  const handlePrevBtnClicked = useCallback(() => {
    dispatch(
      listDocumentsAsync({
        projectName,
        isForward: true,
        previousID: documents[0].id,
      }),
    );
  }, [dispatch, projectName, documents]);

  const handleNextBtnClicked = useCallback(() => {
    const lastDocument = documents[documents.length - 1];
    dispatch(
      listDocumentsAsync({
        projectName,
        isForward: false,
        previousID: lastDocument.id,
      }),
    );
  }, [dispatch, projectName, documents]);

  const handleSearch = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (query === null || query === '') {
        dispatch(listDocumentsAsync({ projectName, isForward: false }));
        return;
      }

      dispatch(
        searchDocumentsAsync({
          projectName,
          documentQuery: query,
        }),
      );

      SetQuery('');
    },
    [dispatch, projectName, query],
  );

  useEffect(() => {
    if (previousProjectName === projectName) return;

    dispatch(listDocumentsAsync({ projectName, isForward: false }));
  }, [dispatch, previousProjectName, projectName]);

  return (
    <Box
      paddingBlock={{ base: '6', lg: '10' }}
      marginInline="auto"
      paddingInline={{ base: '6', lg: '0' }}
      width={{
        sm: 'breakpoint-sm',
        md: 'breakpoint-md',
        lg: 'breakpoint-lg',
        xl: 'breakpoint-xl',
      }}
    >
      <SearchBar
        placeholder={`Search ${query === null ? 'Documents' : documents.length + ' documents'}`}
        autoComplete="off"
        onChange={handleChangeQuery}
        value={query ?? ''}
        onSubmit={handleSearch}
      >
        {selectedDocKeys.length && (
          <Box>
            <Button
              icon={<Icon type="trash" />}
              size="sm"
              onClick={async () => {
                await Promise.all(
                  selectedDocKeys.map((docKey) =>
                    dispatch(removeDocumentByAdminAsync({ projectName, documentKey: docKey, force: false })),
                  ),
                );
                setSelectedDocKeys([]);
                // TODO(hackerwins): need to keep the current page after deleting documents.
                dispatch(listDocumentsAsync({ projectName, isForward: false }));
              }}
            >
              Delete
            </Button>
            <Button icon={<Icon type="close" />} size="sm" onClick={() => setSelectedDocKeys([])}>
              Cancel
            </Button>
          </Box>
        )}
      </SearchBar>
      <div className="document_table is_edit">
        {!isDetailOpen && (
          <Box>
            <Flex justifyContent="space-between" marginTop="8">
              <Text fontSize="sm" fontWeight="semibold" color="neutral.default">
                Document Key
              </Text>
              <Text fontSize="sm" fontWeight="semibold" color="neutral.default">
                Last Updated
              </Text>
            </Flex>
            <Box>
              {documents.length > 0 && (
                <Button
                  className="btn_all_check"
                  onClick={() => {
                    if (selectedDocKeys.length === documents.length) {
                      setSelectedDocKeys([]);
                      return;
                    }

                    setSelectedDocKeys(documents.map((doc) => doc.key));
                  }}
                >
                  {documents.length ? 'Select All' : ''}
                </Button>
              )}
            </Box>
          </Box>
        )}
        {status === 'loading' && (
          <div className="box_skeleton">
            <p className="blind">Loading</p>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
          </div>
        )}
        {status === 'failed' && (
          <div className="placeholder_box no_bg">
            <p className="desc">
              Search failed.
              <br />
              Please try refreshing the page.
            </p>
          </div>
        )}
        {status === 'idle' && (
          <ul className="tbody_list">
            {documents.map((document) => {
              const { key, updatedAt } = document;
              return (
                <li key={key} className="tbody_item">
                  <Link
                    to={`./${key}`}
                    state={{ previousProjectName: projectName }}
                    className={classNames('link', { is_active: key === documentKey })}
                  >
                    <span className="td id">{key}</span>
                    {!isDetailOpen && (
                      <span className="td updated">
                        {format(fromUnixTime(updatedAt), `${use24HourClock ? 'MMM d, h:mm' : 'MMM d, h:mm aa'}`)}
                      </span>
                    )}
                  </Link>
                  {!isDetailOpen && (
                    <span className="td select">
                      <Checkbox
                        id={key}
                        onChange={() => {
                          setSelectedDocKeys((prev) => {
                            if (prev.includes(key)) {
                              return prev.filter((item) => item !== key);
                            }
                            return [...prev, key];
                          });
                        }}
                        checked={selectedDocKeys.includes(key)}
                      />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {status === 'idle' && documents.length === 0 && (
          <Box paddingBlock="20">
            <Text align="center" fontWeight="semibold" fontSize="xl">
              No Document Found
            </Text>
          </Box>
        )}
      </div>
      {documents.length > 0 && queryType === 'all' && (
        <Flex gap="10">
          <Button
            onClick={handlePrevBtnClicked}
            disabled={!hasPrevious}
            variant="outline"
            icon={<Icon type="previous" />}
          >
            Prev
          </Button>
          <Button onClick={handleNextBtnClicked} disabled={!hasNext} variant="outline" icon={<Icon type="next" />}>
            Next
          </Button>
        </Flex>
      )}
    </Box>
  );
}
