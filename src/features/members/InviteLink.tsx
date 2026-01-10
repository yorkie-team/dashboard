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
import { Button, Icon, Modal, Dropdown, CopyButton, Popover } from 'components';

const ROLES = [
  { value: 'member', label: 'Member' },
  { value: 'admin', label: 'Admin' },
];

const EXPIRE_OPTIONS: Array<{ value: InviteExpireOption; label: string }> = [
  { value: InviteExpireOption.ONE_HOUR, label: '1 hour' },
  { value: InviteExpireOption.TWENTY_FOUR_HOURS, label: '24 hours' },
  { value: InviteExpireOption.SEVEN_DAYS, label: '7 days' },
  { value: InviteExpireOption.NEVER, label: 'Never' },
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
  const [role, setRole] = useState('member');
  const [expireOption, setExpireOption] = useState<InviteExpireOption>(InviteExpireOption.TWENTY_FOUR_HOURS);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [expireDropdownOpen, setExpireDropdownOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    dispatch(resetCreateInviteStatus());
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setRole('member');
    setExpireOption(InviteExpireOption.TWENTY_FOUR_HOURS);
    setRoleDropdownOpen(false);
    setExpireDropdownOpen(false);
    dispatch(resetCreateInviteStatus());
  }, [dispatch]);

  const selectedRole = ROLES.find((r) => r.value === role);
  const selectedExpire = EXPIRE_OPTIONS.find((o) => o.value === expireOption);

  const token = createInviteStatus.token || '';
  const inviteURL = useMemo(() => (token ? buildInviteURL(token) : ''), [token]);

  const handleCreateInvite = useCallback(() => {
    if (!projectName) return;
    dispatch(
      createInviteAsync({
        projectName,
        role,
        expireOption,
      }),
    );
  }, [dispatch, projectName, role, expireOption]);

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
        Create Invite Link
      </Button>

      {isModalOpen && (
        <Modal>
          <Modal.Top>
            <Modal.Title>Create Invite Link</Modal.Title>
            <Modal.CloseButton onClick={closeModal} />
          </Modal.Top>
          <Modal.Content>
            <div className="form_group" style={{ marginBottom: '16px' }}>
              <label htmlFor="role" className="form_label">
                Role
              </label>
              <Popover opened={roleDropdownOpen} onChange={setRoleDropdownOpen}>
                <div style={{ position: 'relative', marginTop: '6px' }}>
                  <Popover.Target>
                    <Button
                      type="button"
                      outline
                      disabled={createInviteStatus.status === 'loading'}
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      {selectedRole?.label || 'Select role'}
                      <Icon type="openSelector" />
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div
                      style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 1000, width: '100%' }}
                    >
                      <Dropdown shadow="s">
                        <Dropdown.List>
                          {ROLES.map((r) => (
                            <Dropdown.Item
                              key={r.value}
                              onClick={() => {
                                setRole(r.value);
                                setRoleDropdownOpen(false);
                              }}
                            >
                              {role === r.value && <Icon type="check" color="orange_0" />}
                              <Dropdown.Text>{r.label}</Dropdown.Text>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.List>
                      </Dropdown>
                    </div>
                  </Popover.Dropdown>
                </div>
              </Popover>
            </div>

            <div className="form_group">
              <label htmlFor="expire" className="form_label">
                Expire
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
                              {expireOption === o.value && <Icon type="check" color="orange_0" />}
                              <Dropdown.Text>{o.label}</Dropdown.Text>
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

            {inviteURL && (
              <div className="form_group" style={{ marginTop: '20px' }}>
                <div
                  style={{
                    padding: '12px',
                    border: '1px solid var(--gray-200)',
                    borderRadius: '8px',
                    background: 'var(--gray-50)',
                  }}
                >
                  <div className="box_flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="box_flex" style={{ alignItems: 'center', gap: '8px' }}>
                      <Icon type="check" color="orange_0" />
                      <strong className="desc" style={{ margin: 0 }}>
                        Invite link generated
                      </strong>
                      <CopyButton value={inviteURL}>
                        {({ copy, copied }) => (
                          <Button
                            type="button"
                            onClick={copy}
                            outline
                            style={{
                              borderColor: 'var(--orange-dark)',
                              paddingLeft: '10px',
                              paddingRight: '10px',
                              backgroundColor: copied ? 'var(--orange-alpha-light)' : undefined,
                              color: copied ? 'var(--orange-dark)' : undefined,
                            }}
                            aria-label={copied ? 'Copied' : 'Copy URL'}
                            title="Copy URL"
                            icon={<Icon type={copied ? 'check' : 'copy'} />}
                            blindText
                          >
                            {copied ? 'Copied' : 'Copy URL'}
                          </Button>
                        )}
                      </CopyButton>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '12px',
                      padding: '12px',
                      border: '1px solid var(--gray-300)',
                      borderRadius: '6px',
                      background: 'var(--gray-000)',
                      color: 'var(--gray-900)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace)',
                      fontSize: '12px',
                      lineHeight: '18px',
                      userSelect: 'text',
                    }}
                  >
                    {inviteURL}
                  </div>
                </div>

                <p className="text_caption" style={{ marginTop: '10px' }}>
                  Share this link to invite someone to the project. Anyone with the link can request to join.
                </p>
              </div>
            )}
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
