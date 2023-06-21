import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '~/app/providers';
import { accountActions } from '../model/accountSlice';

export const fetchAccounts = createAsyncThunk<any[], void, ThunkConfig<string>>(
  'mainPage/fetchAccounts',
  async (_props, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<any[]>('/accounts');

      if (!response.data) throw new Error();

      dispatch(accountActions.setAccounts(response.data));
      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
