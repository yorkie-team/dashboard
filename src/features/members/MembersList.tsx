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

import { useEffect, useState, useCallback, useRef } from 'react';
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
import { InviteLink } from './InviteLink';

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
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [roleDropdownOpenFor, setRoleDropdownOpenFor] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [roleUpdateFeedback, setRoleUpdateFeedback] = useState<{
    memberId: string;
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Close dropdown when clicking outside or scrolling
  useEffect(() => {
    if (!roleDropdownOpenFor) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside the dropdown and button
      if (!target.closest('.member_role') && !target.closest('.role_dropdown_menu')) {
        setRoleDropdownOpenFor(null);
        setDropdownPosition(null);
      }
    };

    const handleScroll = () => {
      setRoleDropdownOpenFor(null);
      setDropdownPosition(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true); // Use capture to catch all scroll events
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [roleDropdownOpenFor]);

  useEffect(() => {
    if (!currentProject || !projectName) return;
    dispatch(listMembersAsync({ projectName }));
  }, [dispatch, currentProject, projectName]);

  const currentUsername = currentUser.user?.username || '';
  const normalizeRole = (role?: string) => (role || '').toLowerCase();
  const isCurrentUsername = (m: Member) => currentUsername !== '' && m.username === currentUsername;

  const currentMemberRole = normalizeRole(members.find((m) => isCurrentUsername(m))?.role);
  const isCurrentUserOwner = currentMemberRole === 'owner';
  const isCurrentUserAdmin = currentMemberRole === 'admin';
  const isCurrentUserMember = currentMemberRole === 'member' || currentMemberRole === '';

  const canSeeInviteLink = isCurrentUserOwner || isCurrentUserAdmin;
  const canRemoveMembers = isCurrentUserOwner;
  const canEditRoles = isCurrentUserOwner || isCurrentUserAdmin;

  const getRoleLabel = (role: string) => {
    if (!role) return '-';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const canEditTargetRole = (target: Member) => {
    if (!canEditRoles) return false;
    if (isCurrentUserMember) return false;
    if (normalizeRole(target.role) === 'owner') return false; // Owner cannot be changed by anyone
    if (isCurrentUsername(target)) return false; // Prevent changing self (keeps existing behavior)
    return true;
  };

  const handleRoleChange = useCallback(
    async (member: Member, newRole: string) => {
      if (!projectName || member.role === newRole) return;
      if (!canEditTargetRole(member)) return;

      setRoleUpdateFeedback(null);
      try {
        await dispatch(updateMemberRoleAsync({ projectName, username: member.username, role: newRole })).unwrap();
        setRoleDropdownOpenFor(null);
        setDropdownPosition(null);
        setRoleUpdateFeedback({ memberId: member.id, type: 'success', message: 'Role updated.' });
        window.setTimeout(() => setRoleUpdateFeedback(null), 1500);
      } catch (err: unknown) {
        const fallback = 'Failed to update role.';
        const maybeObj = err as any;
        const message =
          (maybeObj?.error && typeof maybeObj.error.message === 'string' && maybeObj.error.message) ||
          (typeof maybeObj?.message === 'string' && maybeObj.message) ||
          fallback;
        setRoleUpdateFeedback({ memberId: member.id, type: 'error', message });
      }
    },
    [dispatch, projectName, canEditTargetRole],
  );

  const handleRemoveMember = useCallback((member: Member) => {
    setMemberToRemove(member);
    setIsRemoveModalOpen(true);
    setRemoveError(null);
  }, []);

  const confirmRemoveMember = useCallback(async () => {
    if (!projectName || !memberToRemove) return;
    setRemoveError(null);
    try {
      await dispatch(removeMemberAsync({ projectName, username: memberToRemove.username })).unwrap();
      setIsRemoveModalOpen(false);
      setMemberToRemove(null);
    } catch (err: unknown) {
      const fallback = 'Failed to remove member. Please try again.';
      const maybeObj = err as any;
      const message =
        (maybeObj?.error && typeof maybeObj.error.message === 'string' && maybeObj.error.message) ||
        (typeof maybeObj?.message === 'string' && maybeObj.message) ||
        fallback;
      setRemoveError(message);
    }
  }, [dispatch, projectName, memberToRemove]);

  const cancelRemoveMember = useCallback(() => {
    setIsRemoveModalOpen(false);
    setMemberToRemove(null);
    setRemoveError(null);
  }, []);

  const isCurrentUser = useCallback((member: Member) => isCurrentUsername(member), [currentUsername]);

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
          <div className="members_header_action">{canSeeInviteLink && <InviteLink />}</div>
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
                          <button
                            type="button"
                            className="btn_role"
                            ref={(el) => (buttonRefs.current[member.id] = el)}
                            disabled={!canEditTargetRole(member) || updateRoleStatus.status === 'loading'}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              if (roleDropdownOpenFor === member.id) {
                                setRoleDropdownOpenFor(null);
                                setDropdownPosition(null);
                              } else {
                                const button = buttonRefs.current[member.id];
                                if (button) {
                                  const rect = button.getBoundingClientRect();
                                  setDropdownPosition({
                                    top: rect.bottom + 8,
                                    left: rect.left,
                                  });
                                }
                                setRoleDropdownOpenFor(member.id);
                              }
                            }}
                          >
                            <span>{getRoleLabel(member.role)}</span>
                            <Icon type="openSelector" />
                          </button>
                          {roleUpdateFeedback?.memberId === member.id && roleUpdateFeedback.type === 'error' && (
                            <p className="text_error" style={{ marginTop: '6px' }}>
                              {roleUpdateFeedback.message}
                            </p>
                          )}
                          {roleUpdateFeedback?.memberId === member.id && roleUpdateFeedback.type === 'success' && (
                            <p className="text_caption" style={{ marginTop: '6px', color: 'var(--green-0)' }}>
                              {roleUpdateFeedback.message}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="col_date">
                        <span className="member_date">
                          {member.invitedAt ? format(fromUnixTime(member.invitedAt), 'MMM d, yyyy') : '-'}
                        </span>
                      </td>
                      <td className="col_actions">
                        {(!canRemoveMembers || isCurrentUser(member)) && <span className="text_caption">-</span>}
                        {canRemoveMembers && !isCurrentUser(member) && (
                          <Button
                            type="text"
                            icon={<Icon type="trash" />}
                            size="small"
                            className="btn_remove_member"
                            disabled={removeStatus.status === 'loading'}
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

      {roleDropdownOpenFor &&
        dropdownPosition &&
        (() => {
          const targetMember = members.find((m) => m.id === roleDropdownOpenFor);
          if (!targetMember) return null;

          return (
            <div
              className="role_dropdown_menu"
              style={{
                position: 'fixed',
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                zIndex: 1000,
                minWidth: '160px',
              }}
            >
              <Dropdown shadow="s">
                <Dropdown.List>
                  {ROLES.map((role) => (
                    <Dropdown.Item key={role.value} onClick={() => handleRoleChange(targetMember, role.value)}>
                      {targetMember.role === role.value && <Icon type="check" color="orange_0" />}
                      <Dropdown.Text>{role.label}</Dropdown.Text>
                    </Dropdown.Item>
                  ))}
                </Dropdown.List>
              </Dropdown>
            </div>
          );
        })()}

      {isRemoveModalOpen && (
        <Modal>
          <Modal.Top>
            <Modal.Title>Remove Member</Modal.Title>
          </Modal.Top>
          <Modal.Content>
            <Modal.Description>
              Are you sure you want to remove <strong>{memberToRemove?.username}</strong> from this project?
              <br />
              <br />
              This action cannot be undone.
            </Modal.Description>
            {removeError && <p className="text_error">{removeError}</p>}
          </Modal.Content>
          <Modal.Bottom>
            <Button.Box fullWidth>
              <Button outline onClick={cancelRemoveMember}>
                Cancel
              </Button>
              <Button color="danger" onClick={confirmRemoveMember} disabled={removeStatus.status === 'loading'}>
                {removeStatus.status === 'loading' ? 'Removing...' : 'Remove'}
              </Button>
            </Button.Box>
          </Modal.Bottom>
        </Modal>
      )}
    </div>
  );
}
