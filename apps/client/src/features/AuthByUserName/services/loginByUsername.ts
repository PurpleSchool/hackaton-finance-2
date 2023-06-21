import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '~/app/providers';
import { User, userActions } from '~/entities/User';
import { USER_LOCAL_STORAGE_KEY } from '~/shared/constants/localstorage';

interface LoginDataByUsername {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginDataByUsername, ThunkConfig<string>>(
  'login/loginByUsername',
  async (loginData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.post<User>('/auth/login', loginData);

      if (!response.data) throw new Error();

      localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
