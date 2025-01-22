export type Category = 'Electronics' | 'Office Supplies' | 'Furniture' | 'Other';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: Category;
}

export type SortField = 'name' | 'price' | 'quantity' | 'category';
export type SortOrder = 'asc' | 'desc';