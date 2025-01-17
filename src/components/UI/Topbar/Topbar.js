import React from "react";
import Image from "next/image";

import "./Topbar.css";

export const Topbar = ({
    app,
    module
                       }) => {
    return (
     <>
        <div id="topbar">
            <div className="container-fluid ">
                <div className="topbar-wrap d-flex align-items-center justify-content-between w-100">
                    <div className="topbar-left d-flex align-items-center">
                    <span className="logo mx-3">
                        <Image src={"/logo.png"} height={40} width={80} priority={true} alt="topbar-logo"/>
                    </span>
                        <span className="module-title">{module}</span>
                    </div>
                    <div className="topbar-right">
                        <span>topbar-right</span>
                    </div>
                </div>
            </div>
        </div>
     </>
    );
};
