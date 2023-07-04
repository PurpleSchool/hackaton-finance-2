import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { useDidMountEffect } from '~/shared/lib/hooks';
import { DynamicModuleLoader, ReducersList } from '~/shared/lib/DynamicModuleLoader';
import { accountReducer, getAccounts, fetchAccounts } from '~/entities/Account';
import { Page } from '~/widgets/Page';
import { AppDispatch } from '~/app/providers';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const reducers: ReducersList = {
  accounts: accountReducer,
};

export function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(getAccounts);

  useDidMountEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {(data || []).map((item) => (
              <Grid key={item.email} item xs={6}>
                <Item>{item.email}</Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Page>
    </DynamicModuleLoader>
  );
}
