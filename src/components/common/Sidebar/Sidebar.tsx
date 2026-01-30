// import React, { useState, useEffect } from 'react';
// import {
//   MdDashboard,
//   MdPeople,
//   MdPersonAdd,
//   MdAttachMoney,
//   MdTrendingUp,
//   MdReceipt,
//   MdSettings,
//   MdLogout,
//   MdMenu,
//   MdMenuOpen,
// } from 'react-icons/md';
// import { BiSolidBank } from 'react-icons/bi';
// import { HiOutlineDocumentText } from 'react-icons/hi';
// import { AiOutlineSwap } from 'react-icons/ai';
// import { FiChevronDown } from 'react-icons/fi';
// import { SidebarMenu } from './SidebarMenu';
// import type { MenuItem } from '../../../types/sidebar';
// import styles from './Sidebar.module.scss';

// interface SidebarProps {
//   isOpen?: boolean;
//   onClose?: () => void;
// }

// export const Sidebar: React.FC<SidebarProps> = ({
//   isOpen: externalIsOpen,
//   onClose,
// }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const [expandedSection, setExpandedSection] = useState<string | null>(
//     'customers',
//   );

//   // Auto-collapse on small screens
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024) {
//         // 1024px is the 'lg' breakpoint
//         setIsCollapsed(true);
//       } else {
//         setIsCollapsed(false);
//       }
//     };

//     // Check on initial load
//     handleResize();

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleCollapse = () => {
//     // Only allow manual toggle on larger screens
//     if (window.innerWidth >= 1024) {
//       setIsCollapsed(!isCollapsed);
//     }
//   };

//   const menuItems: MenuItem[] = [
//     {
//       id: 'switch-org',
//       label: 'Switch Organization',
//       icon: <BiSolidBank size={20} />,
//       href: '#',
//       section: 'main',
//     },
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: <MdDashboard size={20} />,
//       href: '/dashboard',
//       section: 'main',
//     },
//   ];

//   const customerItems: MenuItem[] = [
//     {
//       id: 'users',
//       label: 'Users',
//       icon: <MdPeople size={20} />,
//       href: '/users',
//     },
//     {
//       id: 'guarantors',
//       label: 'Guarantors',
//       icon: <MdPersonAdd size={20} />,
//       href: '/guarantors',
//     },
//     {
//       id: 'loans',
//       label: 'Loans',
//       icon: <MdAttachMoney size={20} />,
//       href: '/loans',
//     },
//     {
//       id: 'decision-models',
//       label: 'Decision Models',
//       icon: <MdTrendingUp size={20} />,
//       href: '/decision-models',
//     },
//     {
//       id: 'savings',
//       label: 'Savings',
//       icon: <MdAttachMoney size={20} />,
//       href: '/savings',
//     },
//     {
//       id: 'loan-requests',
//       label: 'Loan Requests',
//       icon: <HiOutlineDocumentText size={20} />,
//       href: '/loan-requests',
//     },
//     {
//       id: 'whitelist',
//       label: 'Whitelist',
//       icon: <MdPeople size={20} />,
//       href: '/whitelist',
//     },
//     {
//       id: 'karma',
//       label: 'Karma',
//       icon: <AiOutlineSwap size={20} />,
//       href: '/karma',
//     },
//   ];

//   const businessItems: MenuItem[] = [
//     {
//       id: 'organization',
//       label: 'Organization',
//       icon: <BiSolidBank size={20} />,
//       href: '/organization',
//     },
//     {
//       id: 'loan-products',
//       label: 'Loan Products',
//       icon: <MdAttachMoney size={20} />,
//       href: '/loan-products',
//     },
//     {
//       id: 'savings-products',
//       label: 'Savings Products',
//       icon: <MdAttachMoney size={20} />,
//       href: '/savings-products',
//     },
//     {
//       id: 'fees-charges',
//       label: 'Fees and Charges',
//       icon: <MdReceipt size={20} />,
//       href: '/fees-charges',
//     },
//     {
//       id: 'transactions',
//       label: 'Transactions',
//       icon: <AiOutlineSwap size={20} />,
//       href: '/transactions',
//     },
//     {
//       id: 'services',
//       label: 'Services',
//       icon: <MdSettings size={20} />,
//       href: '/services',
//     },
//     {
//       id: 'service-account',
//       label: 'Service Account',
//       icon: <MdPeople size={20} />,
//       href: '/service-account',
//     },
//     {
//       id: 'settlements',
//       label: 'Settlements',
//       icon: <AiOutlineSwap size={20} />,
//       href: '/settlements',
//     },
//   ];

//   const settingsItems: MenuItem[] = [
//     {
//       id: 'reports',
//       label: 'Reports',
//       icon: <HiOutlineDocumentText size={20} />,
//       href: '/reports',
//     },
//     {
//       id: 'preferences',
//       label: 'Preferences',
//       icon: <MdSettings size={20} />,
//       href: '/preferences',
//     },
//     {
//       id: 'fees-pricing',
//       label: 'Fees and Pricing',
//       icon: <MdReceipt size={20} />,
//       href: '/fees-pricing',
//     },
//     {
//       id: 'audit-logs',
//       label: 'Audit Logs',
//       icon: <HiOutlineDocumentText size={20} />,
//       href: '/audit-logs',
//     },
//   ];

//   const handleItemClick = (id: string) => {
//     setActiveItem(id);
//   };

//   const toggleSection = (section: string) => {
//     if (!isCollapsed) {
//       setExpandedSection(expandedSection === section ? null : section);
//     }
//   };

//   return (
//     <aside
//       className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.open}`}
//     >
//       {/* Toggle Button - Only show on desktop */}
//       {window.innerWidth >= 1024 && (
//         <button
//           className={styles.toggleButton}
//           onClick={toggleCollapse}
//           aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//         >
//           {isCollapsed ? <MdMenu size={24} /> : <MdMenuOpen size={24} />}
//         </button>
//       )}

//       <div className={styles.sidebarContent}>
//         {/* Main Menu */}
//         <div className={styles.menuSection}>
//           <SidebarMenu
//             items={menuItems}
//             activeItem={activeItem}
//             onItemClick={handleItemClick}
//             isCollapsed={isCollapsed}
//           />
//         </div>

//         {/* Customers Section */}
//         <div className={styles.sectionGroup}>
//           {!isCollapsed && (
//             <button
//               className={styles.sectionTitle}
//               onClick={() => toggleSection('customers')}
//             >
//               <span>CUSTOMERS</span>
//               <FiChevronDown
//                 size={20}
//                 className={`${styles.chevron} ${
//                   expandedSection === 'customers' ? styles.expanded : ''
//                 }`}
//               />
//             </button>
//           )}
//           {(expandedSection === 'customers' || isCollapsed) && (
//             <SidebarMenu
//               items={customerItems}
//               activeItem={activeItem}
//               onItemClick={handleItemClick}
//               isCollapsed={isCollapsed}
//             />
//           )}
//         </div>

//         {/* Businesses Section */}
//         <div className={styles.sectionGroup}>
//           {!isCollapsed && (
//             <button
//               className={styles.sectionTitle}
//               onClick={() => toggleSection('businesses')}
//             >
//               <span>BUSINESSES</span>
//               <FiChevronDown
//                 size={20}
//                 className={`${styles.chevron} ${
//                   expandedSection === 'businesses' ? styles.expanded : ''
//                 }`}
//               />
//             </button>
//           )}
//           {(expandedSection === 'businesses' || isCollapsed) && (
//             <SidebarMenu
//               items={businessItems}
//               activeItem={activeItem}
//               onItemClick={handleItemClick}
//               isCollapsed={isCollapsed}
//             />
//           )}
//         </div>

//         {/* Settings Section */}
//         <div className={styles.sectionGroup}>
//           {!isCollapsed && (
//             <button
//               className={styles.sectionTitle}
//               onClick={() => toggleSection('settings')}
//             >
//               <span>SETTINGS</span>
//               <FiChevronDown
//                 size={20}
//                 className={`${styles.chevron} ${
//                   expandedSection === 'settings' ? styles.expanded : ''
//                 }`}
//               />
//             </button>
//           )}
//           {(expandedSection === 'settings' || isCollapsed) && (
//             <SidebarMenu
//               items={settingsItems}
//               activeItem={activeItem}
//               onItemClick={handleItemClick}
//               isCollapsed={isCollapsed}
//             />
//           )}
//         </div>
//       </div>

//       {/* Logout Button */}
//       <div className={styles.sidebarFooter}>
//         <button className={styles.logoutButton}>
//           <MdLogout size={20} />
//           {!isCollapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

import React, { useState, useEffect } from 'react';
import {
  MdDashboard,
  MdPeople,
  MdPersonAdd,
  MdAttachMoney,
  MdTrendingUp,
  MdReceipt,
  MdSettings,
  MdLogout,
  MdMenu,
  MdMenuOpen,
} from 'react-icons/md';
import { BiSolidBank } from 'react-icons/bi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { AiOutlineSwap } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { SidebarMenu } from './SidebarMenu';
import type { MenuItem } from '../../../types/sidebar';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedSection, setExpandedSection] = useState<string | null>(
    'customers',
  );

  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // 1024px is the 'lg' breakpoint
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Check on initial load
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = () => {
    // Only allow manual toggle on larger screens
    if (window.innerWidth >= 1024) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 'switch-org',
      label: 'Switch Organization',
      icon: <BiSolidBank size={20} />,
      href: '#',
      section: 'main',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <MdDashboard size={20} />,
      href: '/dashboard',
      section: 'main',
    },
  ];

  const customerItems: MenuItem[] = [
    {
      id: 'users',
      label: 'Users',
      icon: <MdPeople size={20} />,
      href: '/users',
    },
    {
      id: 'guarantors',
      label: 'Guarantors',
      icon: <MdPersonAdd size={20} />,
      href: '/guarantors',
    },
    {
      id: 'loans',
      label: 'Loans',
      icon: <MdAttachMoney size={20} />,
      href: '/loans',
    },
    {
      id: 'decision-models',
      label: 'Decision Models',
      icon: <MdTrendingUp size={20} />,
      href: '/decision-models',
    },
    {
      id: 'savings',
      label: 'Savings',
      icon: <MdAttachMoney size={20} />,
      href: '/savings',
    },
    {
      id: 'loan-requests',
      label: 'Loan Requests',
      icon: <HiOutlineDocumentText size={20} />,
      href: '/loan-requests',
    },
    {
      id: 'whitelist',
      label: 'Whitelist',
      icon: <MdPeople size={20} />,
      href: '/whitelist',
    },
    {
      id: 'karma',
      label: 'Karma',
      icon: <AiOutlineSwap size={20} />,
      href: '/karma',
    },
  ];

  const businessItems: MenuItem[] = [
    {
      id: 'organization',
      label: 'Organization',
      icon: <BiSolidBank size={20} />,
      href: '/organization',
    },
    {
      id: 'loan-products',
      label: 'Loan Products',
      icon: <MdAttachMoney size={20} />,
      href: '/loan-products',
    },
    {
      id: 'savings-products',
      label: 'Savings Products',
      icon: <MdAttachMoney size={20} />,
      href: '/savings-products',
    },
    {
      id: 'fees-charges',
      label: 'Fees and Charges',
      icon: <MdReceipt size={20} />,
      href: '/fees-charges',
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <AiOutlineSwap size={20} />,
      href: '/transactions',
    },
    {
      id: 'services',
      label: 'Services',
      icon: <MdSettings size={20} />,
      href: '/services',
    },
    {
      id: 'service-account',
      label: 'Service Account',
      icon: <MdPeople size={20} />,
      href: '/service-account',
    },
    {
      id: 'settlements',
      label: 'Settlements',
      icon: <AiOutlineSwap size={20} />,
      href: '/settlements',
    },
  ];

  const settingsItems: MenuItem[] = [
    {
      id: 'reports',
      label: 'Reports',
      icon: <HiOutlineDocumentText size={20} />,
      href: '/reports',
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <MdSettings size={20} />,
      href: '/preferences',
    },
    {
      id: 'fees-pricing',
      label: 'Fees and Pricing',
      icon: <MdReceipt size={20} />,
      href: '/fees-pricing',
    },
    {
      id: 'audit-logs',
      label: 'Audit Logs',
      icon: <HiOutlineDocumentText size={20} />,
      href: '/audit-logs',
    },
  ];

  const handleItemClick = (id: string) => {
    setActiveItem(id);
  };

  const toggleSection = (section: string) => {
    if (!isCollapsed) {
      setExpandedSection(expandedSection === section ? null : section);
    }
  };

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.open}`}
    >
      {/* Toggle Button - Only show on desktop */}
      {window.innerWidth >= 1024 && (
        <button
          className={styles.toggleButton}
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <MdMenu size={24} /> : <MdMenuOpen size={24} />}
        </button>
      )}

      <div className={styles.sidebarContent}>
        {/* Main Menu */}
        <div className={styles.menuSection}>
          <SidebarMenu
            items={menuItems}
            activeItem={activeItem}
            onItemClick={handleItemClick}
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Customers Section */}
        <div className={styles.sectionGroup}>
          {!isCollapsed && (
            <button
              className={styles.sectionTitle}
              onClick={() => toggleSection('customers')}
            >
              <span>CUSTOMERS</span>
              <FiChevronDown
                size={20}
                className={`${styles.chevron} ${
                  expandedSection === 'customers' ? styles.expanded : ''
                }`}
              />
            </button>
          )}
          {(expandedSection === 'customers' || isCollapsed) && (
            <SidebarMenu
              items={customerItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
              isCollapsed={isCollapsed}
            />
          )}
        </div>

        {/* Businesses Section */}
        <div className={styles.sectionGroup}>
          {!isCollapsed && (
            <button
              className={styles.sectionTitle}
              onClick={() => toggleSection('businesses')}
            >
              <span>BUSINESSES</span>
              <FiChevronDown
                size={20}
                className={`${styles.chevron} ${
                  expandedSection === 'businesses' ? styles.expanded : ''
                }`}
              />
            </button>
          )}
          {(expandedSection === 'businesses' || isCollapsed) && (
            <SidebarMenu
              items={businessItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
              isCollapsed={isCollapsed}
            />
          )}
        </div>

        {/* Settings Section */}
        <div className={styles.sectionGroup}>
          {!isCollapsed && (
            <button
              className={styles.sectionTitle}
              onClick={() => toggleSection('settings')}
            >
              <span>SETTINGS</span>
              <FiChevronDown
                size={20}
                className={`${styles.chevron} ${
                  expandedSection === 'settings' ? styles.expanded : ''
                }`}
              />
            </button>
          )}
          {(expandedSection === 'settings' || isCollapsed) && (
            <SidebarMenu
              items={settingsItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
              isCollapsed={isCollapsed}
            />
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutButton}>
          <MdLogout size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
