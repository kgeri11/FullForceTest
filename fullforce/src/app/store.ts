import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import responseReducer from '../features/responseSlice'
import queryReducer from '../features/querySlice'

const rootReducer = combineReducers({
  responseReducer,
  queryReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
