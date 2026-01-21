
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import ProfileDrawer from './ProfileDrawer';
import { UserProfile } from '../types';

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  activeTab: string;
  currentProfile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
  profiles: UserProfile[];
}

const Navbar: React.FC<NavbarProps> = ({ setIsSidebarOpen, activeTab, currentProfile, onProfileChange, profiles }) => {
  const [system, setSystem] = useState<'ERP' | 'LMS'>('ERP');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showQuickSwitch, setShowQuickSwitch] = useState(false);
  const quickSwitchRef = useRef<HTMLDivElement>(null);

  // Close quick switch when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (quickSwitchRef.current && !quickSwitchRef.current.contains(event.target as Node)) {
        setShowQuickSwitch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-purple-50">
            <span className="text-[8px] font-black text-purple-200 tracking-[0.1em]">NEW</span>
            <Sparkles className="w-3 h-3 text-purple-200" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Subtle Profile Switch Dot (Black) */}
          <div className="relative" ref={quickSwitchRef}>
            <button 
              onClick={() => setShowQuickSwitch(!showQuickSwitch)}
              className="w-1.5 h-1.5 rounded-full bg-black/40 hover:bg-black transition-all active:scale-90"
              title="Change Account"
            />
            
            {showQuickSwitch && (
              <div className="absolute top-full right-0 mt-3 w-40 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-1.5 animate-in zoom-in-95 duration-100 origin-top-right z-50">
                <div className="px-2 py-1 mb-1 border-b border-gray-50">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Accounts</p>
                </div>
                <div className="max-h-48 overflow-y-auto scrollbar-hide space-y-0.5">
                  {profiles.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onProfileChange(p);
                        setShowQuickSwitch(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${
                        currentProfile.id === p.id 
                          ? 'bg-[#9D1D33] text-white' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#F2F4F7] p-0.5 rounded-full flex items-center gap-0.5">
            <button
              onClick={() => setSystem('ERP')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                system === 'ERP' 
                  ? 'bg-white text-[#9D1D33] shadow-sm' 
                  : 'text-gray-400'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${system === 'ERP' ? 'bg-[#9D1D33]' : 'bg-gray-300'}`} />
              ERP
            </button>
            <button
              onClick={() => setSystem('LMS')}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                system === 'LMS' 
                  ? 'bg-white text-[#9D1D33] shadow-sm' 
                  : 'text-gray-400'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${system === 'LMS' ? 'bg-[#9D1D33]' : 'bg-gray-300'}`} />
              LMS
            </button>
          </div>

          {/* User Profile Trigger - Opens the About view */}
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="w-8 h-8 rounded-full bg-[#F2F4F7] flex items-center justify-center text-gray-500 font-bold text-[11px] border border-white shadow-sm active:scale-95 transition-transform"
          >
            {currentProfile.initials}
          </button>
        </div>
      </header>

      <ProfileDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        currentProfile={currentProfile}
      />
    </>
  );
};

export default Navbar;
