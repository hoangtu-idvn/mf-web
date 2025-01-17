import React from "react";
import Image from "next/image";

import "./Navbar.css";

export const Navbar = ({
                           app,
                           module
                       }) => {
    return (
        <>
            <div id="navbar">
                <div className="navbar-wrapper">
                    <ul className={"nav-ul"}>
                        <li className="nav-item">
                            <a href={"/system/company"} className={"txt"}><span className="icon-item">
                                <Image src="/icon/company.svg" width={18} height={18} alt="icon company"/>
                            </span>Thông tin công ty</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
