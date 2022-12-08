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
import FreeDetailUpdateForm from "components/DetailForm/DetailUpdateForm/FreeDetailUpdateForm";
import OperateDetailUpdateForm from "components/DetailForm/DetailUpdateForm/OperateDetailUpdateForm";
import InformDetailUpdateForm from "components/DetailForm/DetailUpdateForm/InformDetailUpdateForm";
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
                    <Route path="free/:user_id/update" element={<FreeDetailUpdateForm />} />
                    <Route path="operate/:user_id/update" element={<OperateDetailUpdateForm />} />
                    <Route path="inform/:user_id/update" element={<InformDetailUpdateForm />} />
                    <Route path="free/:user_id" element={<FreeDetail />} />
                    <Route path="operate/:user_id" element={<OperateDetail />} />
                    <Route path="inform/:user_id" element={<InformDetail />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="/accounts/*" element={<AccountsRoutes/>} />
            </Routes>

        </div>
    );
}

export default Root;