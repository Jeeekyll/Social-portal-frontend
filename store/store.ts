import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import user from '@/store/reducers/user';
import article from '@/store/reducers/article';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user,
      article,
    },
  });
};

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
