'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { messages } from "./i18n";

const ForgotEmailPage = () => {
  const adminPhone = "0979245255";
  const t = messages.vi; // You can make this dynamic based on user preference

  const descriptionParts = t.description.split('{phone}');

  return (
    <>
      <div className="auth-page-wrapper">
        <div className="auth-page-content bg-white container">
          <div className="d-flex align-items-center justify-content-center">
            <div className="p-0 col-xl-4 col-lg-4 col-md-5">
              <div className="card p-1 p-md-4 bg-login border-0 shadow-none">
                <div className="py-1">
                  <Image
                    src="/images/phone.svg"
                    alt="Logo"
                    width={365}
                    height={303}
                    className="img-fluid mx-auto d-block"
                  />
                </div>
                <div className="text-center">
                  <h2 className="fw-bold">{t.title}</h2>
                  <p>
                    {descriptionParts[0]}
                    <Link href={`tel:${adminPhone}`} className="fw-bold text-primary text-decoration-none">
                      {adminPhone}
                    </Link>
                    {descriptionParts[1]}
                  </p>
                </div>
                <div className="my-2 my-md-3">
                  <Link href="/login" className="w-100 btn btn-primary py-3">
                    {t.backToLogin}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotEmailPage;
