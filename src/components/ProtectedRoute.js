
import AuthContext from '../store/context';
import { useContext } from 'react';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';

const ProtectedRoute = () => {

    const auth = useContext(AuthContext);
    return auth.isLoggedIn ? <Dashboard /> : <div>Please login to access dashboard</div>;
}
export default ProtectedRoute;