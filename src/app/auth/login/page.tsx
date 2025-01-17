'use client'
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AuthLoginForm from "@/layouts/auth/LoginForm";

import t from "@/locales";
import ContactDropdown from "@/components/UI/ContactDropdown";

export default function AuthLogin() {

    const urlLogo = '/logo-trans.png';

    return (
        <div className="auth-page-wrapper">
            <div className="auth-page-content bg-gray">
                <div className="row">
                    <div className="mt-0 px-0 d-none d-lg-block col-lg-8">
                        <div className="banner-login"></div>
                    </div>
                    <div className="p-0 col-lg-4">
                        <div className="p-1 p-md-4 bg-login border-0 card">
                            <div className="wrap-login-panel" id="loginForm">
                                <div className="text-end mb-3">
                                    <ContactDropdown/>
                                </div>
                                <div className="text-center mb-4 text-white-50">
                                    <div className={"position-relative"}>
                                        <Link href="/" className="d-inline-block auth-logo">
                                            {urlLogo ? (
                                                <Image className={"mw-78 h-auto"} src={urlLogo} alt={"Vietnam Tourist Logo"}  height={240} width={500}/>
                                            ) : (
                                                <div>Skeleton</div>
                                            )}
                                        </Link>
                                    </div>
                                    <hr className={"hrLogin"}/>
                                </div>
                                <div className="text-center mt-2 title-login">
                                    <h2 className="m-0 wsp">
                                        {t.welcome}
                                        <br/>
                                        HỆ THỐNG VIETNAM TOURIST
                                    </h2>
                                    <p className="m-0 my-2">{t.loginInstruction}</p>
                                </div>
                                <div className="p-2 mt-2">
                                    <AuthLoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}