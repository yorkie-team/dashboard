import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchDocuments, Document } from './documentsAPI';

export interface DocumentsState {
  documents: Document[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: DocumentsState = {
  documents: [],
  status: 'idle',
};

export const fetchDocumentsAsync = createAsyncThunk(
  'documents/fetchDocuments',
  async (): Promise<Array<Document>> => {
    const documents = await fetchDocuments();
    return documents;
  }
);

export const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentsAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchDocumentsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.documents = action.payload;
    });
    builder.addCase(fetchDocumentsAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const selectDocuments = (state: RootState) => state.documents.documents;
export const selectStatus = (state: RootState) => state.documents.status;

export default documentSlice.reducer;
