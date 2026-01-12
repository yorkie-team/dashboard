/*
 * Copyright 2026 The Yorkie Authors. All rights reserved.
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

import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createInviteAsync, selectCreateInviteStatus, resetCreateInviteStatus } from './membersSlice';
import { InviteExpireOption } from 'api';
import { Button, Icon, Modal, Dropdown, CopyButton, Popover, CodeBlock } from 'components';

const INVITE_ROLE = 'member';

const EXPIRE_OPTIONS: Array<{ value: InviteExpireOption; label: string }> = [
  { value: InviteExpireOption.ONE_HOUR, label: '1 hour' },
  { value: InviteExpireOption.TWENTY_FOUR_HOURS, label: '24 hours' },
  { value: InviteExpireOption.SEVEN_DAYS, label: '7 days' },
];

function buildInviteURL(token: string): string {
  // NOTE: The user-facing invite URL should always be under `/dashboard/invite`.
  // This matches the production path and avoids relying on BASE_URL.
  const url = new URL('/dashboard/invite', window.location.origin);
  url.searchParams.set('token', token);
  return url.toString();
}

export function InviteLink() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';

  const createInviteStatus = useAppSelector(selectCreateInviteStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expireOption, setExpireOption] = useState<InviteExpireOption>(InviteExpireOption.TWENTY_FOUR_HOURS);
  const [expireDropdownOpen, setExpireDropdownOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    dispatch(resetCreateInviteStatus());
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setExpireOption(InviteExpireOption.TWENTY_FOUR_HOURS);
    setExpireDropdownOpen(false);
    dispatch(resetCreateInviteStatus());
  }, [dispatch]);

  const selectedExpire = EXPIRE_OPTIONS.find((o) => o.value === expireOption);

  const token = createInviteStatus.token || '';
  const inviteURL = useMemo(() => (token ? buildInviteURL(token) : ''), [token]);

  const handleCreateInvite = useCallback(() => {
    if (!projectName) return;
    dispatch(
      createInviteAsync({
        projectName,
        role: INVITE_ROLE,
        expireOption,
      }),
    );
  }, [dispatch, projectName, expireOption]);

  return (
    <>
      <Button
        type="button"
        color="primary"
        icon={<Icon type="plus" />}
        onClick={openModal}
        outline
        style={{ borderColor: 'var(--orange-dark)' }}
      >
        Invite Member
      </Button>

      {isModalOpen && (
        <Modal>
          <Modal.Top>
            <Modal.Title>Invite Member</Modal.Title>
            <Modal.CloseButton onClick={closeModal} />
          </Modal.Top>
          <Modal.Content>
            <div className="form_group">
              <label htmlFor="expire" className="form_label">
                Expiration
              </label>
              <Popover opened={expireDropdownOpen} onChange={setExpireDropdownOpen}>
                <div style={{ position: 'relative', marginTop: '6px' }}>
                  <Popover.Target>
                    <Button
                      type="button"
                      outline
                      disabled={createInviteStatus.status === 'loading'}
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      {selectedExpire?.label || 'Select expiration'}
                      <Icon type="openSelector" />
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div
                      style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 1000, width: '100%' }}
                    >
                      <Dropdown shadow="s">
                        <Dropdown.List>
                          {EXPIRE_OPTIONS.map((o) => (
                            <Dropdown.Item
                              key={o.value}
                              onClick={() => {
                                setExpireOption(o.value);
                                setExpireDropdownOpen(false);
                              }}
                            >
                              <Dropdown.Text>{o.label}</Dropdown.Text>
                              {expireOption === o.value && <Icon type="check" color="orange_0" />}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.List>
                      </Dropdown>
                    </div>
                  </Popover.Dropdown>
                </div>
              </Popover>
            </div>

            {createInviteStatus.error && <p className="text_error">{createInviteStatus.error}</p>}

            <div className="form_group" style={{ marginTop: '20px' }}>
              <label htmlFor="expire" className="form_label">
                Invite Link
              </label>

              {inviteURL === '' && (
                <p style={{ marginTop: '6px', fontSize: '13px', lineHeight: '18px', color: 'var(--gray-500)' }}>
                  Click the "Generate" button to create an invitation link.
                </p>
              )}
              {inviteURL && (
                <>
                  <div className="codeblock_box" style={{ marginTop: '12px' }}>
                    <div className="codeblock">
                      <CodeBlock.Code code={inviteURL} language="" />
                    </div>
                    <div className="btn_area">
                      <CopyButton value={inviteURL} timeout={1000}>
                        {({ copied, copy }) => (
                          <>
                            <Button icon={<Icon type="copy" />} outline onClick={copy} />
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
                  <p style={{ marginTop: '8px', fontSize: '13px', lineHeight: '18px', color: 'var(--gray-500)' }}>
                    Share this link to invite someone to the project. Anyone with the link can request to join.
                  </p>
                </>
              )}
            </div>
          </Modal.Content>
          <Modal.Bottom>
            <Button type="button" onClick={closeModal} outline>
              Close
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={handleCreateInvite}
              disabled={!projectName || createInviteStatus.status === 'loading'}
              style={{ borderColor: 'var(--orange-dark)' }}
            >
              {createInviteStatus.status === 'loading' ? 'Generating...' : 'Generate'}
            </Button>
          </Modal.Bottom>
        </Modal>
      )}
    </>
  );
}
