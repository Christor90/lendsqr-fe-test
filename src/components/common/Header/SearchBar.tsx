import React from 'react';
import type { ChangeEvent } from 'react';
import { BiSearch } from 'react-icons/bi';
import styles from './Header.module.scss';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for anything',
  onSearch,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <button className={styles.searchButton} aria-label="Search">
        <BiSearch size={20} />
      </button>
    </div>
  );
};
