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

import { useEffect, useState } from 'react';
import { fromUnixTime, format } from 'date-fns';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPreferences } from 'features/users/usersSlice';
import { selectDocumentDetail, getDocumentAsync, removeDocumentByAdminAsync } from './documentsSlice';
import { selectCurrentProject } from 'features/projects/projectsSlice';
import { Icon, Button, CodeBlock, CopyButton, Popover, Dropdown, Modal } from 'components';
import { formatNumber, humanFileSize } from 'utils/format';

export function DocumentDetail() {
  const navigate = useNavigate();
  const { document } = useAppSelector(selectDocumentDetail);
  const { project: currentProject } = useAppSelector(selectCurrentProject);
  const { use24HourClock } = useAppSelector(selectPreferences);
  const dispatch = useAppDispatch();
  const params = useParams();
  const documentKey = params.documentKey || '';
  const documentJSON = document ? JSON.parse(document.root) : {};
  const documentJSONStr = JSON.stringify(documentJSON, null, '\t');
  const [showContent, setShowContent] = useState<'root' | 'presence'>('root');
  const [opened, setOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!currentProject || !documentKey) return;

    dispatch(getDocumentAsync({ documentKey }));
  }, [dispatch, currentProject, documentKey]);

  if (!document) {
    return null;
  }

  return (
    <>
      <div className="detail_content">
        <div className="document_header">
          <div className="title_box">
            <Link to="../" className="btn_back">
              <Icon type="arrowBack" />
            </Link>
            <div className="title_inner">
              <strong className="title">{document?.key}</strong>
              <span className="date">
                {format(
                  fromUnixTime(document?.updatedAt!),
                  `MMM d${new Date().getFullYear() === fromUnixTime(document?.updatedAt!).getFullYear() ? '' : ', yyyy'}, ${use24HourClock ? 'HH:mm' : 'h:mm a'}`,
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
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    >
                      <Dropdown.Text highlight>Delete Document</Dropdown.Text>
                    </Dropdown.Item>
                  </Dropdown.List>
                </Dropdown>
              </Popover.Dropdown>
            </Popover>
          </div>
          <dl className="info_list">
            <div className="info_item">
              <dt className="info_title">Clients</dt>
              <dd className="info_desc">{formatNumber(document?.attachedClients)}</dd>
            </div>
            <div className="info_item right_align">
              <dt className="info_title">Size</dt>
              <dd className="info_desc">
                live: {humanFileSize((document.docSize?.live?.data ?? 0) + (document.docSize?.live?.meta ?? 0))}, gc:{' '}
                {humanFileSize((document.docSize?.gc?.data ?? 0) + (document.docSize?.gc?.meta ?? 0))}
              </dd>
            </div>
          </dl>
        </div>
        <div className="codeblock_header">
          <div className="box_left">
            {document.schemaKey && (
              <span className="badge">
                <Icon type="viewList" />
                {document.schemaKey}
              </span>
            )}
          </div>
          <div className="box_right">
            <Button
              icon={<Icon type="branch" />}
              color="toggle"
              onClick={() => setShowContent('root')}
              className={showContent === 'root' ? 'is_active' : ''}
            />
            <Button
              icon={<Icon type="addMember" />}
              color="toggle"
              onClick={() => setShowContent('presence')}
              className={showContent === 'presence' ? 'is_active' : ''}
            />
            <div className="btn_area">
              <CopyButton value={document?.root || ''} timeout={1000}>
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
        {showContent === 'root' && (
          <div className="codeblock">
            <CodeBlock.Code code={documentJSONStr} language="json" withLineNumbers />
          </div>
        )}
        {showContent === 'presence' && (
          <div className="codeblock">
            <CodeBlock.Code
              code={JSON.stringify(document.presences, null, '\t') || '{}'}
              language="json"
              withLineNumbers
            />
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal>
          <Modal.Top>
            <Icon type="alert" className="red_0" />
          </Modal.Top>
          <Modal.Content>
            <Modal.Title>Are you sure you want to delete this document?</Modal.Title>
          </Modal.Content>
          <Modal.Bottom>
            <Button.Box fullWidth>
              <Button
                outline
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                No, cancel
              </Button>
              <Button
                color="danger"
                onClick={async () => {
                  await dispatch(removeDocumentByAdminAsync({ documentKey: documentKey, force: false }));
                  navigate(`..`, { replace: true });
                }}
              >
                Yes, delete
              </Button>
            </Button.Box>
          </Modal.Bottom>
        </Modal>
      )}
    </>
  );
}
