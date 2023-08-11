import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

   
    if(loading){
        return <h1>Loading.....</h1>
    }

    return (
        <div>
            {
                user ? children : <Navigate to="/login" state={{from: location}}></Navigate>
            }
        </div>
    );
};

export default PrivateRoute;