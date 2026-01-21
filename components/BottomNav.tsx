
import React from 'react';
import { Home, ShoppingBag, Coffee, ArrowLeft } from 'lucide-react';
import { NavItem } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const tabs = [
    { label: 'Dashboard', icon: <Home className="w-6 h-6 stroke-[1.2]" />, path: '/dashboard', display: 'Home' },
    { label: 'Exit Pass', icon: <ShoppingBag className="w-6 h-6 stroke-[1.2]" />, path: '/exit-pass', display: 'Exit Pass' },
    { label: 'Food Menu', icon: <Coffee className="w-6 h-6 stroke-[1.2]" />, path: '/food', display: 'Food' },
  ];

  return (
    <div className="flex items-center justify-around pt-2 pb-6 px-4 bg-white border-t border-gray-50">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          to={tab.path}
          onClick={() => setActiveTab(tab.label as NavItem)}
          className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-200 ${
            activeTab === tab.label ? 'text-[#9D1D33]' : 'text-gray-900'
          }`}
        >
          {tab.icon}
          <span className="text-[11px] font-bold tracking-tight">{tab.display}</span>
        </Link>
      ))}
      <button 
        onClick={() => navigate(-1)}
        className="flex flex-col items-center gap-1 min-w-[60px] text-gray-900"
      >
        <ArrowLeft className="w-6 h-6 stroke-[1.2]" />
        <span className="text-[11px] font-bold tracking-tight">Back</span>
      </button>
    </div>
  );
};

export default BottomNav;
