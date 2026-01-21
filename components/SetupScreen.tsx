
import React, { useState } from 'react';
import { PassData } from '../types';
import { MapPin, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface SetupScreenProps {
  onComplete: (data: PassData) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    location: 'Bahalgarh',
    outTime: '14:02',
    outDate: 'Saturday, 10 Jan 2026',
    inTime: '21:12',
    inDate: 'Saturday, 10 Jan 2026',
    reason: 'Personal',
    duration: '7hrs 10min'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#9D1D33] flex items-center justify-center shadow-lg shadow-[#9D1D33]/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Generate Exit Pass</h1>
          <p className="text-sm text-gray-500 font-medium">Please enter the details for your pass simulation.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100 space-y-5">
          <div className="space-y-4">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                <MapPin className="w-3 h-3" /> Destination
              </label>
              <input 
                type="text" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#9D1D33]/10 focus:border-[#9D1D33]/30 transition-all"
                placeholder="e.g. Bahalgarh"
                required
              />
            </div>

            {/* Timings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                  <Clock className="w-3 h-3" /> Out Time
                </label>
                <input 
                  type="text" 
                  value={formData.outTime}
                  onChange={(e) => setFormData({...formData, outTime: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#9D1D33]/10 transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                  <Clock className="w-3 h-3" /> In Time
                </label>
                <input 
                  type="text" 
                  value={formData.inTime}
                  onChange={(e) => setFormData({...formData, inTime: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#9D1D33]/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                <Calendar className="w-3 h-3" /> Date
              </label>
              <input 
                type="text" 
                value={formData.outDate}
                onChange={(e) => setFormData({...formData, outDate: e.target.value, inDate: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#9D1D33]/10 transition-all"
                required
              />
            </div>

             {/* Duration & Reason */}
             <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                  Duration
                </label>
                <input 
                  type="text" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold focus:outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                  Reason
                </label>
                <input 
                  type="text" 
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#9D1D33] text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#801829] active:scale-[0.98] transition-all shadow-xl shadow-[#9D1D33]/20"
          >
            Start Session <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Rishiverse v2.5.0 • Authorized Access Only
        </p>
      </div>
    </div>
  );
};

export default SetupScreen;
