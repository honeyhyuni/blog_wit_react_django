import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
// import LoginRequiredPage from "pages/utils/LoginRequiredPages";

function AccountsRoutes(){
    return(
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    </>
    );
}

export default AccountsRoutes;