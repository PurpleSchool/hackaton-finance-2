import { AxiosInstance } from 'axios';
import { CombinedState } from 'redux';
import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

import { rtkApi } from '~/shared/api';
import { UserState } from '~/entities/User';
import { AccountState } from '~/entities/Account';
import { LoginState } from '~/features/AuthByUserName';

export interface StateSchema {
  // Synchronous reducers
  user: UserState;

  // Asynchronous reducers
  loginForm?: LoginState;
  accounts?: AccountState;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
