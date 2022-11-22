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
import { Link, useParams } from 'react-router-dom';
import * as moment from 'moment';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectDocumentList, listDocumentsAsync, searchDocumentsAsync } from './documentsSlice';
import { Button, SearchBar, Icon } from 'components';

export function DocumentList({ isDetailOpen = false }: { isDetailOpen?: boolean }) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const documentKey = params.documentKey || '';
  const { type: queryType, documents, hasPrevious, hasNext, status } = useAppSelector(selectDocumentList);

  const [query, SetQuery] = useState('');
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
      if (query === '') {
        dispatch(listDocumentsAsync({ projectName, isForward: false }));
        return;
      }

      dispatch(
        searchDocumentsAsync({
          projectName,
          documentQuery: query,
        }),
      );
    },
    [dispatch, projectName, query],
  );

  useEffect(() => {
    dispatch(listDocumentsAsync({ projectName, isForward: false }));
  }, [dispatch, projectName]);

  return (
    <>
      <SearchBar
        placeholder="Search Documents"
        autoComplete="off"
        onChange={handleChangeQuery}
        value={query}
        onSubmit={handleSearch}
      />
      <div className="document_table">
        {!isDetailOpen && (
          <div className="thead">
            <span className="th id">Document ID</span>
            <span className="th updated">Last updated</span>
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
                  <Link to={`./${key}`} className={classNames('link', { is_active: key === documentKey })}>
                    <span className="td id">{key}</span>
                    {!isDetailOpen && (
                      <span className="td updated">{moment.unix(updatedAt).format('MMM D, H:mm')}</span>
                    )}
                  </Link>
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
