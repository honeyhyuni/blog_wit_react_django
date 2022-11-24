import React from "react";
import Example from "Example";
import AppLayout from "components/AppLayout";
function Root(){
    return (
        <div>
            최상위 컴포넌트
            <Example />
            <AppLayout />
        </div>
    );
}

export default Root;