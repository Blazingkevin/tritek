const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3009;
const DB_FILE = "database.json";

app.use(express.json());
app.use(cors());


const readData = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};


const writeData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};


app.get("/items", (req, res) => {
  res.json(readData());
});


app.post("/items", (req, res) => {
  const items = readData();
  const newItem = { id: uuidv4(), ...req.body };
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
});

// Update an item
app.put("/items/:id", (req, res) => {
  let items = readData();
  const { id } = req.params;
  items = items.map((item) => (item.id === id ? { ...item, ...req.body } : item));
  writeData(items);
  res.json({ message: "Item updated" });
});

// Delete an item
app.delete("/items/:id", (req, res) => {
  let items = readData();
  const { id } = req.params;
  items = items.filter((item) => item.id !== id);
  writeData(items);
  res.json({ message: "Item deleted" });
});

app.listen(PORT, () => console.log(`Tritek Server running on port ${PORT}`));
