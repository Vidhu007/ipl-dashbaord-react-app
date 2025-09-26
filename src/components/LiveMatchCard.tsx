import React from 'react';
import { LiveMatch } from '@/lib/types';

const LiveMatchCard: React.FC<{ match: LiveMatch | undefined }> = ({ match }) => {
    // resolving the "Cannot read properties of undefined" error.
    if (!match) {
        return null;
    }

    const isLive = match.status === 'live';

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 m-4">
            <div className={`p-4 ${isLive ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">{match.matchType}</h2>
                    {isLive && (
                        <div className="flex items-center">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            <span className="ml-2 font-semibold">LIVE</span>
                        </div>
                    )}
                </div>
                <p className="text-sm opacity-90">{match.venue}</p>
            </div>

            <div className="p-4 md:p-6 bg-gray-50">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-col items-center flex-1 text-center">
                        <img src={match.teamA.logo} alt={match.teamA.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full mb-2 border-2 border-gray-200" />
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base">{match.teamA.name}</h3>
                    </div>

                    {isLive ? (
                        <div className="flex-shrink-0 text-center">
                            <div className="font-bold text-xl md:text-2xl text-gray-900">
                                <span>{match.scoreA?.runs}/{match.scoreA?.wickets}</span>
                                <span className="text-sm font-normal text-gray-500"> ({match.scoreA?.overs})</span>
                            </div>
                            <span className="font-mono text-gray-500 text-lg">vs</span>
                            <div className="font-bold text-xl md:text-2xl text-gray-900">
                                <span>{match.scoreB?.runs}/{match.scoreB?.wickets}</span>
                                <span className="text-sm font-normal text-gray-500"> ({match.scoreB?.overs})</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-shrink-0 text-center">
                            <p className="font-bold text-xl md:text-2xl text-blue-700">
                                {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <span className="font-mono text-gray-500 text-lg">vs</span>
                            <p className="text-sm text-gray-600 mt-1">
                                {new Date(match.startTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col items-center flex-1 text-center">
                        <img src={match.teamB.logo} alt={match.teamB.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full mb-2 border-2 border-gray-200" />
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base">{match.teamB.name}</h3>
                    </div>
                </div>
            </div>
            <div className="p-3 bg-gray-100 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-700 italic">{match.commentary}</p>
            </div>
        </div>
    );
};

export default LiveMatchCard;
