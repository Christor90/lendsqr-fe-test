import React, { useState, useRef, useEffect } from 'react';
import styles from './FilterPopup.module.scss';

interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: FilterValues) => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export const FilterPopup: React.FC<FilterPopupProps> = ({
  isOpen,
  onClose,
  onApplyFilter,
  triggerRef,
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });

  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleInputChange = (field: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    });
  };

  const handleFilter = () => {
    onApplyFilter(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.filterPopup} ref={popupRef}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Organization</label>
        <select
          value={filters.organization}
          onChange={(e) => handleInputChange('organization', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Select</option>
          <option value="Lensqr">Lensqr</option>
          <option value="Lendstar">Lendstar</option>
          <option value="Irorun">Irorun</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Username</label>
        <input
          type="text"
          value={filters.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder="User"
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Email</label>
        <input
          type="email"
          value={filters.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Email"
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Date</label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Phone Number</label>
        <input
          type="tel"
          value={filters.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          placeholder="Phone Number"
          className={styles.filterInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>

      <div className={styles.filterActions}>
        <button
          onClick={handleReset}
          className={`${styles.filterButton} ${styles.resetButton}`}
        >
          Reset
        </button>
        <button
          onClick={handleFilter}
          className={`${styles.filterButton} ${styles.applyButton}`}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
