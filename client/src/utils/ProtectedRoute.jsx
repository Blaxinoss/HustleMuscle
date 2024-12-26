import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = () => {
    const isLoggedIn = localStorage.getItem('log') === 'true'; // Check login status

    // If logged in, render the nested routes, otherwise redirect to login
    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
