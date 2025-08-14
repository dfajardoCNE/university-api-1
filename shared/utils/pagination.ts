/**
 * Utility function to paginate an array of items. If page or limit are not
 * provided, the original array is returned unchanged. Page numbers start at 1.
 *
 * @param data Array of items to paginate
 * @param page Page number (1-based)
 * @param limit Number of items per page
 */
export function paginate<T>(data: T[], page?: number, limit?: number): T[] {
  if (!page || !limit) return data;
  const start = (page - 1) * limit;
  return data.slice(start, start + limit);
}