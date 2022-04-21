import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { listDocuments, DocumentSummary } from '../../api';

export interface DocumentsState {
  documents: Array<DocumentSummary>;
  hasNext: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DocumentsState = {
  documents: [],
  hasNext: false,
  status: 'idle',
};

const pageSize = 20;

export const listDocumentsAsync = createAsyncThunk(
  'documents/listDocuments',
  async (previousID?: string): Promise<Array<DocumentSummary>> => {
    const documents = await listDocuments(previousID || '', pageSize + 1);
    return documents;
  }
);

export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listDocumentsAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(listDocumentsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.documents = action.payload.slice(0, pageSize);
      state.hasNext = action.payload.length === pageSize + 1;
    });
    builder.addCase(listDocumentsAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const selectDocuments = (state: RootState) => state.documents;

export default documentSlice.reducer;
