import React from 'react';
import styles from './StatsCard.module.scss';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
}) => {
  return (
    <div className={`${styles.statsCard} ${styles[`color-${color}`]}`}>
      <div className={styles.iconWrapper}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value.toLocaleString()}</p>
      </div>
    </div>
  );
};
