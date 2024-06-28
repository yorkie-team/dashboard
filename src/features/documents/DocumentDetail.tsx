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

import React, { useEffect, useState, useCallback } from 'react';
import { fromUnixTime, format } from 'date-fns';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectDocumentDetail,
  getDocumentAsync,
  removeDocumentByAdminAsync,
  listDocumentHistoriesAsync,
  selectDocumentHistory,
  setHistory,
  resetHistory,
} from './documentsSlice';
import { Icon, Button, CodeBlock, CopyButton, Popover, Dropdown } from 'components';
import Slider from 'rc-slider';
import './rc-slider.css';

export function DocumentDetail() {
  const navigate = useNavigate();
  const { document } = useAppSelector(selectDocumentDetail);
  const { histories, status: historyStatus, hasNext, hasPrevious } = useAppSelector(selectDocumentHistory);
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const documentKey = params.documentKey || '';
  const documentJSON = document ? JSON.parse(document.snapshot) : {};
  const documentJSONStr = JSON.stringify(documentJSON, null, '\t');
  const [viewType, SetViewType] = useState('code');
  const [opened, setOpened] = useState(false);

  const getHistories = useCallback(() => {
    dispatch(
      listDocumentHistoriesAsync({
        projectName,
        documentKey,
        isForward: false,
      }),
    );
  }, [dispatch, projectName, documentKey]);

  const handleClickHistories = useCallback(
    (i) => {
      dispatch(setHistory(i));
    },
    [dispatch],
  );

  const handlePrevHistories = useCallback(() => {
    dispatch(
      listDocumentHistoriesAsync({
        projectName,
        documentKey,
        isForward: false,
        previousSeq: histories[0].serverSeq,
      }),
    );
  }, [dispatch, projectName, documentKey, histories]);

  const handleNextHistories = useCallback(() => {
    dispatch(
      listDocumentHistoriesAsync({
        projectName,
        documentKey,
        isForward: true,
        previousSeq: histories[histories.length - 1].serverSeq,
      }),
    );
  }, [dispatch, projectName, documentKey, histories]);

  useEffect(() => {
    // dispatch(
    //   getDocumentAsync({
    //     projectName,
    //     documentKey,
    //   }),
    // );
    dispatch(resetHistory());
  }, [dispatch, projectName, documentKey]);

  if (!document) {
    return (
      <Button icon={<Icon type="play" />} outline color="toggle" onClick={getHistories}>
        History
      </Button>
    );
  }

  return (
    <div className="detail_content">
      <div className="document_header">
        <div className="title_box">
          <Link to="../" state={{ previousProjectName: projectName }} className="btn_back">
            <Icon type="arrowBack" />
          </Link>
          <div className="title_inner">
            <strong className="title">{document?.key}</strong>
            <span className="date">{format(fromUnixTime(document?.updatedAt!), 'MMM d, h:mm')}</span>
          </div>

          <Popover opened={opened} onChange={setOpened}>
            <Popover.Target>
              <button type="button" className="btn btn_more">
                <Icon type="moreLarge" />
              </button>
            </Popover.Target>
            <Popover.Dropdown>
              <Dropdown>
                <Dropdown.Title>More Options</Dropdown.Title>
                <Dropdown.List>
                  <Dropdown.Item
                    onClick={async () => {
                      await dispatch(
                        removeDocumentByAdminAsync({ projectName, documentKey: documentKey, force: false }),
                      );
                      navigate(`..`, { replace: true });
                    }}
                  >
                    <Dropdown.Text highlight>Delete Document</Dropdown.Text>
                  </Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
      <div className="codeblock_header">
        <div className="box_left">
          <Button icon={<Icon type="play" />} outline color="toggle" onClick={getHistories}>
            History
          </Button>
        </div>
        <div className="box_right">
          <Button
            icon={<Icon type="codeSnippet" />}
            color="toggle"
            onClick={() => SetViewType('code')}
            className={viewType === 'code' ? 'is_active' : ''}
          />
          <Button
            icon={<Icon type="branch" />}
            color="toggle"
            onClick={() => SetViewType('tree')}
            className={viewType === 'tree' ? 'is_active' : ''}
          />
          <div className="btn_area">
            <CopyButton value={document?.snapshot || ''} timeout={1000}>
              {({ copied, copy }) => (
                <>
                  <Button icon={<Icon type="copy" />} color="toggle" outline onClick={copy} />
                  {copied && (
                    <div className="toast_box shadow_l">
                      <Icon type="check" />
                      Copied
                    </div>
                  )}
                </>
              )}
            </CopyButton>
          </div>
        </div>
      </div>
      <div>
        {historyStatus === 'idle' && histories.length !== 0 && (
          <div className="w-full px-4">
            <Slider
              dots
              min={0}
              max={histories.length - 1}
              step={1}
              defaultValue={histories.length - 1}
              onChange={handleClickHistories}
              included={false}
              handleStyle={{ borderColor: '#3C9AF1' }}
            />
          </div>
        )}
      </div>
      {viewType === 'code' && (
        <div className="codeblock">
          <CodeBlock.Code code={documentJSONStr} language="json" withLineNumbers />
        </div>
      )}
      {viewType === 'tree' && (
        <div className="codeblock_tree_box">
          <CodeBlock.Tree code={documentJSON} />
        </div>
      )}
    </div>
  );
}
