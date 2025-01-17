'use client';

import { useState } from 'react';
import { SystemUseCases } from '@/domain/useCases/systemUseCases';
import { useSystemRepository } from '@/infrastructure/repositories/systemRepository';

export const SystemList = ({ systems, onRefresh }) => {
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [loading, setLoading] = useState(false);
    const systemRepository = useSystemRepository();
    const systemUseCases = new SystemUseCases(systemRepository);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await systemUseCases.deleteSystem(id);
            onRefresh();
        } catch (error) {
            console.error('Error deleting system:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {systems.map((system) => (
                            <tr key={system.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{system.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500">{system.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        system.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {system.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => setSelectedSystem(system)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(system.id)}
                                        disabled={loading}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedSystem && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">System Details</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    <strong>Name:</strong> {selectedSystem.name}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <strong>Description:</strong> {selectedSystem.description}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <strong>Status:</strong> {selectedSystem.status}
                                </p>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    onClick={() => setSelectedSystem(null)}
                                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
