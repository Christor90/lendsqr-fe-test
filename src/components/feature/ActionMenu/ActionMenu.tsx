import React, { useState, useRef, useEffect } from 'react';
import { BiShow, BiUserX, BiUserCheck } from 'react-icons/bi';
import styles from './ActionMenu.module.scss';

interface ActionMenuProps {
  userId: string;
  username: string;
  currentStatus: string;
  onViewDetails: (userId: string) => void;
  onBlacklist: (userId: string, username: string) => void;
  onActivate: (userId: string, username: string) => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  userId,
  username,
  currentStatus,
  onViewDetails,
  onBlacklist,
  onActivate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleViewDetails = () => {
    onViewDetails(userId);
    setIsOpen(false);
  };

  const handleBlacklist = () => {
    onBlacklist(userId, username);
    setIsOpen(false);
  };

  const handleActivate = () => {
    onActivate(userId, username);
    setIsOpen(false);
  };

  return (
    <div className={styles.actionMenuWrapper}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.actionTrigger}
        aria-label="More actions"
      >
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </button>

      {isOpen && (
        <div className={styles.actionMenu} ref={menuRef}>
          <button onClick={handleViewDetails} className={styles.actionItem}>
            <BiShow className={styles.actionIcon} />
            <span>View Details</span>
          </button>

          <button
            onClick={handleBlacklist}
            className={styles.actionItem}
            disabled={currentStatus === 'Blacklisted'}
          >
            <BiUserX className={styles.actionIcon} />
            <span>Blacklist User</span>
          </button>

          <button
            onClick={handleActivate}
            className={styles.actionItem}
            disabled={currentStatus === 'Active'}
          >
            <BiUserCheck className={styles.actionIcon} />
            <span>Activate User</span>
          </button>
        </div>
      )}
    </div>
  );
};
