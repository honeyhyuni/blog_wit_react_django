import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredPage(props){
    const {store : { isAuthenticated }} = useAppContext();
    const location = useLocation();
    // const isAuthenticated = false;
    console.log("isAuthenticated", isAuthenticated)
    if(isAuthenticated) return <Outlet />;

    return <Navigate to="/accounts/login" state={{from:location}}/>
}