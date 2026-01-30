export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: MenuItem[];
  isActive?: boolean;
  section?: string;
}

export interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}
