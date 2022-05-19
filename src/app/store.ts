import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { projectsReducer, documentsReducer } from 'features';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    documents: documentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
