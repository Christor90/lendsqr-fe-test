import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem as MenuItemType } from '../../../types/sidebar';
import styles from './Sidebar.module.scss';

interface SidebarMenuProps {
  items: MenuItemType[];
  activeItem?: string;
  onItemClick?: (id: string) => void;
  isCollapsed?: boolean;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  activeItem,
  onItemClick,
  isCollapsed = false,
}) => {
  const location = useLocation();

  return (
    <ul className={styles.menuList}>
      {items.map((item) => {
        const isActive =
          location.pathname === item.href || activeItem === item.id;

        return (
          <li key={item.id} className={styles.menuItem}>
            <Link
              to={item.href || '#'}
              className={`${styles.menuLink} ${
                isActive ? styles.active : ''
              } ${isCollapsed ? styles.collapsed : ''}`}
              onClick={() => {
                if (onItemClick) {
                  onItemClick(item.id);
                }
              }}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              {!isCollapsed && (
                <span className={styles.menuLabel}>{item.label}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
