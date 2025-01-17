'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const withSystemAuth = (WrappedComponent) => {
    return function WithSystemAuthComponent(props) {
        const router = useRouter();
        const { user } = useAuth();

        if (typeof window === 'undefined') {
            return null;
        }

        if (!user) {
            router.push('/login');
            return null;
        }

        // Check if user has required permissions
        const hasRequiredPermission = user.permissions?.includes('SYSTEM_MANAGEMENT');
        
        if (!hasRequiredPermission) {
            router.push('/unauthorized');
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};
