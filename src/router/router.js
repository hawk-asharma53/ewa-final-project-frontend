import React, { Suspense } from 'react';
import useStore from 'store/AuthState';
import Loader from '../components/UI/loader/Loader';
import Layout from '../hoc/Layout/Layout';
import LoggedInRouter from './LoggedInRouter';
import NonLoggedInRouter from './NonLoggedInRouter';

const Router = () => {
  let store = useStore();
  let routeList = null;
  if (store?.userData?.user_id) {
    routeList = <LoggedInRouter />;
  } else {
    routeList = <NonLoggedInRouter />;
  }

  return (
    <Layout>
      <Suspense fallback={<Loader lazyLoad={true} />}>{routeList}</Suspense>
    </Layout>
  );
};

export default Router;
