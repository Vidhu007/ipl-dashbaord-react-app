import React from 'react';
import { TeamStanding } from '@/lib/types';

const PointsTable: React.FC<{ standings: TeamStanding[] }> = ({ standings }) => (
    <div className="m-4 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">Points Table 2025</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="py-3 px-3 text-center">Pos</th>
                        <th scope="col" className="py-3 px-4">Team</th>
                        <th scope="col" className="py-3 px-2 text-center">Pld</th>
                        <th scope="col" className="py-3 px-2 text-center">Won</th>
                        <th scope="col" className="py-3 px-2 text-center">Lost</th>
                        <th scope="col" className="py-3 px-2 text-center">Pts</th>
                        <th scope="col" className="py-3 px-4">NRR</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((s, index) => (
                        <tr key={s.position} className={`border-b ${index < 4 ? 'bg-green-50' : 'bg-white'} hover:bg-gray-50`}>
                            <td className="py-3 px-3 font-medium text-gray-900 text-center">{s.position}</td>
                            <td className="py-3 px-4">
                                <div className="flex items-center">
                                    <img src={s.team.logo} alt={s.team.name} className="w-6 h-6 rounded-full mr-3" />
                                    <span className="font-semibold text-gray-800">{s.team.name}</span>
                                </div>
                            </td>
                            <td className="py-3 px-2 text-center">{s.played}</td>
                            <td className="py-3 px-2 text-center font-semibold text-gray-700">{s.won}</td>
                            <td className="py-3 px-2 text-center">{s.lost}</td>
                            <td className="py-3 px-2 text-center font-bold text-gray-900">{s.points}</td>
                            <td className="py-3 px-4 font-mono">{s.nrr}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default PointsTable;