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
  removeDocumentByAdmin,
  listRevisions,
  getRevision,
  restoreRevision,
  RevisionSummary,
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
  revisions: {
    list: Array<RevisionSummary>;
    totalCount: number;
    selectedRevision: RevisionSummary | null;
    status: 'idle' | 'loading' | 'failed';
    hasMore: boolean;
    isLoadingMore: boolean;
    offset: number;
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
  revisions: {
    list: [],
    totalCount: 0,
    selectedRevision: null,
    status: 'idle',
    hasMore: true,
    isLoadingMore: false,
    offset: 0,
  },
};

const DOCUMENTS_LIMIT = 15;
const HISTORIES_LIMIT = 20;

export const listDocumentsAsync = createAppThunk(
  'documents/listDocuments',
  async (params: {
    isForward: boolean;
    previousID?: string;
  }): Promise<{
    data: Array<DocumentSummary>;
    hasNext: boolean;
    hasPrevious: boolean;
  }> => {
    const { isForward, previousID = '' } = params;
    const documents = await listDocuments(previousID, DOCUMENTS_LIMIT + 1, isForward);

    return getPaginationData({ data: documents, isForward, previousID, pageSize: DOCUMENTS_LIMIT });
  },
);

export const getDocumentAsync = createAppThunk(
  'documents/getDocument',
  async (params: { documentKey: string }): Promise<DocumentSummary> => {
    const { documentKey } = params;
    const document = await getDocument(documentKey);
    return document;
  },
);

export const searchDocumentsAsync = createAppThunk(
  'documents/searchDocuments',
  async (params: {
    documentQuery: string;
  }): Promise<{
    totalCount: number;
    documents: Array<DocumentSummary>;
  }> => {
    const { documentQuery } = params;
    const res = await searchDocuments(documentQuery, DOCUMENTS_LIMIT);

    return {
      totalCount: res.totalCount,
      documents: res.documents,
    };
  },
);

export const removeDocumentByAdminAsync = createAppThunk(
  'documents/removeDocumentByAdmin',
  async (params: { documentKey: string; force: boolean }): Promise<void> => {
    const { documentKey, force } = params;
    await removeDocumentByAdmin(documentKey, force);
  },
);

export const listRevisionsAsync = createAppThunk(
  'documents/listRevisions',
  async (params: {
    projectName: string;
    documentKey: string;
    pageSize: number;
    offset: number;
    isForward: boolean;
    append?: boolean;
  }): Promise<{
    revisions: Array<RevisionSummary>;
    totalCount: number;
    append: boolean;
  }> => {
    const { projectName, documentKey, pageSize, offset, isForward, append = false } = params;
    const result = await listRevisions(projectName, documentKey, pageSize, offset, isForward);
    return { ...result, append };
  },
);

export const getRevisionAsync = createAppThunk(
  'documents/getRevision',
  async (params: { projectName: string; documentKey: string; revisionId: string }): Promise<RevisionSummary> => {
    const { projectName, documentKey, revisionId } = params;
    const revision = await getRevision(projectName, documentKey, revisionId);
    return revision;
  },
);

export const restoreRevisionAsync = createAppThunk(
  'documents/restoreRevision',
  async (params: { projectName: string; documentKey: string; revisionId: string }): Promise<void> => {
    const { projectName, documentKey, revisionId } = params;
    await restoreRevision(projectName, documentKey, revisionId);
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
    resetRevisions: (state) => {
      state.revisions = initialState.revisions;
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
    builder.addCase(listRevisionsAsync.pending, (state, action) => {
      const isAppend = action.meta.arg.append;
      if (isAppend) {
        state.revisions.isLoadingMore = true;
      } else {
        state.revisions.status = 'loading';
      }
    });
    builder.addCase(listRevisionsAsync.fulfilled, (state, action) => {
      const { revisions, totalCount, append } = action.payload;
      state.revisions.status = 'idle';
      state.revisions.isLoadingMore = false;

      if (append) {
        state.revisions.list = [...state.revisions.list, ...revisions];
      } else {
        state.revisions.list = revisions;
      }

      state.revisions.totalCount = totalCount;
      state.revisions.offset = state.revisions.list.length;
      state.revisions.hasMore = state.revisions.list.length < totalCount;
    });
    builder.addCase(listRevisionsAsync.rejected, (state, action) => {
      const isAppend = action.meta.arg.append;
      if (isAppend) {
        state.revisions.isLoadingMore = false;
      } else {
        state.revisions.status = 'failed';
      }
    });
    builder.addCase(getRevisionAsync.pending, (state) => {
      state.revisions.status = 'loading';
    });
    builder.addCase(getRevisionAsync.fulfilled, (state, action) => {
      state.revisions.status = 'idle';
      state.revisions.selectedRevision = action.payload;
    });
    builder.addCase(getRevisionAsync.rejected, (state) => {
      state.revisions.status = 'failed';
    });
  },
});

export const { resetRevisions } = documentSlice.actions;

export const selectDocumentList = (state: RootState) => state.documents.list;
export const selectDocumentDetail = (state: RootState) => state.documents.detail;
export const selectDocumentRevisions = (state: RootState) => state.documents.revisions;

export default documentSlice.reducer;
