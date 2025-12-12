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

import { createSlice } from '@reduxjs/toolkit';
import { createAppThunk } from 'app/appThunk';
import { RootState } from 'app/store';
import {
  getChannel,
  listChannels,
  ChannelSummary,
  removeChannelByAdmin,
} from 'api';

export interface ChannelsState {
  list: {
    type: 'all' | 'search';
    allChannels: Array<ChannelSummary>;
    currentPage: number;
    pageSize: number;
    limit: number;
    status: 'idle' | 'loading' | 'failed';
  };
  detail: {
    channel: ChannelSummary | null;
    status: 'idle' | 'loading' | 'failed';
  };
}

const initialState: ChannelsState = {
  list: {
    type: 'all',
    allChannels: [],
    currentPage: 1,
    pageSize: 15,
    limit: 50,
    status: 'idle',
  },
  detail: {
    channel: null,
    status: 'idle',
  },
};

export const listChannelsAsync = createAppThunk(
  'channels/listChannels',
  async (params: { channelQuery: string, limit: number }): Promise<Array<ChannelSummary>> => {
    const { channelQuery, limit } = params;
    const channels = await listChannels(channelQuery, limit);
    return channels;
  },
);

export const getChannelAsync = createAppThunk(
  'channels/getChannel',
  async (params: { channelKey: string }): Promise<ChannelSummary> => {
    const { channelKey } = params;
    const channel = await getChannel(channelKey);
    return channel;
  },
);

export const removeChannelByAdminAsync = createAppThunk(
  'channels/removeChannelByAdmin',
  async (params: { channelKey: string; force: boolean }): Promise<void> => {
    const { channelKey, force } = params;
    await removeChannelByAdmin(channelKey, force);
  },
);

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.list.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.list.limit = action.payload;
      state.list.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listChannelsAsync.pending, (state) => {
      state.list.type = 'all';
      state.list.status = 'loading';
    });
    builder.addCase(listChannelsAsync.fulfilled, (state, action) => {
      state.list.status = 'idle';
      state.list.allChannels = action.payload;
      state.list.currentPage = 1;
    });
    builder.addCase(listChannelsAsync.rejected, (state) => {
      state.list.status = 'failed';
    });
    builder.addCase(getChannelAsync.pending, (state) => {
      state.detail.status = 'loading';
    });
    builder.addCase(getChannelAsync.fulfilled, (state, action) => {
      state.detail.status = 'idle';
      state.detail.channel = action.payload;
    });
    builder.addCase(getChannelAsync.rejected, (state) => {
      state.detail.status = 'failed';
    });
  },
});

export const { setCurrentPage, setLimit } = channelSlice.actions;

export const selectChannelList = (state: RootState) => {
  const { allChannels, currentPage, pageSize, limit, status, type } = state.channels.list;
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const channels = allChannels.slice(startIndex, endIndex);
  
  const totalPages = Math.ceil(allChannels.length / pageSize);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;
  
  return {
    channels,
    currentPage,
    totalPages,
    totalChannels: allChannels.length,
    hasPrevious,
    hasNext,
    limit,
    status,
    type,
  };
};

export const selectChannelDetail = (state: RootState) => state.channels.detail;

export default channelSlice.reducer;

