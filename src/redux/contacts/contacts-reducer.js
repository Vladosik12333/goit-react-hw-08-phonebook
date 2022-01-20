import { createReducer } from '@reduxjs/toolkit';
import { actions } from '.';
import { combineReducers } from '@reduxjs/toolkit';

const filter = createReducer('', {
  [actions.changeFitler]: (_, { payload }) => payload,
});

const contacts = combineReducers({
  filter,
});

export default contacts;
