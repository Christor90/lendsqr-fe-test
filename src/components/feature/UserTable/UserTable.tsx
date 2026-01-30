import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
  type OnChangeFn,
} from '@tanstack/react-table';
import type { User, UsersResponse } from '../../../types/user';
import { mockApi } from '../../../services/api/mockApi';
import { createColumns } from './columns';
import styles from './UserTable.module.scss';

interface UserTableProps {
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  onDataUpdate: (total: number) => void;
}

interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export const UserTable: React.FC<UserTableProps> = ({
  pagination,
  onPaginationChange,
  onDataUpdate,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });

  // Fetch data whenever pagination changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response: UsersResponse = await mockApi.getUsers(
          pagination.pageIndex + 1,
          pagination.pageSize,
        );
        setData(response.users);
        setFilteredData(response.users);
        setRowCount(response.total);
        onDataUpdate(response.total);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [pagination.pageIndex, pagination.pageSize, onDataUpdate]);

  // Apply filters whenever activeFilters or data changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...data];

      if (activeFilters.organization) {
        filtered = filtered.filter((user) =>
          user.organization
            .toLowerCase()
            .includes(activeFilters.organization.toLowerCase()),
        );
      }

      if (activeFilters.username) {
        filtered = filtered.filter((user) =>
          user.username
            .toLowerCase()
            .includes(activeFilters.username.toLowerCase()),
        );
      }

      if (activeFilters.email) {
        filtered = filtered.filter((user) =>
          user.email.toLowerCase().includes(activeFilters.email.toLowerCase()),
        );
      }

      if (activeFilters.phoneNumber) {
        filtered = filtered.filter((user) =>
          user.phoneNumber.includes(activeFilters.phoneNumber),
        );
      }

      if (activeFilters.status) {
        filtered = filtered.filter(
          (user) =>
            user.status.toLowerCase() === activeFilters.status.toLowerCase(),
        );
      }

      if (activeFilters.date) {
        filtered = filtered.filter((user) =>
          user.dateJoined.includes(activeFilters.date),
        );
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [activeFilters, data]);

  const handleFilter = (filters: FilterValues) => {
    setActiveFilters(filters);
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleBlacklist = (userId: string, username: string) => {
    console.log('Blacklist user:', userId, username);
    // Update user status locally
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, status: 'Blacklisted' as const } : user,
      ),
    );
  };

  const handleActivate = (userId: string, username: string) => {
    console.log('Activate user:', userId, username);
    // Update user status locally
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId ? { ...user, status: 'Active' as const } : user,
      ),
    );
  };

  // Wrap onPaginationChange to handle updater functions
  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const newPagination =
      typeof updater === 'function' ? updater(pagination) : updater;
    onPaginationChange(newPagination);
  };

  const columns = createColumns(
    handleFilter,
    handleViewDetails,
    handleBlacklist,
    handleActivate,
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    rowCount,
    state: {
      pagination,
      columnFilters,
      sorting,
    },
    onPaginationChange: handlePaginationChange,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isLoading && data.length === 0) {
    return <div className={styles.loadingContainer}>Loading users...</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.headerRow}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.headerCell}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles.tableBody}>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className={styles.loadingCell}>
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.loadingCell}>
                  No users found matching the filters
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styles.bodyRow}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.bodyCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
