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
import * as moment from 'moment';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectDocumentList,
  listDocumentsAsync,
  searchDocumentsAsync,
  removeDocumentByAdminAsync,
} from './documentsSlice';
import { Button, SearchBar, Icon, Checkbox } from 'components';
import { selectPreferences } from 'features/users/usersSlice';

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
  const handleChangeQuery = useCallback((e) => {
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
    (e) => {
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
    <>
      <SearchBar
        placeholder={`Search ${query === null ? 'Documents' : documents.length + ' documents'}`}
        autoComplete="off"
        onChange={handleChangeQuery}
        value={query ?? ''}
        onSubmit={handleSearch}
      >
        {selectedDocKeys.length && (
          <Button.Box>
            <Button
              icon={<Icon type="trash" />}
              outline={false}
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
            <Button icon={<Icon type="close" />} outline={false} size="sm" onClick={() => setSelectedDocKeys([])}>
              Cancel
            </Button>
          </Button.Box>
        )}
      </SearchBar>
      <div className="document_table is_edit">
        {!isDetailOpen && (
          <div className="thead">
            <span className="th id">Document Key</span>
            <span className="th updated">Last Updated</span>
            <span className="th select">
              <button
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
              </button>
            </span>
          </div>
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
                        {moment.unix(updatedAt).format(`${use24HourClock ? 'MMM D, H:mm' : 'MMM D, h:mm A'}`)}
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
          <div className="placeholder_box no_bg">
            <p className="desc">No Document Found</p>
          </div>
        )}
      </div>
      {documents.length > 0 && queryType === 'all' && (
        <div className="pagination">
          <Button.Box>
            <Button onClick={handlePrevBtnClicked} disabled={!hasPrevious} outline icon={<Icon type="previous" />}>
              Prev
            </Button>
            <Button onClick={handleNextBtnClicked} disabled={!hasNext} outline icon={<Icon type="next" />}>
              Next
            </Button>
          </Button.Box>
        </div>
      )}
    </>
  );
}
