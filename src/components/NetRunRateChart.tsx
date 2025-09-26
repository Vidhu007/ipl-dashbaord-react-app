import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
//import { TeamStanding } from '@/lib/types';
import { TeamStanding } from '../lib/types';

const NetRunRateChart: React.FC<{ data: TeamStanding[] }> = ({ data }) => {

    // preventing the "Cannot read properties of undefined (reading 'map')" error.
    if (!data || data.length === 0) {
        return (
            <div className="m-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200" style={{ height: 300 }}>
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">Loading chart data...</p>
                </div>
            </div>
        );
    }
    const chartData = data.map(team => ({
        name: team.team.shortName,
        nrr: parseFloat(team.nrr),
        fullName: team.team.name
    }));

    const CustomTooltip: React.FC<any> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
                    <p className="font-bold">{payload[0].payload.fullName}</p>
                    <p className="text-sm">{`NRR: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="m-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Team Net Run Rate (NRR)</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(206, 212, 218, 0.4)' }} />
                        <Bar dataKey="nrr">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.nrr >= 0 ? '#22c55e' : '#ef4444'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default NetRunRateChart;