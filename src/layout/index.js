import React from 'react';
import { Header } from 'components/header';
import { Outlet } from 'react-router-dom';
import Footer from 'components/footer';

const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
