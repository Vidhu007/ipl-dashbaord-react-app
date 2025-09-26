import React from 'react';
import { ScheduledMatch } from '@/lib/types';

const ScheduleList: React.FC<{ matches: ScheduledMatch[] }> = ({ matches }) => (
    <div className="m-4">
        <h2 className="text-xl font-bold p-4 bg-white rounded-t-xl shadow-lg border-gray-200 border">Upcoming Schedule</h2>
        <div className="space-y-3">
            {matches.map(match => (
                <div key={match.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                        <span>Match {match.matchNumber}</span>
                        <span>{match.venue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img src={match.teamA.logo} alt={match.teamA.shortName} className="w-8 h-8" />
                            <span className="font-bold text-base">{match.teamA.name}</span>
                        </div>
                        <span className="text-gray-500 font-mono">vs</span>
                        <div className="flex items-center space-x-3">
                            <span className="font-bold text-base">{match.teamB.name}</span>
                            <img src={match.teamB.logo} alt={match.teamB.shortName} className="w-8 h-8" />
                        </div>
                    </div>
                    <div className="text-center mt-3 pt-3 border-t border-dashed">
                        <p className="font-semibold text-blue-700">{match.date} - {match.time}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default ScheduleList;
