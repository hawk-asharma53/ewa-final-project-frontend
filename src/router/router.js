import React, { Suspense } from 'react';
import Loader from '../components/UI/loader/Loader';
import Layout from '../hoc/Layout/Layout';
import NonLoggedInRouter from './NonLoggedInRouter';

const Router = () => {
  let routeList = null;
  routeList = <NonLoggedInRouter />;

  return (
    <Layout>
      <Suspense fallback={<Loader lazyLoad={true} />}>{routeList}</Suspense>
    </Layout>
  );
};

export default Router;
