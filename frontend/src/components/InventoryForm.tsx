import React, { useState, useEffect } from 'react';
import { Plus, Save } from 'lucide-react';
import { Category, InventoryItem } from '../types';

interface InventoryFormProps {
  onAdd: (item: Omit<InventoryItem, 'id'>) => void;
  onUpdate?: (item: InventoryItem) => void;
  editingItem: InventoryItem | null;
}

export function InventoryForm({ onAdd, onUpdate, editingItem }: InventoryFormProps) {
  const [item, setItem] = useState({
    id: '',
    name: '',
    quantity: '',
    price: '',
    category: 'Other' as Category,
  });

  useEffect(() => {
    if (editingItem) {
      setItem({
        id: editingItem.id,
        name: editingItem.name,
        quantity: String(editingItem.quantity),
        price: String(editingItem.price),
        category: editingItem.category,
      });
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedItem = {
      name: item.name,
      quantity: Number(item.quantity) || 0,
      price: Number(item.price) || 0,
      category: item.category,
    };

    if (editingItem && onUpdate) {
      onUpdate({ ...formattedItem, id: editingItem.id });
    } else {
      onAdd(formattedItem);
    }
    
    setItem({ id: '', name: '', quantity: '', price: '', category: 'Other' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          placeholder="Item name"
          className="input-field"
          required
        />
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          placeholder="Quantity"
          min="0"
          className="input-field"
          required
        />
        <input
          type="number"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          placeholder="Price"
          min="0"
          step="0.01"
          className="input-field"
          required
        />
        <select
          value={item.category}
          onChange={(e) => setItem({ ...item, category: e.target.value as Category })}
          className="input-field"
        >
          <option value="Electronics">Electronics</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        {editingItem ? (
          <>
            <Save className="w-5 h-5" />
            Update Item
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Add Item
          </>
        )}
      </button>
    </form>
  );
}