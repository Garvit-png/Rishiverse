
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ExitPassView from './components/ExitPassView';
import SetupScreen from './components/SetupScreen';
import { NavItem, UserProfile, PassData } from './types';

const PROFILES: UserProfile[] = [
  { id: '1', name: 'GARVIT GANDHI', initials: 'GG' },
  { id: '2', name: 'GURTAZ SINGH', initials: 'GS' },
  { id: '3', name: 'YASH PRASAD', initials: 'YP' },
  { id: '4', name: 'CHIRAG TYAGI', initials: 'CT' },
  { id: '5', name: 'DHAVAL SETHI', initials: 'DS' },
  { id: '6', name: 'Gaurav Tanwarg', initials: 'GT' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavItem>('Exit Pass');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(PROFILES[0]);
  const [passData, setPassData] = useState<PassData | null>(null);

  if (!passData) {
    return <SetupScreen onComplete={setPassData} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-white">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 fixed inset-y-0 left-0 border-r border-gray-100 bg-white">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
          {/* Top Navbar */}
          <Navbar 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen} 
            activeTab={activeTab}
            currentProfile={currentProfile}
            onProfileChange={setCurrentProfile}
            profiles={PROFILES}
          />
          
          <main className="flex-1 p-4 md:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/exit-pass" replace />} />
              <Route path="/exit-pass" element={<ExitPassView passData={passData} />} />
              <Route path="*" element={
                <div className="flex items-center justify-center h-full text-gray-400">
                  Feature coming soon...
                </div>
              } />
            </Routes>
          </main>
          
          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div 
              className="w-64 h-full bg-white shadow-xl animate-in slide-in-from-left duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
