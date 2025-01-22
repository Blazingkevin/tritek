import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { InventoryItem, SortField, SortOrder } from '../types';

interface InventoryTableProps {
  items: InventoryItem[];
  onDelete: (id: string) => void;
  onEdit: (item: InventoryItem) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export function InventoryTable({
  items,
  onDelete,
  onEdit,
  sortField,
  sortOrder,
  onSort,
}: InventoryTableProps) {
  const SortIcon = () => (
    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th
              className="sortable-header"
              onClick={() => onSort('name')}
            >
              Name {sortField === 'name' && <SortIcon />}
            </th>
            <th
              className="sortable-header"
              onClick={() => onSort('quantity')}
            >
              Quantity {sortField === 'quantity' && <SortIcon />}
            </th>
            <th
              className="sortable-header"
              onClick={() => onSort('price')}
            >
              Price {sortField === 'price' && <SortIcon />}
            </th>
            <th
              className="sortable-header"
              onClick={() => onSort('category')}
            >
              Category {sortField === 'category' && <SortIcon />}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="table-cell">{item.name}</td>
              <td className="table-cell">{item.quantity}</td>
              <td className="table-cell">${item.price.toFixed(2)}</td>
              <td className="table-cell">{item.category}</td>
              <td className="table-cell">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}