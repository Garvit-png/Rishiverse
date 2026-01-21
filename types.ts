
export interface UserProfile {
  id: string;
  name: string;
  initials: string;
}

export interface ExitPass {
  id: string;
  outTime: string;
  inTime: string;
  location: string;
  reason: string;
  status: 'CLOSED' | 'OPEN' | 'PENDING';
}

export interface PassData {
  location: string;
  outTime: string;
  outDate: string;
  inTime: string;
  inDate: string;
  reason: string;
  duration: string;
}

export type NavItem = 
  | 'Dashboard' 
  | 'Profile' 
  | 'Calendar' 
  | 'Exit Pass' 
  | 'Food Menu' 
  | 'Fees and Payments' 
  | 'Clubs' 
  | 'Complaint' 
  | 'Guidelines & Policies' 
  | 'Help Centre';

export enum PassStatus {
  SUCCESS = 'SUCCESS',
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE'
}

export interface TimelineStep {
  label: string;
  statusLabel: string;
  status: PassStatus;
}
