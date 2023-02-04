import { GlobalState } from 'src/types/global.types';
import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';

export interface RootReduxState {
  global: GlobalState;
}

export type AppDispatch = ThunkDispatch<RootReduxState, unknown, Action<string>>;

export type AppThunk<T = Promise<void> | void> = ThunkAction<
  T,
  RootReduxState,
  unknown,
  Action<string>
>;
