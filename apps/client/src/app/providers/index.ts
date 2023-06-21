import { StoreProvider } from './StoreProvider';
import { AppDispatch, createReduxStore } from './StoreProvider/store';
import type {
  StateSchema,
  ThunkConfig,
  StateSchemaKey,
  ReduxStoreWithManager,
} from './StoreProvider/StateSchema';

export { StoreProvider, createReduxStore };

export type { StateSchema, AppDispatch, ThunkConfig, StateSchemaKey, ReduxStoreWithManager };

export { AppRouter } from './RouteProvider';
