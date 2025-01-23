# Tritek Inventory Manager By Kevin

Tritek Inventory Manager is a simple inventory management system built using React (frontend) and Node.js with Express (backend). The backend uses a JSON file (`database.json`) as a lightweight database. The project is structured into two main directories:

- **frontend/** (React-based UI)
- **backend/** (Node.js + Express API)

The API includes artificial delays using `setTimeout` to simulate remote HTTP calls.

## Features
- Add, update, and delete inventory items
- Filter inventory items by category
- Sort items by name, quantity, price, and category
- Dark mode toggle for UI customization
- Data persistence using `database.json`
- Simulated API delays for realistic testing

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v14+ recommended)
- npm or yarn
- Git

### Setup Instructions

#### 1. Clone the repository
```sh
git clone git@github.com:Blazingkevin/tritek.git
cd tritek
```


#### 2. Setup and Start the Backend
```sh
cd backend
npm install
npm start
```

#### 3. Setup and Start the Frontend
```sh
cd ../frontend
npm install
npm run dev
```

The frontend will start and automatically connect to the backend running on port 5009

#### All data is stored in backend/database.json. You can inspect this file while interacting with the frontend to see the changes persist.
