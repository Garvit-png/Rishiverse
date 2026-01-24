
import React, { useState, useEffect } from 'react';
import { User, Phone, MessageSquare, LogOut, X, Info, BadgeCheck, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, currentProfile }) => {
  const [view, setView] = useState<'menu' | 'about'>('about');

  // Ensure drawer always opens to the 'about' view as requested
  useEffect(() => {
    if (isOpen) setView('about');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end lg:justify-center lg:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Content Sheet */}
      <div className="relative w-full lg:max-w-xs bg-white rounded-t-[24px] lg:rounded-[24px] shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Drag Handle (Mobile) */}
        <div className="lg:hidden flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* User Info Header */}
        <div className="px-5 py-4 flex items-center gap-4 border-b border-gray-50 bg-gray-50/30">
          <div className="w-11 h-11 rounded-full bg-[#F2F4F7] flex items-center justify-center text-gray-500 font-bold text-sm border border-white shadow-sm">
            {currentProfile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] font-black text-gray-900 tracking-tight truncate uppercase">{currentProfile.name}</h3>
            <button 
              onClick={() => setView(view === 'about' ? 'menu' : 'about')}
              className="text-[10px] font-bold text-[#9D1D33] hover:underline"
            >
              {view === 'about' ? 'Main Menu' : 'About Details'}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          {view === 'about' ? (
            <div className="px-5 py-4 space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="space-y-3">
                <AboutItem icon={<BadgeCheck className="w-4 h-4 text-green-500" />} label="Student ID" value={`RU-2024-${currentProfile.id}0${currentProfile.id}`} />
                <AboutItem icon={<GraduationCap className="w-4 h-4 text-blue-500" />} label="Program" value="B.Tech Computer Science" />
                <AboutItem icon={<User className="w-4 h-4 text-purple-500" />} label="Semester" value="2th Semester" />
                <AboutItem icon={<Info className="w-4 h-4 text-gray-400" />} label="Hostel" value="Block A, Room 302" />
              </div>
              <button 
                onClick={() => setView('menu')}
                className="w-full py-2 bg-gray-50 rounded-xl text-[12px] font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Go to Services
              </button>
            </div>
          ) : (
            <div className="px-2 pb-3 space-y-0.5 animate-in fade-in slide-in-from-right-4 duration-300">
              <MenuOption 
                icon={<User className="w-5 h-5 text-gray-500" />} 
                title="View Profile" 
                subtitle="Manage your profile" 
              />
              <MenuOption 
                icon={<Phone className="w-5 h-5 text-gray-500" />} 
                title="Emergency Contact" 
                subtitle="24/7 Support Available" 
              />
              <MenuOption 
                icon={<MessageSquare className="w-5 h-5 text-gray-500" />} 
                title="Feedback Form" 
                subtitle="Share your thoughts" 
              />
              <div className="h-2" />
              <MenuOption 
                icon={<LogOut className="w-5 h-5 text-gray-500" />} 
                title="Log Out" 
                subtitle="Logout from your account" 
                variant="danger"
              />
            </div>
          )}
        </div>

        {/* Close button for larger screens */}
        <button 
          onClick={onClose}
          className="hidden lg:flex absolute -top-3 -right-3 w-7 h-7 bg-white rounded-full shadow-lg items-center justify-center text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const AboutItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
    <div className="shrink-0">{icon}</div>
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none">{label}</p>
      <p className="text-[13px] font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);

const MenuOption = ({ icon, title, subtitle, variant = 'default' }: { icon: React.ReactNode, title: string, subtitle: string, variant?: 'default' | 'danger' }) => (
  <button className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all active:scale-[0.98] group text-left">
    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white border border-gray-100 group-hover:shadow-sm transition-all shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-bold text-gray-900 leading-none truncate">{title}</p>
      <p className="text-[11px] font-medium text-gray-400 mt-1 truncate">{subtitle}</p>
    </div>
  </button>
);

export default ProfileDrawer;
