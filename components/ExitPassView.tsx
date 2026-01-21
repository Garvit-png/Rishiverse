
import React, { useState } from 'react';
import Timeline from './Timeline';
import { PassStatus, ExitPass, PassData } from '../types';
import { ChevronDown } from 'lucide-react';

interface ExitPassViewProps {
  passData: PassData;
}

const ExitPassView: React.FC<ExitPassViewProps> = ({ passData }) => {
  const [history] = useState<ExitPass[]>([
    { id: '29702', outTime: passData.outDate.replace(/^[A-Za-z]+, /, '') + ' ' + passData.outTime, inTime: passData.inDate.replace(/^[A-Za-z]+, /, '') + ' ' + passData.inTime, location: passData.location, reason: passData.reason, status: 'CLOSED' },
    { id: '25821', outTime: '19 Dec 2025 11:35', inTime: '06 Jan 2026 21:00', location: 'Marriage', reason: 'Family Event', status: 'CLOSED' },
    { id: '23158', outTime: '08 Dec 2025 19:53', inTime: '08 Dec 2025 21:45', location: 'Local', reason: 'Grocery', status: 'CLOSED' },
  ]);

  const steps = [
    { label: 'Gate Pass Generated', statusLabel: 'Successfully', status: PassStatus.SUCCESS },
    { label: "Warden's Approval", statusLabel: 'Approved', status: PassStatus.SUCCESS },
    { label: 'Check Out', statusLabel: 'Pending', status: PassStatus.PENDING },
    { label: 'Check In', statusLabel: 'Pending', status: PassStatus.INACTIVE },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-8 px-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-[#9D1D33] mt-1">Exit Pass</h1>

      {/* Daypass Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-sm mx-auto">
        {/* Card Header */}
        <div className="bg-[#9D1D33] px-4 py-3 flex justify-between items-center text-white">
          <div className="flex items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/90">
              <path d="M12 4V20M12 4L8 8M12 4L16 8M8 12H16M12 20L8 16M12 20L16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[11px] font-bold tracking-[0.2em]">DAYPASS</span>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-5 relative">
          {/* From Section */}
          <div className="flex justify-between items-start">
            <div className="space-y-0">
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">From</p>
              <p className="text-[14px] font-bold text-gray-900 leading-tight">Rishihood<br />University</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-bold text-gray-900 leading-none">{passData.outTime}</p>
              <p className="text-gray-400 text-[10px] font-medium mt-1">{passData.outDate}</p>
            </div>
          </div>

          {/* Duration Divider */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-gray-900 mb-0.5">{passData.duration}</span>
            <div className="flex items-center w-full px-2">
              <div className="flex-1 border-t border-dashed border-gray-200"></div>
              <div className="mx-1 text-gray-900">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rotate-90">
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </div>
              <div className="flex-1 border-t border-dashed border-gray-200"></div>
            </div>
          </div>

          {/* To Section */}
          <div className="flex justify-between items-end">
            <div className="space-y-0">
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">To</p>
              <p className="text-[14px] font-bold text-gray-900">{passData.location}</p>
            </div>
            <div className="text-right">
              <p className="text-[16px] font-bold text-gray-900 leading-none">{passData.inTime}</p>
              <p className="text-gray-400 text-[10px] font-medium mt-1">{passData.inDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="px-2 py-1 max-w-sm mx-auto">
        <Timeline steps={steps} />
      </div>

      {/* History Section */}
      <div className="pt-4">
        <div className="flex justify-between items-center mb-3 px-1">
          <h2 className="text-[15px] font-bold text-[#9D1D33]">History</h2>
          <button className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-100 rounded text-[10px] text-gray-500 font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Filter <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left text-[11px] whitespace-nowrap">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                <tr>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Outgoing</th>
                  <th className="px-3 py-2">Incoming</th>
                  <th className="px-3 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {history.map((pass) => (
                  <tr key={pass.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-3 py-2.5 font-bold text-gray-700">#{pass.id}</td>
                    <td className="px-3 py-2.5 text-gray-600 font-medium">{pass.outTime}</td>
                    <td className="px-3 py-2.5 text-gray-600 font-medium">{pass.inTime}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="px-2 py-0.5 rounded-full border border-gray-100 text-[9px] font-black text-gray-300 bg-white uppercase">
                        {pass.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitPassView;
