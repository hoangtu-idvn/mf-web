import React, {useState, useCallback, useEffect} from 'react';
import t from '@/locales';
import Link from 'next/link';
import {useLoginValidation} from "@/layouts/hooks/useLoginValidation";

export default function AuthLoginForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [isBlocked, setIsBlocked] = useState(true);
   const [isProcessing, setIsProcessings] = useState(false);
   const [formData, setFormData] = useState({
      email: '',
      password: '',
      remember: false
   });
   useEffect(() => {
      if(isBlocked && formData.email.length > 0 && formData.password.length > 6) {
         setIsBlocked(false);
      }
   }, [formData]);

   const [connectModalOpen, setConnectModalOpen] = useState(false);
   const [termsModalOpen, setTermsModalOpen] = useState(false);
   const [securityModalOpen, setSecurityModalOpen] = useState(false);

   const { errors, validateForm, clearErrors } = useLoginValidation();

   const handleInputChange = useCallback((e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: type === 'checkbox' ? checked : value
      }));
      clearErrors();
   }, [clearErrors]);

   const handleFormSubmit = useCallback(async (e) => {
      e.preventDefault();
      if (validateForm(formData)) {
         setIsProcessings(true)
      }
   }, [formData, validateForm]);

   const togglePasswordVisibility = useCallback(() => {
      setShowPassword(prev => !prev);
   }, []);

   const handleOpenConnectModal = useCallback(() => setConnectModalOpen(true), []);
   const handleCloseConnectModal = useCallback(() => setConnectModalOpen(false), []);
   const handleOpenTermsModal = useCallback(() => setTermsModalOpen(true), []);
   const handleCloseTermsModal = useCallback(() => setTermsModalOpen(false), []);
   const handleOpenSecurityModal = useCallback(() => setSecurityModalOpen(true), []);
   const handleCloseSecurityModal = useCallback(() => setSecurityModalOpen(false), []);


   return (
       <form onSubmit={handleFormSubmit} className="login-form" noValidate>
          <div className="mb-3">
             <label htmlFor="email" className="form-label">{t.email.label}</label>
             <input
                 type="email"
                 className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleInputChange}
                 placeholder={t.email.placeholder}
                 disabled={isProcessing}
                 aria-describedby={errors.email ? "emailError" : undefined}
             />
             {errors.email && (
                 <div id="emailError" className="invalid-feedback">
                    {errors.email}
                 </div>
             )}
          </div>

          <div className="mb-3">
             <label htmlFor="password" className="form-label">{t.password.label}</label>
             <div className="input-group has-validation">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t.password.placeholder}
                    disabled={isProcessing}
                    aria-describedby={errors.password ? "passwordError" : undefined}
                />
                <button
                    type="button"
                    className={`btn btn-outline-secondary ${errors.password ? 'border-danger' : ''}`}
                    onClick={togglePasswordVisibility}
                    disabled={isProcessing}
                >
                   <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                </button>
                {errors.password && (
                    <div id="passwordError" className="invalid-feedback">
                       {errors.password}
                    </div>
                )}
             </div>
          </div>

          <div className="mb-3 form-check">
             <input
                 type="checkbox"
                 className="form-check-input"
                 id="remember"
                 name="remember"
                 checked={formData.remember}
                 onChange={handleInputChange}
                 disabled={isProcessing}
             />
             <label className="form-check-label" htmlFor="remember">
                {t.remember}
             </label>
          </div>

          <button
              type="submit"
              className="btn btn-primary w-100 position-relative"
              disabled={isProcessing || isBlocked}
          >
             {isProcessing ? (
                 <>
                    <div className={"d-flex justify-content-center"}>
                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"/>
                       <span>{t.loading}</span>
                    </div>

                 </>
             ) : (
                 <span>{t.loginButton}</span>
             )}
          </button>

          <div className="py-3 link-remember">
             <div className="d-flex justify-between align-content-center align-items-center">
                <div className="col text-center">
                   <Link
                       href="/auth/forgot-password"
                       className="login-link-text text-primary text-decoration-none"
                   >
                      <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                         <g id="Icon/22/card">
                            <path
                                id="Vector"
                                d="M19.25 3.66663H2.74998C2.24372 3.66663 1.83331 4.07703 1.83331 4.58329V17.4166C1.83331 17.9229 2.24372 18.3333 2.74998 18.3333H19.25C19.7562 18.3333 20.1666 17.9229 20.1666 17.4166V4.58329C20.1666 4.07703 19.7562 3.66663 19.25 3.66663Z"
                                stroke="#7385FC"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <path
                                id="Vector_2"
                                d="M7.79165 11.4583C8.80415 11.4583 9.62498 10.6375 9.62498 9.62496C9.62498 8.61246 8.80415 7.79163 7.79165 7.79163C6.77914 7.79163 5.95831 8.61246 5.95831 9.62496C5.95831 10.6375 6.77914 11.4583 7.79165 11.4583Z"
                                stroke="#7385FC"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                            <path
                                id="Vector_3"
                                d="M10.5417 14.2084C10.5417 12.6896 9.31047 11.4584 7.79169 11.4584C6.27291 11.4584 5.04169 12.6896 5.04169 14.2084"
                                stroke="#7385FC"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="Vector_4"
                                d="M12.8333 9.16663H16.5"
                                stroke="#7385FC"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="Vector_5"
                                d="M13.75 12.8334H16.5"
                                stroke="#7385FC"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                         </g>
                      </svg>
                      {t.forgotPassword}
                   </Link>
                </div>
                <div className="col text-center">
                   <Link
                       href="/auth/forgot-email"
                       className="login-link-text text-primary text-decoration-none"
                   >
                      <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                         <g id="Icon/22/user">
                            <path
                                id="Vector"
                                d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
                                stroke="#7385FC"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                id="Vector_2"
                                d="M21 22C21 17.0294 16.9706 13 12 13C7.02945 13 3 17.0294 3 22"
                                stroke="#7385FC"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                         </g>
                      </svg>
                      {t.forgotEmail}
                   </Link>
                </div>
             </div>
          </div>

          <div className="py-1">
             <div className="d-flex align-items-center list-policy justify-content-center">
                <div
                    className="btn btn-ghost fs-14"
                    onClick={handleOpenConnectModal}
                >
                   {t.connect}
                </div>
                <span>|</span>
                <div
                    className="btn btn-ghost fs-14"
                    onClick={handleOpenTermsModal}
                >
                   {t.terms}
                </div>
                <span>|</span>
                <div
                    className="btn btn-ghost fs-14"
                    onClick={handleOpenSecurityModal}
                >
                   {t.security}
                </div>
             </div>
          </div>

          <div className="copyright mt-3 text-center text-muted wsp">
             {t.copyright.line1}
             <br />
             {t.copyright.line2}
          </div>


       </form>
   );
};
