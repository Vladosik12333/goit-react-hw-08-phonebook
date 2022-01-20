import { createReducer } from '@reduxjs/toolkit';
import { actions } from '.';
import { combineReducers } from '@reduxjs/toolkit';

const isLoggined = createReducer(false, {
  [actions.authUser]: () => true,
  [actions.exitUser]: () => false,
});

const email = createReducer('', {
  [actions.authUser]: (_, { payload }) => payload.user.email,
  [actions.exitUser]: () => '',
});

const token = createReducer(null, {
  [actions.authUser]: (_, { payload }) => payload.token,
  [actions.exitUser]: () => null,
});

const hasCurrentUser = createReducer(false, {
  [actions.hasCurrentUser]: state => !state,
});

const user = combineReducers({
  isLoggined,
  token,
  email,
  hasCurrentUser,
});

export default user;
