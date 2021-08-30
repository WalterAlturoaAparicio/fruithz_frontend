import { Medico } from './medico.model';

export interface PaginationMedicos {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pagesQuantity: number;
  data: Medico[];
  filterValue: {};
  totalRows: number;
}
