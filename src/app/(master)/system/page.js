'use client';

import { useState, useEffect } from 'react';
import { withSystemAuth } from './_hoc/withSystemAuth';
import { SystemUseCases } from '@/domain/useCases/systemUseCases';
import { SystemList } from './_components/SystemList';
import { SystemForm } from './_components/SystemForm';
import { useSystemRepository } from '@/infrastructure/repositories/systemRepository';

const SystemPage = () => {
    const [systems, setSystems] = useState([]);
    const [loading, setLoading] = useState(true);
    const systemRepository = useSystemRepository();
    const systemUseCases = new SystemUseCases(systemRepository);

    useEffect(() => {
        loadSystems();
    }, []);

    const loadSystems = async () => {
        try {
            setLoading(true);
            const data = await systemUseCases.getAllSystems();
            setSystems(data);
        } catch (error) {
            console.error('Error loading systems:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSystem = async (systemData) => {
        try {
            await systemUseCases.createSystem(systemData);
            await loadSystems();
        } catch (error) {
            console.error('Error creating system:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">System Management</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Create New System</h2>
                    <SystemForm onSubmit={handleCreateSystem} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Systems List</h2>
                    <SystemList systems={systems} onRefresh={loadSystems} />
                </div>
            </div>
        </div>
    );
};

export default withSystemAuth(SystemPage);