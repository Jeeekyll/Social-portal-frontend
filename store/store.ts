import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userSlice from "./slices/user"
import articleSlice from "./slices/article"

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      articles: articleSlice,
    },
  })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>
