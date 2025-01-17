'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/config';
import {useLoading} from "@/context/LoadingContext";
import {useNotification} from "@/context/NotificationContext";
import {apiService} from "@/services/api";
import {TokenService} from "@/services/token.service";

export const AuthContext = createContext(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { startLoading, stopLoading } = useLoading();
    const { showToast } = useNotification();
    const refreshToken = useCallback(async () => {
        try {
            const currentRefreshToken = TokenService.getRefreshToken();
            if (!currentRefreshToken) return;

            const data = await apiService.post(
                API_ENDPOINTS.AUTH.REFRESH,
                { refresh_token: currentRefreshToken }
            );

            TokenService.setAccessToken(data.access_token);
            TokenService.setRefreshToken(data.refresh_token);

            return data.access_token;
        } catch (error) {
            console.error('Token refresh failed:', error);
            // If refresh fails, log out the user
            TokenService.clearTokens();
            setUser(null);
            router.push('/login');
        }
    }, [router]);

    // Set up periodic token refresh
    useEffect(() => {
        if (!user) return;

        const intervalId = setInterval(refreshToken, 4 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, [user, refreshToken]);

    // Check if user is already logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }

                const access_token = TokenService.getAccessToken();
                if (access_token) {
                    const data = await apiService.get(
                        API_ENDPOINTS.AUTH.ME,
                        { access_token }
                    );
                    setUser(data.user);
                    refreshToken();
                } else {
                    setUser(null);
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    TokenService.clearTokens();
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [refreshToken]);

    const login = useCallback(async (email, password, remember = false) => {
        try {
            startLoading();
            const data = await apiService.post(
                API_ENDPOINTS.AUTH.LOGIN,
                { email, password, remember }
            );

            TokenService.setAccessToken(data.access_token, remember);
            TokenService.setRefreshToken(data.refresh_token, remember);

            setUser(data.user);
            showToast('Login successful', 'success');
            router.push('/dashboard');
        } catch (error) {
            throw error;
        } finally {
            stopLoading();
        }
    }, [router, startLoading, stopLoading]);

    const logout = useCallback(async () => {
        try {
            startLoading();
            await apiService.post(
                API_ENDPOINTS.AUTH.LOGOUT,
                { access_token: TokenService.getAccessToken() },
            );
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            TokenService.clearTokens();
            setUser(null);
            router.push('/login');
            stopLoading();
        }
    }, [router, startLoading, stopLoading]);

    const handleLogout = useCallback(async () => {
        try {
            await logout();
            TokenService.clearTokens();
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [logout, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout: handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
