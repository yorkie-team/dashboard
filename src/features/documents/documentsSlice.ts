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
  getDocument,
  listDocuments,
  DocumentSummary,
  searchDocuments,
  listDocumentHistories,
  DocumentHistory,
  removeDocumentByAdmin,
} from 'api';

export interface DocumentsState {
  list: {
    type: 'all' | 'search';
    totalCount: number | null;
    documents: Array<DocumentSummary>;
    hasPrevious: boolean;
    hasNext: boolean;
    status: 'idle' | 'loading' | 'failed';
  };
  detail: {
    document: DocumentSummary | null;
    status: 'idle' | 'loading' | 'failed';
  };
  history: {
    histories: Array<DocumentHistory>;
    hasPrevious: boolean;
    hasNext: boolean;
    status: 'idle' | 'loading' | 'failed';
  };
}

const initialState: DocumentsState = {
  list: {
    type: 'all',
    totalCount: null,
    documents: [],
    hasPrevious: false,
    hasNext: false,
    status: 'idle',
  },
  detail: {
    document: null,
    status: 'idle',
  },
  history: {
    histories: [],
    hasPrevious: false,
    hasNext: false,
    status: 'idle',
  },
};

const DOCUMENTS_LIMIT = 15;
const HISTORIES_LIMIT = 20;

export const listDocumentsAsync = createAppThunk(
  'documents/listDocuments',
  async (params: {
    projectName: string;
    isForward: boolean;
    previousID?: string;
  }): Promise<{
    data: Array<DocumentSummary>;
    hasNext: boolean;
    hasPrevious: boolean;
  }> => {
    const { projectName, isForward, previousID = '' } = params;
    const documents = await listDocuments(projectName, previousID, DOCUMENTS_LIMIT + 1, isForward);

    return getPaginationData({ data: documents, isForward, previousID, pageSize: DOCUMENTS_LIMIT });
  },
);

export const getDocumentAsync = createAppThunk(
  'documents/getDocument',
  async (params: { projectName: string; documentKey: string }): Promise<DocumentSummary> => {
    const { projectName, documentKey } = params;
    const document = await getDocument(projectName, documentKey);
    return document;
  },
);

export const searchDocumentsAsync = createAppThunk(
  'documents/searchDocuments',
  async (params: {
    projectName: string;
    documentQuery: string;
  }): Promise<{
    totalCount: number;
    documents: Array<DocumentSummary>;
  }> => {
    const { projectName, documentQuery } = params;
    const res = await searchDocuments(projectName, documentQuery, DOCUMENTS_LIMIT);

    return {
      totalCount: res.totalCount,
      documents: res.documents,
    };
  },
);

export const listDocumentHistoriesAsync = createAppThunk(
  'documents/listDocumentHistories',
  async (params: {
    projectName: string;
    documentKey: string;
    isForward: boolean;
    previousSeq?: string;
  }): Promise<{
    data: Array<DocumentHistory>;
    hasNext: boolean;
    hasPrevious: boolean;
  }> => {
    const { projectName, documentKey, isForward, previousSeq = '0' } = params;
    const histories = await listDocumentHistories(
      projectName,
      documentKey,
      previousSeq,
      HISTORIES_LIMIT + 1,
      isForward,
    );

    return getPaginationData({
      data: histories,
      isForward,
      previousID: previousSeq,
      pageSize: HISTORIES_LIMIT,
      reverse: true,
    });
  },
);

export const removeDocumentByAdminAsync = createAppThunk(
  'documents/removeDocumentByAdmin',
  async (params: { projectName: string; documentKey: string; force: boolean }): Promise<void> => {
    const { projectName, documentKey, force } = params;
    await removeDocumentByAdmin(projectName, documentKey, force);
  },
);

export const getPaginationData = <T extends {}>(params: {
  data: Array<T>;
  isForward: boolean;
  previousID: string;
  pageSize: number;
  reverse?: boolean;
}): {
  data: Array<T>;
  hasNext: boolean;
  hasPrevious: boolean;
} => {
  const { isForward, previousID, data: totalData, pageSize, reverse = false } = params;
  const isFull = totalData.length === pageSize + 1;
  const hasPreviousID = previousID !== '' && previousID !== '0';
  const hasPrevious = hasPreviousID && (isFull || !isForward);
  const hasNext = isFull || (!isFull && isForward);

  let data = reverse === isForward ? totalData.slice(0, pageSize) : totalData.slice(1, pageSize + 1);
  if (!isFull) data = totalData;
  return {
    data,
    hasPrevious: reverse ? hasNext : hasPrevious,
    hasNext: reverse ? hasPrevious : hasNext,
  };
};

export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.detail.document!.snapshot = state.history.histories[action.payload].snapshot;
    },
    resetHistory: (state) => {
      state.history.status = 'idle';
      state.history.histories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listDocumentsAsync.pending, (state) => {
      state.list.type = 'all';
      state.list.status = 'loading';
    });
    builder.addCase(listDocumentsAsync.fulfilled, (state, action) => {
      const { data, hasPrevious, hasNext } = action.payload;
      state.list.status = 'idle';
      state.list.totalCount = null;
      state.list.documents = data;
      state.list.hasNext = hasNext;
      state.list.hasPrevious = hasPrevious;
    });
    builder.addCase(listDocumentsAsync.rejected, (state) => {
      state.list.status = 'failed';
    });
    builder.addCase(searchDocumentsAsync.pending, (state) => {
      state.list.type = 'search';
      state.list.status = 'loading';
    });
    builder.addCase(searchDocumentsAsync.fulfilled, (state, action) => {
      const { totalCount, documents } = action.payload;
      state.list.status = 'idle';
      state.list.totalCount = totalCount;
      state.list.documents = documents;
    });
    builder.addCase(searchDocumentsAsync.rejected, (state) => {
      state.list.status = 'failed';
    });
    builder.addCase(getDocumentAsync.pending, (state) => {
      state.detail.status = 'loading';
    });
    builder.addCase(getDocumentAsync.fulfilled, (state, action) => {
      state.detail.status = 'idle';
      state.detail.document = action.payload;
    });
    builder.addCase(getDocumentAsync.rejected, (state) => {
      state.detail.status = 'failed';
    });
    builder.addCase(listDocumentHistoriesAsync.pending, (state) => {
      state.history.status = 'loading';
    });
    builder.addCase(listDocumentHistoriesAsync.fulfilled, (state, action) => {
      const { data, hasPrevious, hasNext } = action.payload;
      state.history.status = 'idle';
      state.history.histories = data;
      // state.detail.document!.snapshot = data[data.length - 1].snapshot;
      state.history.hasNext = hasNext;
      state.history.hasPrevious = hasPrevious;
    });
    builder.addCase(listDocumentHistoriesAsync.rejected, (state) => {
      state.history.status = 'failed';
    });
  },
});

export const { setHistory, resetHistory } = documentSlice.actions;

export const selectDocumentList = (state: RootState) => state.documents.list;
export const selectDocumentDetail = (state: RootState) => state.documents.detail;
export const selectDocumentHistory = (state: RootState) => state.documents.history;

export default documentSlice.reducer;
