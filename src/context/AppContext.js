'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {Router} from "next/router";
import {Toast} from "primereact/toast";

const AppContext = createContext(undefined);

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppContext');
    }
    return context;
};

export const AppProvider = ({ children, initialConfig }) => {
    const [context, setContext] = useState(initialConfig || {
        app: 'App name',
        module: 'Module name',
    });
    const currentApp = context.app;
    const currentModule = context.module;

    console.log("initialConfig", initialConfig);
    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);
        Router.events.on('routeChangeError', handleComplete);

    }, []);

    return <AppContext.Provider value={initialConfig}>{children}</AppContext.Provider>;
}
