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
import ReactJson from 'react-json-view';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from './prismThemeLight';
import './rc-slider.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectDocumentDetail,
  getDocumentAsync,
  resetHistory,
} from './documentsSlice';
import { Icon, Button } from 'components';

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
    dispatch(resetHistory());
  }, [dispatch, projectName, documentKey]);

  // TODO(hackerwins): Remove user-select: none from the code block.
  return (
    <div className="detail_content">
      <div className="document_header">
        <div className="title_box">
          <Button href="../" className="btn_back" icon={<Icon type="arrowBack" />} as="link" />
          <div className="title_inner">
            <strong className="title">{document?.key}</strong>
            <span className="date">{moment.unix(document?.updatedAt!).format('YYYY-MM-DD')}</span>
          </div>
        </div>
      </div>
      <div className="codeblock_header">
        <div className="box_left">
          <Button className="gray50" outline icon={<Icon type="play" />} >
            <span className="text">History</span>
          </Button>
        </div>
        <div className="box_right">
          <Button icon={<Icon type="codeSnippet" />} color="toggle" onClick={() => SetViewType('code')} className={viewType === 'code' ? 'is_active' : ''} />
          <Button icon={<Icon type="branch" />} color="toggle" onClick={() => SetViewType('tree')} className={viewType === 'tree' ? 'is_active' : ''} />
          <Button icon={<Icon type="copy" />} color="toggle" className="btn_line gray50" onClick={() => {
            // TODO(hackerwins): Extract clipboard module to the common.
            navigator.clipboard
              .writeText(document?.snapshot || '')
              .then(() => {
                // TODO(chacha912): Replace `alert()` with alert component
                alert('Copied!');
              })
              .catch(() => {
                alert('Copy failed! Please try again.');
              });
          }} />
        </div>
      </div>
      {viewType === 'code' && (
        <div className="codeblock_box">
          <Highlight {...defaultProps} code={documentJSONStr} theme={theme} language='json'>
            {({ className, tokens, getLineProps, getTokenProps }) => (
              <pre className={className}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    <span className='line-number'>{i + 1}</span>
                    <span className='line-content'>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      )}
      {viewType === 'tree' && (
        <div className="codeblock_tree_box">
          <ReactJson
            src={documentJSON}
            displayObjectSize={false}
            displayDataTypes={false}
            theme={{
              base00: 'null',
              base01: 'null',
              base02: 'null',
              base03: 'null',
              base04: 'null',
              base05: 'null',
              base06: 'null',
              base07: 'null',
              base08: 'null',
              base09: 'null',
              base0A: 'null',
              base0B: 'null',
              base0C: 'null',
              base0D: 'null',
              base0E: 'null',
              base0F: 'null',
            }}
          />
        </div>
      )}
    </div>
  )
}
