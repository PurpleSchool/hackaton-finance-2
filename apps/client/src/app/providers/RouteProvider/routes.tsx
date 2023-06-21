import { RouteProps } from 'react-router-dom';
import { MainPage } from '~/pages/MainPage';

enum AppRoutes {
  MAIN = 'main',
}

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
};

export const routes: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
};
