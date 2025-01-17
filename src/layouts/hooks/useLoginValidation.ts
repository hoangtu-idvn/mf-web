import { useState, useCallback } from 'react';
import t from '@/locales';



export const useLoginValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = useCallback((email: string)=> {
    if (!email) {
      return t.validation.emailRequired;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return t.validation.emailInvalid;
    }
    return undefined;
  }, [t]);

  const validatePassword = useCallback((password: string) => {
    if (!password) {
      return t.validation.passwordRequired;
    }
    if (password.length < 6) {
      return t.validation.passwordLength;
    }
    return undefined;
  }, [t]);

  const validateForm = useCallback((data: { email: string, password: string }) => {
    const newErrors: { [key: string]: string } = {};
    
    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateEmail, validatePassword]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    clearErrors,
  };
};
