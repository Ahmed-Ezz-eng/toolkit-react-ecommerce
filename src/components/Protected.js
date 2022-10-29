import React from 'react';
import { Navigate, useLocation} from "react-router-dom";

const Protected = ({isLogin, children}) => {
    const location = useLocation();

    if (!isLogin) {
        return <Navigate to="/register" state={{path: location.pathname}} />;
    }
        return children;
}

export default Protected