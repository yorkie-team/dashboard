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

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { inviteMemberAsync, selectInviteStatus, resetInviteStatus } from './membersSlice';
import { Button, InputTextField, Icon, Modal, Dropdown } from 'components';

const ROLES = [
  { value: 'member', label: 'Member' },
  { value: 'admin', label: 'Admin' },
];

export function InviteMember() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const inviteStatus = useAppSelector(selectInviteStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('member');

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setUsername('');
    setRole('member');
    dispatch(resetInviteStatus());
  }, [dispatch]);

  useEffect(() => {
    if (inviteStatus.isSuccess) {
      closeModal();
    }
  }, [inviteStatus.isSuccess, closeModal]);

  const handleInvite = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!username.trim() || !projectName) return;

      dispatch(
        inviteMemberAsync({
          projectName,
          username: username.trim(),
          role,
        }),
      );
    },
    [dispatch, projectName, username, role],
  );

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const selectedRole = ROLES.find((r) => r.value === role);

  return (
    <>
      <Button type="primary" htmltype="button" icon={<Icon type="plus" />} onClick={openModal}>
        Invite Member
      </Button>

      {isModalOpen && (
        <Modal>
          <form onSubmit={handleInvite}>
            <Modal.Top>
              <Modal.Title>Invite Member</Modal.Title>
              <Modal.CloseButton onClick={closeModal} />
            </Modal.Top>
            <Modal.Content>
              <div className="form_group">
                <InputTextField
                  id="username"
                  type="text"
                  label="Username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                  disabled={inviteStatus.status === 'loading'}
                  autoFocus
                />
              </div>
              <div className="form_group">
                <label htmlFor="role" className="form_label">
                  Role
                </label>
                <Dropdown type="secondary" placeholder={selectedRole?.label || 'Select role'} fullWidth>
                  {ROLES.map((r) => (
                    <Dropdown.Item key={r.value} onClick={() => setRole(r.value)} isActive={role === r.value}>
                      {r.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
              {inviteStatus.error && <p className="text_error">{inviteStatus.error}</p>}
            </Modal.Content>
            <Modal.Bottom>
              <Button type="tertiary" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="primary" htmltype="submit" disabled={!username.trim() || inviteStatus.status === 'loading'}>
                {inviteStatus.status === 'loading' ? 'Inviting...' : 'Invite'}
              </Button>
            </Modal.Bottom>
          </form>
        </Modal>
      )}
    </>
  );
}
