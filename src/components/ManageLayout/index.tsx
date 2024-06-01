import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const ManageLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mt-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default ManageLayout;
