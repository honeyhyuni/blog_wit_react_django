import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import UpdateProfile from "./UpdateProfile"
import LoginRequiredPage from "pages/utils/LoginRequired";

function AccountsRoutes(){
    return(
    <>
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<LoginRequiredPage />}>
                <Route path="/update_profile" element={<UpdateProfile />} />
            </Route>
        </Routes>
    </>
    );
}

export default AccountsRoutes;