import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AccountState } from '~/entities/Account';
import { fetchAccounts } from '../services/fetchAccounts';

const initialState: AccountState = {
  data: [],
  isLoading: false,
  error: undefined,
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, _action) => {
        state.isLoading = false;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: accountActions, reducer: accountReducer } = accountSlice;
