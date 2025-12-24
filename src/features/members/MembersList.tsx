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

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectMembersList,
  listMembersAsync,
  removeMemberAsync,
  updateMemberRoleAsync,
  selectRemoveStatus,
  selectUpdateRoleStatus,
} from './membersSlice';
import { selectCurrentProject } from 'features/projects/projectsSlice';
import { selectCurrentUser } from 'features/users/usersSlice';
import { Button, Icon, Dropdown, Modal, Popover } from 'components';
import { Member } from 'api';
import { InviteMember } from './InviteMember';

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' },
];

export function MembersList() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const { members, status, error } = useAppSelector(selectMembersList);
  const { project: currentProject } = useAppSelector(selectCurrentProject);
  const currentUser = useAppSelector(selectCurrentUser);
  const removeStatus = useAppSelector(selectRemoveStatus);
  const updateRoleStatus = useAppSelector(selectUpdateRoleStatus);

  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [roleDropdownOpenFor, setRoleDropdownOpenFor] = useState<string | null>(null);

  useEffect(() => {
    if (!currentProject || !projectName) return;
    dispatch(listMembersAsync({ projectName }));
  }, [dispatch, currentProject, projectName]);

  const handleRoleChange = useCallback(
    (member: Member, newRole: string) => {
      if (!projectName || member.role === newRole) return;
      dispatch(updateMemberRoleAsync({ projectName, username: member.username, role: newRole }));
      setRoleDropdownOpenFor(null); // Close dropdown after selection
    },
    [dispatch, projectName],
  );

  const handleRemoveMember = useCallback((member: Member) => {
    setMemberToRemove(member);
    setIsRemoveModalOpen(true);
  }, []);

  const confirmRemoveMember = useCallback(() => {
    if (!projectName || !memberToRemove) return;
    dispatch(removeMemberAsync({ projectName, username: memberToRemove.username })).then(() => {
      setIsRemoveModalOpen(false);
      setMemberToRemove(null);
    });
  }, [dispatch, projectName, memberToRemove]);

  const cancelRemoveMember = useCallback(() => {
    setIsRemoveModalOpen(false);
    setMemberToRemove(null);
  }, []);

  const isCurrentUser = useCallback(
    (member: Member) => {
      return currentUser.user?.username === member.username;
    },
    [currentUser.user],
  );

  return (
    <div style={{ width: '100%', maxWidth: 'none' }}>
      {status === 'loading' && (
        <div className="box_skeleton">
          <p className="blind">Loading</p>
          <div className="box_flex">
            <div className="skeleton"></div>
            <div className="skeleton is_small"></div>
            <div className="skeleton is_small"></div>
          </div>
          <div className="box_flex">
            <div className="skeleton"></div>
            <div className="skeleton is_small"></div>
            <div className="skeleton is_small"></div>
          </div>
          <div className="box_flex">
            <div className="skeleton"></div>
            <div className="skeleton is_small"></div>
            <div className="skeleton is_small"></div>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div className="placeholder_box no_bg">
          <p className="desc">
            {error || 'Failed to load members.'}
            <br />
            Please try refreshing the page.
          </p>
        </div>
      )}

      {status === 'idle' && (
        <div className="members_container">
          <div className="members_header_action">
            <InviteMember />
          </div>
          {members.length === 0 ? (
            <div className="placeholder_box no_bg">
              <p className="desc">No members in this project yet.</p>
            </div>
          ) : (
            <div className="members_table_wrapper">
              <table className="members_table">
                <thead>
                  <tr>
                    <th className="col_username">Username</th>
                    <th className="col_role">Role</th>
                    <th className="col_date">Invited At</th>
                    <th className="col_actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="col_username">
                        <div className="member_username">
                          <span>{member.username}</span>
                          {isCurrentUser(member) && <span className="badge_you">You</span>}
                        </div>
                      </td>
                      <td className="col_role">
                        <div className="member_role">
                          <Popover
                            opened={roleDropdownOpenFor === member.id}
                            onChange={(isOpen) => setRoleDropdownOpenFor(isOpen ? member.id : null)}
                          >
                            <Popover.Target>
                              <button
                                type="button"
                                className="btn_role"
                                disabled={isCurrentUser(member) || updateRoleStatus.status === 'loading'}
                              >
                                <span>{member.role.charAt(0).toUpperCase() + member.role.slice(1)}</span>
                                <Icon type="openSelector" />
                              </button>
                            </Popover.Target>
                            <Popover.Dropdown>
                              <Dropdown shadow="s">
                                <Dropdown.List>
                                  {ROLES.map((role) => (
                                    <Dropdown.Item
                                      key={role.value}
                                      onClick={() => handleRoleChange(member, role.value)}
                                    >
                                      {member.role === role.value && <Icon type="check" color="orange_0" />}
                                      <Dropdown.Text>{role.label}</Dropdown.Text>
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.List>
                              </Dropdown>
                            </Popover.Dropdown>
                          </Popover>
                        </div>
                      </td>
                      <td className="col_date">
                        <span className="member_date">{format(fromUnixTime(member.invitedAt), 'MMM d, yyyy')}</span>
                      </td>
                      <td className="col_actions">
                        {isCurrentUser(member) && <span className="text_caption">-</span>}
                        {!isCurrentUser(member) && (
                          <Button
                            type="text"
                            icon={<Icon type="trash" />}
                            size="small"
                            className="btn_remove_member"
                            disabled={isCurrentUser(member) || removeStatus.status === 'loading'}
                            onClick={() => handleRemoveMember(member)}
                          >
                            Remove
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {isRemoveModalOpen && (
        <Modal>
          <Modal.Top>
            <Modal.Title>Remove Member</Modal.Title>
            <Modal.CloseButton onClick={cancelRemoveMember} />
          </Modal.Top>
          <Modal.Content>
            <p>
              Are you sure you want to remove <strong>{memberToRemove?.username}</strong> from this project?
            </p>
            <p className="text_caption">This action cannot be undone.</p>
          </Modal.Content>
          <Modal.Bottom>
            <Button type="tertiary" onClick={cancelRemoveMember}>
              Cancel
            </Button>
            <Button type="danger" onClick={confirmRemoveMember} disabled={removeStatus.status === 'loading'}>
              {removeStatus.status === 'loading' ? 'Removing...' : 'Remove'}
            </Button>
          </Modal.Bottom>
        </Modal>
      )}
    </div>
  );
}
