export interface TableState {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  sorting: Array<{ id: string; desc: boolean }>;
  columnFilters: Array<{ id: string; value: unknown }>;
}

export interface TableMeta {
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  pageSize: number;
}
