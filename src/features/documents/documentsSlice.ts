import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { listDocuments, DocumentSummary } from '../../api';

export interface DocumentsState {
  documents: Array<DocumentSummary>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DocumentsState = {
  documents: [],
  status: 'idle',
};

export const listDocumentsAsync = createAsyncThunk(
  'documents/listDocuments',
  async (): Promise<Array<DocumentSummary>> => {
    const documents = await listDocuments("", 20);
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
      state.documents = action.payload;
    });
    builder.addCase(listDocumentsAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const selectDocuments = (state: RootState) => state.documents.documents;
export const selectStatus = (state: RootState) => state.documents.status;

export default documentSlice.reducer;
