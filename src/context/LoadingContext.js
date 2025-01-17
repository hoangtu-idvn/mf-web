'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loading } from '@/components/ui/Loading';


// Cấu hình mặc định
const defaultConfig = {
    completionTime: 500,    // 500ms cho animation hoàn thành
    minLoadingTime: 160,    // 160ms là thời gian tối thiểu
};


// Tạo context
const LoadingContext = createContext(undefined);

// Hook để sử dụng loading
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading phải được sử dụng trong LoadingProvider');
    }
    return context;
};

// Provider component
export const LoadingProvider = ({ children, initialConfig }) => {
    // State
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleting, setIsCompleting] = useState(false);
    const [config, setConfig] = useState(initialConfig || defaultConfig);

    // Hooks cho routing

    // Cập nhật cấu hình
    const updateConfig = useCallback((newConfig) => {
        setConfig(current => ({ ...current, ...newConfig }));
    }, []);

    // Bắt đầu loading
    const startLoading = useCallback(() => {
        console.log('Bắt đầu loading...');
        setIsCompleting(false);
        setIsLoading(true);
    }, []);

    // Kết thúc loading
    const stopLoading = useCallback(() => {
        console.log('Kết thúc loading...');
        setIsCompleting(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsCompleting(false);
        }, config.completionTime);
    }, [config.completionTime]);

    // Set trạng thái loading
    const setLoading = useCallback((loading) => {
        console.log('Set loading:', loading);
        if (loading) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    // Xử lý khi route thay đổi
    useEffect(() => {

        console.log('Route thay đổi, bắt đầu loading...');

        startLoading();

        const frame = requestAnimationFrame(() => {
            setTimeout(() => {
                const timer = setTimeout(() => {
                    console.log('Route đã load xong, kết thúc loading...');
                    stopLoading();
                }, config.minLoadingTime);
                return () => clearTimeout(timer);
            });
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [config.minLoadingTime, startLoading, stopLoading]);

    return (
        <LoadingContext.Provider value={{
            isLoading,
            setLoading,
            startLoading,
            stopLoading,
            updateConfig
        }}>
            <Loading isLoading={isLoading} isCompleting={isCompleting} config={config} />
            {children}
        </LoadingContext.Provider>
    );
};
