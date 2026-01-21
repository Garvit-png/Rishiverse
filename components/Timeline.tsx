
import React from 'react';
import { Check } from 'lucide-react';
import { PassStatus, TimelineStep } from '../types';

interface TimelineProps {
  steps: TimelineStep[];
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  return (
    <div className="relative space-y-6">
      {/* Connector Line Base */}
      <div className="absolute left-[8px] top-2 bottom-2 w-[1.5px] bg-gray-100" />
      
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isSuccess = step.status === PassStatus.SUCCESS;
        const isPending = step.status === PassStatus.PENDING;

        return (
          <div key={index} className="relative flex items-start gap-4">
            {/* Marker */}
            <div className="relative z-10 flex items-center justify-center">
              {isSuccess ? (
                <div className="w-4 h-4 rounded-full bg-[#9D1D33] flex items-center justify-center shadow-sm">
                  <Check className="w-[9px] h-[9px] text-white stroke-[4px]" />
                </div>
              ) : isPending ? (
                <div className="w-4 h-4 rounded-full border-[1.5px] border-[#9D1D33] flex items-center justify-center bg-white shadow-sm ring-2 ring-[#9D1D33]/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9D1D33]" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border-[1.5px] border-gray-200 bg-white" />
              )}
              
              {/* Colored Line Segment for Success */}
              {isSuccess && !isLast && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1.5px] h-[28px] bg-[#9D1D33]" />
              )}
            </div>

            <div className="flex flex-col pt-0">
              <span className={`text-[12px] font-bold text-gray-900 leading-tight`}>
                {step.label}
              </span>
              <span className={`text-[9px] font-medium text-gray-400`}>
                {step.statusLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
