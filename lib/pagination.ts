export const PAGE_SIZE = 24;

export function paginate<T>(items: T[], page: number, pageSize: number = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    page: safePage,
    totalPages,
    totalItems: items.length,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}
