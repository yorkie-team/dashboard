import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { getDocument, listDocuments, DocumentSummary, searchDocuments } from 'api';

export interface DocumentsState {
  list: {
    type: 'all' | 'search';
    documents: Array<DocumentSummary>;
    hasPrevious: boolean;
    hasNext: boolean;
    status: 'idle' | 'loading' | 'failed';
  };
  detail: {
    document: DocumentSummary | null;
    status: 'idle' | 'loading' | 'failed';
  };
}

const initialState: DocumentsState = {
  list: {
    type: 'all',
    documents: [],
    hasPrevious: false,
    hasNext: false,
    status: 'idle',
  },
  detail: {
    document: null,
    status: 'idle',
  },
};

const PAGE_SIZE = 15;

export const listDocumentsAsync = createAsyncThunk(
  'documents/listDocuments',
  async (params: {
    projectName: string;
    isForward: boolean;
    previousID?: string;
  }): Promise<{
    documents: Array<DocumentSummary>;
    hasNext: boolean;
    hasPrevious: boolean;
  }> => {
    const { projectName, isForward, previousID = '' } = params;
    const documents = await listDocuments(projectName, previousID, PAGE_SIZE + 1, isForward);

    return getPaginationData({ documents, isForward, previousID, pageSize: PAGE_SIZE });
  },
);

export const getDocumentAsync = createAsyncThunk(
  'documents/getDocument',
  async (params: { projectName: string; documentKey: string }): Promise<DocumentSummary> => {
    const { projectName, documentKey } = params;
    const document = await getDocument(projectName, documentKey);
    return document;
  },
);

export const searchDocumentsAsync = createAsyncThunk(
  'documents/searchDocuments',
  async (params: {
    projectName: string;
    documentQuery: string;
    isForward: boolean;
    previousID?: string;
  }): Promise<{
    documents: Array<DocumentSummary>;
    hasNext: boolean;
    hasPrevious: boolean;
  }> => {
    const { projectName, documentQuery, isForward, previousID = '' } = params;
    const documents = await searchDocuments(projectName, documentQuery, previousID, PAGE_SIZE + 1, isForward);

    return getPaginationData({ documents, isForward, previousID, pageSize: PAGE_SIZE });
  },
);

export const getPaginationData = (params: {
  documents: Array<DocumentSummary>;
  isForward: boolean;
  previousID: string;
  pageSize: number;
}): {
  documents: Array<DocumentSummary>;
  hasNext: boolean;
  hasPrevious: boolean;
} => {
  const { isForward, previousID, documents, pageSize } = params;
  const isFull = documents.length === pageSize + 1;

  return {
    documents: !isFull ? documents : isForward ? documents.slice(1, pageSize + 1) : documents.slice(0, pageSize),
    hasPrevious: !!previousID && (isFull || !isForward),
    hasNext: isFull || (!isFull && isForward),
  };
};

export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listDocumentsAsync.pending, (state) => {
      state.list.type = 'all';
      state.list.status = 'loading';
    });
    builder.addCase(listDocumentsAsync.fulfilled, (state, action) => {
      const { documents, hasPrevious, hasNext } = action.payload;
      state.list.status = 'idle';
      state.list.documents = documents;
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
      const { documents, hasPrevious, hasNext } = action.payload;
      state.list.status = 'idle';
      state.list.documents = documents;
      state.list.hasNext = hasNext;
      state.list.hasPrevious = hasPrevious;
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
  },
});

export const selectDocumentList = (state: RootState) => state.documents.list;
export const selectDocumentDetail = (state: RootState) => state.documents.detail;

export default documentSlice.reducer;
