
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  Ticket, 
  Utensils, 
  CreditCard, 
  Users, 
  MessageSquare, 
  FileText, 
  HelpCircle,
  LogOut,
  Search
} from 'lucide-react';
import { NavItem } from '../types';
import { Link } from 'react-router-dom';

interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems: { label: NavItem; icon: React.ReactNode; path: string }[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    { label: 'Profile', icon: <User className="w-5 h-5" />, path: '/profile' },
    { label: 'Calendar', icon: <Calendar className="w-5 h-5" />, path: '/calendar' },
    { label: 'Exit Pass', icon: <Ticket className="w-5 h-5" />, path: '/exit-pass' },
    { label: 'Food Menu', icon: <Utensils className="w-5 h-5" />, path: '/food' },
    { label: 'Fees and Payments', icon: <CreditCard className="w-5 h-5" />, path: '/fees' },
    { label: 'Clubs', icon: <Users className="w-5 h-5" />, path: '/clubs' },
    { label: 'Complaint', icon: <MessageSquare className="w-5 h-5" />, path: '/complaint' },
    { label: 'Guidelines & Policies', icon: <FileText className="w-5 h-5" />, path: '/guidelines' },
    { label: 'Help Centre', icon: <HelpCircle className="w-5 h-5" />, path: '/help' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search campus features" 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#9D1D33]/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => setActiveTab(item.label)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === item.label 
                ? 'bg-[#9D1D33]/5 text-[#9D1D33]' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-500 hover:text-[#9D1D33] hover:bg-red-50 rounded-lg transition-all border border-gray-100">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
