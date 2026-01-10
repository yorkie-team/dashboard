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

import { createSlice } from '@reduxjs/toolkit';
import { createAppThunk } from 'app/appThunk';
import { RootState } from 'app/store';
import { listMembers, createInvite, acceptInvite, removeMember, updateMemberRole, InviteExpireOption, Member } from 'api';

export interface MembersState {
  list: {
    members: Array<Member>;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
  };
  createInvite: {
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    isSuccess: boolean;
    token: string | null;
  };
  acceptInvite: {
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
    isSuccess: boolean;
    member: Member | null;
  };
  remove: {
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
  };
  updateRole: {
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
  };
}

const initialState: MembersState = {
  list: {
    members: [],
    status: 'idle',
    error: null,
  },
  createInvite: {
    status: 'idle',
    error: null,
    isSuccess: false,
    token: null,
  },
  acceptInvite: {
    status: 'idle',
    error: null,
    isSuccess: false,
    member: null,
  },
  remove: {
    status: 'idle',
    error: null,
  },
  updateRole: {
    status: 'idle',
    error: null,
  },
};

export const listMembersAsync = createAppThunk<Array<Member>, { projectName: string }>(
  'members/listMembers',
  async ({ projectName }): Promise<Array<Member>> => {
    const members = await listMembers(projectName);
    return members;
  },
);

export const createInviteAsync = createAppThunk<
  string,
  { projectName: string; role: string; expireOption: InviteExpireOption }
>('members/createInvite', async ({ projectName, role, expireOption }): Promise<string> => {
  const token = await createInvite(projectName, role, expireOption);
  return token;
});

export const acceptInviteAsync = createAppThunk<Member, { token: string }>(
  'members/acceptInvite',
  async ({ token }): Promise<Member> => {
    const member = await acceptInvite(token);
    return member;
  },
);

export const removeMemberAsync = createAppThunk<void, { projectName: string; username: string }>(
  'members/removeMember',
  async ({ projectName, username }): Promise<void> => {
    await removeMember(projectName, username);
  },
);

export const updateMemberRoleAsync = createAppThunk<Member, { projectName: string; username: string; role: string }>(
  'members/updateMemberRole',
  async ({ projectName, username, role }): Promise<Member> => {
    const member = await updateMemberRole(projectName, username, role);
    return member;
  },
);

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    resetCreateInviteStatus: (state) => {
      state.createInvite.status = 'idle';
      state.createInvite.error = null;
      state.createInvite.isSuccess = false;
      state.createInvite.token = null;
    },
    resetAcceptInviteStatus: (state) => {
      state.acceptInvite.status = 'idle';
      state.acceptInvite.error = null;
      state.acceptInvite.isSuccess = false;
      state.acceptInvite.member = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // List members
      .addCase(listMembersAsync.pending, (state) => {
        state.list.status = 'loading';
        state.list.error = null;
      })
      .addCase(listMembersAsync.fulfilled, (state, action) => {
        state.list.status = 'idle';
        state.list.members = action.payload;
      })
      .addCase(listMembersAsync.rejected, (state, action) => {
        state.list.status = 'failed';
        state.list.error = action.payload?.error?.message || 'Failed to load members';
      })
      // Create invite
      .addCase(createInviteAsync.pending, (state) => {
        state.createInvite.status = 'loading';
        state.createInvite.error = null;
        state.createInvite.isSuccess = false;
        state.createInvite.token = null;
      })
      .addCase(createInviteAsync.fulfilled, (state, action) => {
        state.createInvite.status = 'idle';
        state.createInvite.isSuccess = true;
        state.createInvite.token = action.payload;
      })
      .addCase(createInviteAsync.rejected, (state, action) => {
        state.createInvite.status = 'failed';
        state.createInvite.error = action.payload?.error?.message || 'Failed to create invite';
      })
      // Accept invite
      .addCase(acceptInviteAsync.pending, (state) => {
        state.acceptInvite.status = 'loading';
        state.acceptInvite.error = null;
        state.acceptInvite.isSuccess = false;
        state.acceptInvite.member = null;
      })
      .addCase(acceptInviteAsync.fulfilled, (state, action) => {
        state.acceptInvite.status = 'idle';
        state.acceptInvite.isSuccess = true;
        state.acceptInvite.member = action.payload;
      })
      .addCase(acceptInviteAsync.rejected, (state, action) => {
        state.acceptInvite.status = 'failed';
        state.acceptInvite.error = action.payload?.error?.message || 'Failed to accept invite';
      })
      // Remove member
      .addCase(removeMemberAsync.pending, (state) => {
        state.remove.status = 'loading';
        state.remove.error = null;
      })
      .addCase(removeMemberAsync.fulfilled, (state, action) => {
        state.remove.status = 'idle';
        const username = action.meta.arg.username;
        state.list.members = state.list.members.filter((m) => m.username !== username);
      })
      .addCase(removeMemberAsync.rejected, (state, action) => {
        state.remove.status = 'failed';
        state.remove.error = action.payload?.error?.message || 'Failed to remove member';
      })
      // Update member role
      .addCase(updateMemberRoleAsync.pending, (state) => {
        state.updateRole.status = 'loading';
        state.updateRole.error = null;
      })
      .addCase(updateMemberRoleAsync.fulfilled, (state, action) => {
        state.updateRole.status = 'idle';
        const index = state.list.members.findIndex((m) => m.id === action.payload.id);
        if (index !== -1) {
          state.list.members[index] = action.payload;
        }
      })
      .addCase(updateMemberRoleAsync.rejected, (state, action) => {
        state.updateRole.status = 'failed';
        state.updateRole.error = action.payload?.error?.message || 'Failed to update member role';
      });
  },
});

export const { resetCreateInviteStatus, resetAcceptInviteStatus } = membersSlice.actions;

export const selectMembersList = (state: RootState) => state.members.list;
export const selectCreateInviteStatus = (state: RootState) => state.members.createInvite;
export const selectAcceptInviteStatus = (state: RootState) => state.members.acceptInvite;
export const selectRemoveStatus = (state: RootState) => state.members.remove;
export const selectUpdateRoleStatus = (state: RootState) => state.members.updateRole;

export default membersSlice.reducer;
