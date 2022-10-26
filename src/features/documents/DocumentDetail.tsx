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

import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectDocumentDetail, getDocumentAsync } from './documentsSlice';
import { Icon, Button, CodeBlock, CopyButton } from 'components';

export function DocumentDetail() {
  const { document } = useAppSelector(selectDocumentDetail);
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const documentKey = params.documentKey || '';
  const documentJSON = document ? JSON.parse(document.snapshot) : {};
  const documentJSONStr = JSON.stringify(documentJSON, null, '\t');
  const [viewType, SetViewType] = useState('code');

  useEffect(() => {
    dispatch(
      getDocumentAsync({
        projectName,
        documentKey,
      }),
    );
  }, [dispatch, projectName, documentKey]);

  return (
    <div className="detail_content">
      <div className="document_header">
        <div className="title_box">
          <Button href="../" className="btn_back" icon={<Icon type="arrowBack" />} as="link" />
          <div className="title_inner">
            <strong className="title">{document?.key}</strong>
            <span className="date">{moment.unix(document?.updatedAt!).format('MMM D, H:mm')}</span>
          </div>
        </div>
      </div>
      <div className="codeblock_header">
        <div className="box_left"></div>
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
