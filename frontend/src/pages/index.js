import React from "react";
// import AppLayout from "components/AppLayout";
import {Outlet, Route, Routes} from "react-router-dom";
import Home from "./Home";
import AccountsRoutes from "./accounts";
import LoginRequiredPage from "./utils/LoginRequired";
import OperateNewForm from "components/NewForm/OperateNewForm";
import FreeNewForm from "components/NewForm/FreeNewForm";
import InformNewForm from 'components/NewForm/InformNewForm';
import FreeDetail from "components/DetailForm/FreeDetail";
import OperateDetail from "components/DetailForm/OperateDetail";
import InformDetail from "components/DetailForm/InformDetail";
// import LoginRequiredPage from "./utils/LoginRequiredPages";
// import PostNew from "./PostNew"

function Root(){
    return(
        <div>
            <Routes>
                <Route element={<LoginRequiredPage />}>
                    <Route path="/operate/new" element={<OperateNewForm />} />
                    <Route path="/free/new" element={<FreeNewForm />} />
                    <Route path="/inform/new" element={<InformNewForm />} />
                </Route>
                <Route path="free/:user_id" element={<FreeDetail />} />
                <Route path="operate/:user_id" element={<OperateDetail />} />
                <Route path="inform/:user_id" element={<InformDetail />} />
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/accounts/*" element={<AccountsRoutes/>} />
            </Routes>

        </div>
    );
}

export default Root;