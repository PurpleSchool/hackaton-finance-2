import { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';

import { routes } from './routes';

function AppRouter() {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    const element = <Suspense fallback="">{route.element}</Suspense>;
    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routes).map(renderWithWrapper)}</Routes>;
}

const memorizedAppRouter = memo(AppRouter);
export { memorizedAppRouter as AppRouter };
