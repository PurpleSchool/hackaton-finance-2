import { StateSchema } from '~/app/providers';

export const getAccountsLoading = (state: StateSchema) => state?.accounts?.isLoading || false;
export const getAccountsError = (state: StateSchema) => state?.accounts?.error;
export const getAccounts = (state: StateSchema) => state?.accounts?.data || [];
