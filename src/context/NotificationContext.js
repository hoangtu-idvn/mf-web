'use client';

import React, { createContext, useContext, ReactNode, useRef, useCallback } from 'react';
import {Toast} from "primereact/toast";

const DEFAULT_TOAST_CONFIG = {
    life: 5000,
    closable: true,
};

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
    const toastRef = useRef(null);

    const showToast = useCallback(
        (msg, Variant, summary, config) => {
        if (!toastRef.current) {
            console.warn('Toast reference is not available');
            return;
        }

        const toastConfig = {
            severity: Variant,
            summary: summary || Variant,
            detail: msg,
            ...DEFAULT_TOAST_CONFIG,
            ...config,
        };
        console.log(Variant);
        toastRef.current.show(toastConfig);
    },
    []
);

    return (
        <NotificationContext.Provider value={{ showToast }}>
            {children}
            <Toast ref={toastRef} position="top-right" />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
