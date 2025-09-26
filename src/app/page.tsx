"use client";
import React, { useState, useEffect, JSX } from 'react';

// build issue on vercel...resolved using relative paths
import { Tab } from '../lib/types';
import { dummyData } from '../lib/data';
import Header from '../components/Header';
import LiveMatchCard from '../components/LiveMatchCard';
import PointsTable from '../components/PointsTable';
import NetRunRateChart from '../components/NetRunRateChart';
import ScheduleList from '../components/ScheduleList';

// Define a type for the data structure
type AppData = typeof dummyData;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('live');
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API call ( scrapping)
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
      className={`flex-1 flex flex-col items-center justify-center p-2 text-sm transition-colors duration-200 ${activeTab === tab ? 'text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-100 rounded-lg'
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
        {/* Desktop View (Multi-column) */}
        <div className="hidden lg:flex lg:space-x-4 p-4">
          <div className="lg:w-2/3">
            {loading ? (
              <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 m-4 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <LiveMatchCard match={currentMatch} />
            )}
            <div>
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
