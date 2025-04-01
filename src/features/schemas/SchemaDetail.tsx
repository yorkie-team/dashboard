/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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
import { fromUnixTime, format } from 'date-fns';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPreferences } from 'features/users/usersSlice';
import { selectSchemaDetail, getSchemaAsync, removeSchemaAsync } from './schemasSlice';
import { Icon, Button, CodeBlock, CopyButton, Popover, Dropdown } from 'components';

export function SchemaDetail() {
  const navigate = useNavigate();
  const { schema } = useAppSelector(selectSchemaDetail);
  const { use24HourClock } = useAppSelector(selectPreferences);
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const schemaName = params.schemaName || '';
  const schemaJSON = schema ? JSON.parse(schema.body) : {};
  const schemaJSONStr = JSON.stringify(schemaJSON, null, '\t');
  const [viewType, SetViewType] = useState('code');
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(
      getSchemaAsync({
        projectName,
        schemaName,
        version: 0,
      }),
    );
  }, [dispatch, projectName, schemaName]);

  if (!schema) {
    return null;
  }

  return (
    <div className="detail_content">
      <div className="document_header">
        <div className="title_box">
          <Link to="../" state={{ previousProjectName: projectName }} className="btn_back">
            <Icon type="arrowBack" />
          </Link>
          <div className="title_inner">
            <strong className="title">{schema?.name}</strong>
            <span className="date">
              {format(
                fromUnixTime(schema?.createdAt!),
                `MMM d${new Date().getFullYear() === fromUnixTime(schema?.createdAt!).getFullYear() ? '' : ', yyyy'}, ${use24HourClock ? 'HH:mm' : 'h:mm a'}`,
              )}
            </span>
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
                      await dispatch(removeSchemaAsync({ projectName, schemaName, version: 1 }));
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
            <CopyButton value={schema?.body || ''} timeout={1000}>
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
          <CodeBlock.Code code={schemaJSONStr} language="json" withLineNumbers />
        </div>
      )}
      {viewType === 'tree' && (
        <div className="codeblock_tree_box">
          <CodeBlock.Tree code={schemaJSON} />
        </div>
      )}
    </div>
  );
}
