'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { messages, Language } from "./i18n";
import Image from 'next/image';
import { config } from '@/config';
import ContactDropdown from "@/components/UI/ContactDropdown";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState<Language>('vi');
  const t = messages[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  // @ts-ignore
  return (
    <div className="auth-page-wrapper">
      <div className="auth-page-content bg-white p-1 p-md-4">
        <div className="wrap-login-panel container">
          <div className="text-end mb-3 d-flex justify-content-end align-items-center">
          <ContactDropdown />
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6 col-lg-4 col-xl-4 p-0">
              <div className="card p-1 p-md-4 bg-login border-0 shadow-none">
                <div className="wrap-login-panel">
                  <div className="text-center mb-4 text-white-50">
                    <div>
                      <Link href="/" className="d-inline-block auth-logo">
                        <img
                          src={config.company.logo}
                          alt={config.company.name}
                          width="200"
                          height="200"
                          style={{ maxWidth: '100%' }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="text-center mt-2 title-login">
                    <h2 className="m-0">{t.title}</h2>
                    <p className="m-0 my-2">{t.description}</p>
                  </div>
                  <div className="p-0 mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">{t.emailLabel}</label>
                        <div className="position-relative">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder={t.emailPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {email && (
                            <span
                              onClick={() => setEmail('')}
                              className="cursor-pointer position-absolute top-50 end-0 translate-middle-y me-2"
                            >
                              <i className="ri-close-line fs-3"></i>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          className="w-100 btn btn-primary"
                          type="submit"
                          disabled={!email}
                        >
                          {t.sendButton}
                        </button>
                      </div>
                      <div className="my-2 my-md-3">
                        <Link
                          href="/login"
                          className="w-100 text-primary py-3 text-center d-block text-decoration-none"
                        >
                          {t.backToLogin}
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;