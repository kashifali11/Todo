export interface PaginationOptions {
  page: number;
  limit: number;
}

interface PaginatedProps<T> {
  data: T[];
  page: number;
  limit: number;
  totalRecords: number;
}

export enum DefaultPaginationOptions {
  DEFAULT_PAGE = 1,
  DEFAULT_LIMIT = 20,
}

export class Paginated<T> {
  data: T[];
  page: number;
  nextPage: number | null;
  totalPages: number;
  prevPage: number | null;
  constructor({ data, page, limit, totalRecords }: PaginatedProps<T>) {
    this.data = data;
    this.page = page;
    this.totalPages = this.getTotalPages(totalRecords, limit);
    this.nextPage = page < this.totalPages ? page + 1 : null;
    this.prevPage = page > 1 ? page - 1 : null;
  }

  private getTotalPages(totalRecords: number, limit: number) {
    if (totalRecords === 0) {
      return 0;
    }

    let totalPages = Math.floor(totalRecords / limit);
    if (totalRecords % limit !== 0) {
      totalPages += 1;
    }

    return totalPages;
  }

  static create<T>(paginatedProps: PaginatedProps<T>) {
    return new Paginated(paginatedProps);
  }
}
