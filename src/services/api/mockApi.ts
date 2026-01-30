import type { User, UserDetails, Guarantor } from '../../types/user';
import type { UsersResponse } from '../../types/user';
import type { StatsData } from '../../types/stats';

// Mock user data generator
const generateMockUsers = (count: number): User[] => {
  const organizations = ['Lensqr', 'Lendstar', 'Irorun'];
  const firstNames = [
    'Adedeji',
    'Debby',
    'Grace',
    'Tosin',
    'Chioma',
    'Amara',
    'Tunde',
  ];
  const lastNames = [
    'Ogana',
    'Effiom',
    'Dokunmu',
    'Adeyemi',
    'Okafor',
    'Ibrahim',
    'Johnson',
  ];
  const statuses: Array<'Active' | 'Inactive' | 'Pending' | 'Blacklisted'> = [
    'Active',
    'Inactive',
    'Pending',
    'Blacklisted',
  ];

  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    users.push({
      id: `LSQFf587g${i.toString().padStart(2, '0')}`,
      organization:
        organizations[Math.floor(Math.random() * organizations.length)],
      username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      email: `${firstName.toLowerCase()}${i}@lensqr.com`,
      phoneNumber: `0${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      dateJoined: new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }

  return users;
};

// Generate detailed user data
const generateUserDetails = (user: User): UserDetails => {
  const firstNames = ['Grace', 'Debby', 'Tosin', 'Chioma', 'Amara'];
  const lastNames = ['Effiom', 'Ogana', 'Dokunmu', 'Adeyemi', 'Okafor'];
  const educationLevels = ['B.Sc', 'M.Sc', 'HND', 'OND', 'Ph.D'];
  const employmentStatuses = ['Employed', 'Self-employed', 'Unemployed'];
  const sectors = [
    'FinTech',
    'Healthcare',
    'Education',
    'Agriculture',
    'Technology',
  ];
  const residenceTypes = [
    "Parent's Apartment",
    'Own Apartment',
    'Rented Apartment',
  ];
  const relationships = ['Sister', 'Brother', 'Friend', 'Colleague', 'Parent'];
  const genders: Array<'Male' | 'Female'> = ['Male', 'Female'];
  const maritalStatuses: Array<'Single' | 'Married' | 'Divorced' | 'Widowed'> =
    ['Single', 'Married', 'Divorced', 'Widowed'];

  const fullName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;

  // Generate guarantors
  const guarantors: Guarantor[] = [];
  const numGuarantors = Math.floor(Math.random() * 2) + 1; // 1 or 2 guarantors

  for (let i = 0; i < numGuarantors; i++) {
    const guarantorFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const guarantorLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];

    guarantors.push({
      fullName: `${guarantorFirstName} ${guarantorLastName}`,
      phoneNumber: `0${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      emailAddress: `${guarantorFirstName.toLowerCase()}@gmail.com`,
      relationship:
        relationships[Math.floor(Math.random() * relationships.length)],
    });
  }

  return {
    ...user,
    personalInfo: {
      fullName,
      phoneNumber: user.phoneNumber,
      emailAddress: user.email,
      bvn: user.phoneNumber,
      gender: genders[Math.floor(Math.random() * genders.length)],
      maritalStatus:
        maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
      children:
        Math.random() > 0.5 ? 'None' : `${Math.floor(Math.random() * 4) + 1}`,
      typeOfResidence:
        residenceTypes[Math.floor(Math.random() * residenceTypes.length)],
    },
    educationAndEmployment: {
      levelOfEducation:
        educationLevels[Math.floor(Math.random() * educationLevels.length)],
      employmentStatus:
        employmentStatuses[
          Math.floor(Math.random() * employmentStatuses.length)
        ],
      sectorOfEmployment: sectors[Math.floor(Math.random() * sectors.length)],
      durationOfEmployment: `${Math.floor(Math.random() * 10) + 1} years`,
      officeEmail: `${fullName.toLowerCase().replace(' ', '.')}@lensqr.com`,
      monthlyIncome: `₦${(Math.floor(Math.random() * 400) + 100) * 1000}.00- ₦${(Math.floor(Math.random() * 400) + 400) * 1000}.00`,
      loanRepayment: `${Math.floor(Math.random() * 100) + 10},000`,
    },
    socials: {
      twitter: `@${fullName.toLowerCase().replace(' ', '_')}`,
      facebook: fullName,
      instagram: `@${fullName.toLowerCase().replace(' ', '_')}`,
    },
    guarantors,
    accountInfo: {
      tier: Math.floor(Math.random() * 3) + 1,
      accountBalance: `₦${(Math.floor(Math.random() * 300) + 100) * 1000}.00`,
      accountNumber: `99${Math.floor(Math.random() * 90000000) + 10000000}`,
      bankName: 'Providus Bank',
    },
  };
};

// Create mock users array (500 users)
const mockUsers = generateMockUsers(500);

export const mockApi = {
  // Get all users with pagination
  getUsers: async (
    page: number = 1,
    pageSize: number = 10,
  ): Promise<UsersResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedUsers = mockUsers.slice(start, end);

        resolve({
          users: paginatedUsers,
          total: mockUsers.length,
        });
      }, 500);
    });
  },

  // Get stats data
  getStats: async (): Promise<StatsData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeCount = mockUsers.filter(
          (u) => u.status === 'Active',
        ).length;
        const withLoans = Math.floor(mockUsers.length * 0.5);
        const withSavings = Math.floor(mockUsers.length * 0.4);

        resolve({
          totalUsers: mockUsers.length,
          activeUsers: activeCount,
          usersWithLoans: withLoans,
          usersWithSavings: withSavings,
        });
      }, 500);
    });
  },

  // Get single user by ID
  getUserById: async (id: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === id);
        resolve(user || null);
      }, 300);
    });
  },

  // Get detailed user information
  getUserDetails: async (id: string): Promise<UserDetails | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === id);
        if (user) {
          const details = generateUserDetails(user);
          resolve(details);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },
};
