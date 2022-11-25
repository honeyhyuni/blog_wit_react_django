import React from "react";
// import AppLayout from "components/AppLayout";
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import AccountsRoutes from "./accounts";
// import LoginRequiredPage from "./utils/LoginRequiredPages";
// import PostNew from "./PostNew"

function Root(){
    return(
        <div>
            <Routes>
                {/* <Route element={<LoginRequiredPage />}> */}
                <Route path="/" element={<Home />} />
                {/* </Route> */}
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/accounts/*" element={<AccountsRoutes/>} />
            </Routes>

        </div>
    );
}

export default Root;