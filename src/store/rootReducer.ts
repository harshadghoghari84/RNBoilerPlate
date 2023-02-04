import { combineReducers } from '@reduxjs/toolkit';
import { RootReduxState } from 'src/types/store.types';
import global from 'src/store/global/global.slice';

const rootReducer = combineReducers<RootReduxState>({
  global,
});

export default rootReducer;
