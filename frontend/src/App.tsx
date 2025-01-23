import React, { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { InventoryForm } from "./components/InventoryForm";
import { InventoryTable } from "./components/InventoryTable";
import { ThemeToggle } from "./components/ThemeToggle";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { InventoryItem, Category, SortField, SortOrder } from "./types";

const API_URL = "http://localhost:3009/items";

function App() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isDark, setIsDark] = useState(true);
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError("Failed to fetch items");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleAdd = (newItem: Omit<InventoryItem, "id">) => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const item: InventoryItem = {
  //       ...newItem,
  //       id: crypto.randomUUID(),
  //     };
  //     setItems([...items, item]);
  //   } catch (err) {
  //     setError("Failed to add item");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleAdd = async (newItem: Omit<InventoryItem, "id">) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) throw new Error("Failed to add item");
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleUpdate = (updatedItem: InventoryItem) => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  //     setEditingItem(null);
  //   } catch (err) {
  //     setError("Failed to update item");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleUpdate = async (updatedItem: InventoryItem) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${updatedItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) throw new Error("Failed to update item");
      fetchItems();
      setEditingItem(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDelete = (id: string) => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     setItems(items.filter((item) => item.id !== id));
  //   } catch (err) {
  //     setError("Failed to delete item");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      fetchItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredItems = items
    .filter((item) => filterCategory === "All" || item.category === filterCategory)
    .sort((a, b) => {
      const compareValue = sortOrder === "asc" ? 1 : -1;
      if (a[sortField] < b[sortField]) return -1 * compareValue;
      if (a[sortField] > b[sortField]) return 1 * compareValue;
      return 0;
    });

  const totalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tritek Inventory Manager</h1>
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        <div className="space-y-6">
          <InventoryForm onAdd={handleAdd} onUpdate={handleUpdate} editingItem={editingItem} />

          {error && <ErrorMessage message={error} />}
          {isLoading && <Loader />}

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value as Category | "All")} className="input-field">
                  <option value="All">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Inventory Value: ${totalValue.toFixed(2)}</div>
            </div>

            <InventoryTable items={filteredItems} onDelete={handleDelete} onEdit={handleEdit} sortField={sortField} sortOrder={sortOrder} onSort={handleSort} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
