export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

export interface UsersResponse {
  users: User[];
  total: number;
}

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export interface StatsData {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}
