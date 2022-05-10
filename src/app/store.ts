import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { counterReducer, projectsReducer, documentsReducer } from 'features';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    projects: projectsReducer,
    documents: documentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
