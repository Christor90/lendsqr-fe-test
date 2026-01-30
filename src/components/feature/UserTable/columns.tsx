import { useState, useRef } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import type { User } from '../../../types/user';
import { LuListFilter } from 'react-icons/lu';
import { FilterPopup } from '../FilterPopup/FilterPopup';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import styles from './UserTable.module.scss';

interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

// Column header with filter
const ColumnHeader: React.FC<{
  title: string;
  onFilter?: (filters: FilterValues) => void;
}> = ({ title, onFilter }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const handleApplyFilter = (filters: FilterValues) => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <div className={styles.headerCellWrapper}>
      <span>{title}</span>
      <div style={{ position: 'relative' }}>
        <button
          ref={filterButtonRef}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={styles.sortButton}
          aria-label={`Filter ${title}`}
        >
          <LuListFilter />
        </button>
        <FilterPopup
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApplyFilter={handleApplyFilter}
          triggerRef={filterButtonRef as React.RefObject<HTMLElement>}
        />
      </div>
    </div>
  );
};

export const createColumns = (
  onFilter: (filters: FilterValues) => void,
  onViewDetails: (userId: string) => void,
  onBlacklist: (userId: string, username: string) => void,
  onActivate: (userId: string, username: string) => void,
): ColumnDef<User>[] => [
  {
    accessorKey: 'organization',
    header: () => <ColumnHeader title="ORGANIZATION" onFilter={onFilter} />,
    cell: (info) => (
      <span className={styles.cellText}>{info.getValue() as string}</span>
    ),
    size: 150,
  },
  {
    accessorKey: 'username',
    header: () => <ColumnHeader title="USERNAME" onFilter={onFilter} />,
    cell: (info) => (
      <span className={styles.cellText}>{info.getValue() as string}</span>
    ),
    size: 150,
  },
  {
    accessorKey: 'email',
    header: () => <ColumnHeader title="EMAIL" onFilter={onFilter} />,
    cell: (info) => (
      <span className={styles.cellText}>{info.getValue() as string}</span>
    ),
    size: 200,
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <ColumnHeader title="PHONE NUMBER" onFilter={onFilter} />,
    cell: (info) => (
      <span className={styles.cellText}>{info.getValue() as string}</span>
    ),
    size: 150,
  },
  {
    accessorKey: 'dateJoined',
    header: () => <ColumnHeader title="DATE JOINED" onFilter={onFilter} />,
    cell: (info) => (
      <span className={styles.cellText}>{info.getValue() as string}</span>
    ),
    size: 180,
  },
  {
    accessorKey: 'status',
    header: () => <ColumnHeader title="STATUS" onFilter={onFilter} />,
    cell: (info) => {
      const status = info.getValue() as string;
      return (
        <span
          className={`${styles.statusBadge} ${styles[`status-${status.toLowerCase()}`]}`}
        >
          {status}
        </span>
      );
    },
    size: 120,
  },
  {
    id: 'actions',
    header: '',
    cell: (info) => {
      const user = info.row.original;
      return (
        <ActionMenu
          userId={user.id}
          username={user.username}
          currentStatus={user.status}
          onViewDetails={onViewDetails}
          onBlacklist={onBlacklist}
          onActivate={onActivate}
        />
      );
    },
    size: 60,
  },
];
