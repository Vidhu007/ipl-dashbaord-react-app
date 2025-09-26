import React from 'react';

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

export default Header;