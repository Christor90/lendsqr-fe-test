import React from 'react';
import { SearchBar } from './SearchBar';
import { BiBell } from 'react-icons/bi';
import { BiChevronDown } from 'react-icons/bi';
import styles from './Header.module.scss';

interface HeaderProps {
  userImage?: string;
  userName?: string;
  onSearch?: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  userImage = '/headerImg.jpg',
  userName = 'Adedeji',
  onSearch,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <img src="/logo.svg" alt="Lendsqr Logo" className={styles.logo} />
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={onSearch} />

        {/* Right Section - Docs, Notifications, User */}
        <div className={styles.rightSection}>
          {/* Docs Link */}
          <a href="#" className={styles.docsLink}>
            Docs
          </a>

          {/* Notification Bell */}
          <button
            className={styles.notificationButton}
            aria-label="Notifications"
          >
            <BiBell size={24} />
          </button>

          {/* User Profile */}
          <div className={styles.userProfile}>
            <img src={userImage} alt={userName} className={styles.userImage} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userName}</span>
              <BiChevronDown size={20} className={styles.chevron} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
