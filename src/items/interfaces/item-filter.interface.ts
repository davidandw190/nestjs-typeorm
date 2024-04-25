import { SortOrder } from '../enums/sort-order.enum';

/**
 * Interface representing filters for querying items.
 */
export interface ItemFilters {
  itemId?: number;
  listingId?: number;
  tagId?: number;
  isPublic?: boolean;
  itemName?: string;

  sortBy?: string;
  sortOrder?: SortOrder;

  page?: number;
  limit?: number;
}

export const DEFAULT_ITEM_FILTERS: ItemFilters = {
  sortBy: 'itemId',
  sortOrder: SortOrder.ASC,
  page: 1,
  limit: 10,
};
