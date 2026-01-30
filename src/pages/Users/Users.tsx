import React, { useState } from 'react';
import { StatsCardGrid } from '../../components/feature/StatsCard/StatsCardGrid';
import { UserTable } from '../../components/feature/UserTable/UserTable';
import { Pagination } from '../../components/feature/Pagination/Pagination';
import type { PaginationState } from '@tanstack/react-table';
import styles from './Users.module.scss';

export const Users: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalRecords, setTotalRecords] = useState(0);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination({
      pageIndex: 0,
      pageSize: size,
    });
  };

  const handleDataUpdate = (total: number) => {
    setTotalRecords(total);
  };

  const totalPages = Math.ceil(totalRecords / pagination.pageSize);

  return (
    <div className={styles.usersPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
      </div>

      {/* Stats Cards Section */}
      <div className={styles.statsSection}>
        <StatsCardGrid />
      </div>

      {/* Table Section */}
      <div className={styles.tableSection}>
        <UserTable
          pagination={pagination}
          onPaginationChange={setPagination}
          onDataUpdate={handleDataUpdate}
        />
      </div>

      {/* Pagination Section */}
      {totalRecords > 0 && (
        <Pagination
          currentPage={pagination.pageIndex + 1}
          totalPages={totalPages}
          pageSize={pagination.pageSize}
          totalRecords={totalRecords}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};
