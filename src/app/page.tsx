"use client";
import React, { useState, useEffect } from 'react';
// For the new chart feature, you'll need to install recharts:
// npm install recharts
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- TYPE DEFINITIONS ---
interface Team {
  name: string;
  shortName: string;
  logo: string;
}

interface LiveMatch {
  id: number;
  status: 'live' | 'upcoming' | 'completed';
  venue: string;
  matchType: string;
  teamA: Team;
  teamB: Team;
  scoreA?: { runs: number; wickets: number; overs: number };
  scoreB?: { runs: number; wickets: number; overs: number };
  startTime: string;
  commentary: string;
}

interface TeamStanding {
  position: number;
  team: Team;
  played: number;
  won: number;
  lost: number;
  points: number;
  nrr: string;
}

interface ScheduledMatch {
  id: number;
  matchNumber: number;
  teamA: Team;
  teamB: Team;
  venue: string;
  date: string;
  time: string;
}

// --- DUMMY DATA (Simulating API response) ---
const dummyData = {
  liveMatch: {
    id: 1,
    status: 'live' as const,
    venue: "Wankhede Stadium, Mumbai",
    matchType: "Match 45, IPL 2025",
    teamA: { name: "Mumbai Indians", shortName: "MI", logo: "https://placehold.co/50x50/004B8D/FFFFFF?text=MI" },
    teamB: { name: "Chennai Super Kings", shortName: "CSK", logo: "https://placehold.co/50x50/FDB913/000000?text=CSK" },
    scoreA: { runs: 185, wickets: 4, overs: 18.2 },
    scoreB: { runs: 190, wickets: 5, overs: 20 },
    startTime: "2025-09-25T19:30:00Z",
    commentary: "Mumbai Indians need 6 runs in 10 balls. What a thriller!",
  },
  upcomingMatch: {
    id: 2,
    status: 'upcoming' as const,
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    matchType: "Match 46, IPL 2025",
    teamA: { name: "Royal Challengers Bengaluru", shortName: "RCB", logo: "https://placehold.co/50x50/EC1C24/000000?text=RCB" },
    teamB: { name: "Kolkata Knight Riders", shortName: "KKR", logo: "https://placehold.co/50x50/3A225D/FFFFFF?text=KKR" },
    startTime: "2025-09-26T19:30:00Z",
    commentary: "The Knight Riders take on RCB in a high-stakes clash tomorrow.",
  },
  pointsTable: [
    { position: 1, team: { name: "Rajasthan Royals", shortName: "RR", logo: "https://placehold.co/40x40/004D98/FFFFFF?text=RR" }, played: 12, won: 9, lost: 3, points: 18, nrr: "+0.562" },
    { position: 2, team: { name: "Kolkata Knight Riders", shortName: "KKR", logo: "https://placehold.co/40x40/3A225D/FFFFFF?text=KKR" }, played: 11, won: 8, lost: 3, points: 16, nrr: "+1.453" },
    { position: 3, team: { name: "Chennai Super Kings", shortName: "CSK", logo: "https://placehold.co/40x40/FDB913/000000?text=CSK" }, played: 12, won: 7, lost: 5, points: 14, nrr: "+0.710" },
    { position: 4, team: { name: "Sunrisers Hyderabad", shortName: "SRH", logo: "https://placehold.co/40x40/F26522/FFFFFF?text=SRH" }, played: 12, won: 7, lost: 5, points: 14, nrr: "+0.406" },
    { position: 5, team: { name: "Delhi Capitals", shortName: "DC", logo: "https://placehold.co/40x40/004C93/FFFFFF?text=DC" }, played: 12, won: 6, lost: 6, points: 12, nrr: "-0.154" },
    { position: 6, team: { name: "Lucknow Super Giants", shortName: "LSG", logo: "https://placehold.co/40x40/005999/FFFFFF?text=LSG" }, played: 12, won: 6, lost: 6, points: 12, nrr: "-0.789" },
    { position: 7, team: { name: "Mumbai Indians", shortName: "MI", logo: "https://placehold.co/40x40/004B8D/FFFFFF?text=MI" }, played: 12, won: 5, lost: 7, points: 10, nrr: "-0.212" },
    { position: 8, team: { name: "Royal Challengers Bengaluru", shortName: "RCB", logo: "https://placehold.co/40x40/EC1C24/000000?text=RCB" }, played: 12, won: 4, lost: 8, points: 8, nrr: "-0.345" },
    { position: 9, team: { name: "Punjab Kings", shortName: "PBKS", logo: "https://placehold.co/40x40/D71920/FFFFFF?text=PBKS" }, played: 11, won: 4, lost: 7, points: 8, nrr: "-0.423" },
    { position: 10, team: { name: "Gujarat Titans", shortName: "GT", logo: "https://placehold.co/40x40/1B2133/FFFFFF?text=GT" }, played: 12, won: 3, lost: 9, points: 6, nrr: "-1.112" },
  ],
  schedule: [
    { id: 1, matchNumber: 47, teamA: { name: "Sunrisers Hyderabad", shortName: "SRH", logo: "https://placehold.co/40x40/F26522/FFFFFF?text=SRH" }, teamB: { name: "Rajasthan Royals", shortName: "RR", logo: "https://placehold.co/40x40/004D98/FFFFFF?text=RR" }, venue: "Hyderabad", date: "Sep 27, 2025", time: "7:30 PM" },
    { id: 2, matchNumber: 48, teamA: { name: "Mumbai Indians", shortName: "MI", logo: "https://placehold.co/40x40/004B8D/FFFFFF?text=MI" }, teamB: { name: "Delhi Capitals", shortName: "DC", logo: "https://placehold.co/40x40/004C93/FFFFFF?text=DC" }, venue: "Mumbai", date: "Sep 28, 2025", time: "3:30 PM" },
    { id: 3, matchNumber: 49, teamA: { name: "Punjab Kings", shortName: "PBKS", logo: "https://placehold.co/40x40/D71920/FFFFFF?text=PBKS" }, teamB: { name: "Gujarat Titans", shortName: "GT", logo: "https://placehold.co/40x40/1B2133/FFFFFF?text=GT" }, venue: "Mohali", date: "Sep 28, 2025", time: "7:30 PM" },
    { id: 4, matchNumber: 50, teamA: { name: "Lucknow Super Giants", shortName: "LSG", logo: "https://placehold.co/40x40/005999/FFFFFF?text=LSG" }, teamB: { name: "Chennai Super Kings", shortName: "CSK", logo: "https://placehold.co/40x40/FDB913/000000?text=CSK" }, venue: "Lucknow", date: "Sep 29, 2025", time: "7:30 PM" },
  ],
};


// --- UI COMPONENTS ---

const Header: React.FC = () => (
  <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 shadow-md sticky top-0 z-20">
    <div className="container mx-auto flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
      </svg>
      <h1 className="text-2xl font-bold tracking-tight">IPL T20 Dashboard</h1>
    </div>
  </header>
);

const LiveMatchCard: React.FC<{ match: LiveMatch }> = ({ match }) => {
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
            <img src={match.teamA.logo} alt={match.teamA.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full mb-2 border-2 border-gray-200"/>
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
            <img src={match.teamB.logo} alt={match.teamB.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full mb-2 border-2 border-gray-200"/>
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

// --- NEW VISUALIZATION COMPONENT ---
const NetRunRateChart: React.FC<{ data: TeamStanding[] }> = ({ data }) => {
  const chartData = data.map(team => ({
    name: team.team.shortName,
    nrr: parseFloat(team.nrr),
    fullName: team.team.name
  }));

  const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
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
                  <img src={s.team.logo} alt={s.team.name} className="w-6 h-6 rounded-full mr-3"/>
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
              <img src={match.teamA.logo} alt={match.teamA.shortName} className="w-8 h-8"/>
              <span className="font-bold text-base">{match.teamA.name}</span>
            </div>
            <span className="text-gray-500 font-mono">vs</span>
             <div className="flex items-center space-x-3">
              <span className="font-bold text-base">{match.teamB.name}</span>
              <img src={match.teamB.logo} alt={match.teamB.shortName} className="w-8 h-8"/>
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


// --- MAIN APP COMPONENT ---

type Tab = 'live' | 'points' | 'schedule';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('live');
  const [data, setData] = useState<typeof dummyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const currentMatch = data?.liveMatch?.status === 'live' ? data.liveMatch : data?.upcomingMatch;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    if (!data) return <p className="text-center text-red-500 p-8">Failed to load data.</p>;

    switch (activeTab) {
      case 'live':
        return (
          <div>
            {currentMatch && <LiveMatchCard match={currentMatch} />}
            <div className="md:hidden"> 
              <PointsTable standings={data.pointsTable.slice(0, 4)} />
            </div>
          </div>
        );
      case 'points':
        return (
          <>
            <PointsTable standings={data.pointsTable} />
            <NetRunRateChart data={data.pointsTable} />
          </>
        );
      case 'schedule':
        return <ScheduleList matches={data.schedule} />;
      default:
        return null;
    }
  };

  const NavItem: React.FC<{ tab: Tab; icon: JSX.Element; label: string }> = ({ tab, icon, label }) => (
      <button
          onClick={() => setActiveTab(tab)}
          className={`flex-1 flex flex-col items-center justify-center p-2 text-sm transition-colors duration-200 ${
              activeTab === tab ? 'text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-100 rounded-lg'
          }`}
      >
          {React.cloneElement(icon, { className: 'h-6 w-6 mb-1' })}
          <span>{label}</span>
      </button>
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto pb-20">
        <div className="lg:flex lg:space-x-4">
            <div className="lg:w-2/3">
                 {loading ? (
                     <div className="flex justify-center items-center h-64">
                       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                     </div>
                 ) : (
                     currentMatch && <LiveMatchCard match={currentMatch} />
                 )}
                <div className="hidden lg:block">
                     {data && <ScheduleList matches={data.schedule} />}
                </div>
            </div>
            <div className="lg:w-1/3">
                 {data && (
                  <>
                    <PointsTable standings={data.pointsTable} />
                    <NetRunRateChart data={data.pointsTable} />
                  </>
                 )}
            </div>
        </div>
        
        {/* Mobile View with Tabs */}
         <div className="lg:hidden">
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around z-20">
          <NavItem
              tab="live"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048l5.962 5.962-5.962 5.962" /></svg>}
              label="Match"
          />
          <NavItem
              tab="points"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>}
              label="Table"
          />
          <NavItem
              tab="schedule"
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" /></svg>}
              label="Schedule"
          />
      </nav>
    </div>
  );
}
