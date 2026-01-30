import React, { useEffect, useState } from 'react';
import {
  MdPeople,
  MdPersonAdd,
  MdAttachMoney,
  MdTrendingUp,
} from 'react-icons/md';
import { StatsCard } from './StatsCard';
import type { StatsData } from '../../../types/stats';
import { mockApi } from '../../../services/api/mockApi';
import styles from './StatsCard.module.scss';

export const StatsCardGrid: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await mockApi.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className={styles.gridLoading}>Loading stats...</div>;
  }

  if (!stats) {
    return <div className={styles.gridError}>Failed to load statistics</div>;
  }

  return (
    <div className={styles.statsGrid}>
      <StatsCard
        title="USERS"
        value={stats.totalUsers}
        icon={<MdPeople size={40} />}
        color="primary"
      />
      <StatsCard
        title="ACTIVE USERS"
        value={stats.activeUsers}
        icon={<MdPersonAdd size={40} />}
        color="secondary"
      />
      <StatsCard
        title="USERS WITH LOANS"
        value={stats.usersWithLoans}
        icon={<MdAttachMoney size={40} />}
        color="tertiary"
      />
      <StatsCard
        title="USERS WITH SAVINGS"
        value={stats.usersWithSavings}
        icon={<MdTrendingUp size={40} />}
        color="quaternary"
      />
    </div>
  );
};
