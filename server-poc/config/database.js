const path = require('path');
const Database = require('better-sqlite3');
const fs = require('fs');

// Database file path
const dbPath = path.join(__dirname, '../data/microstory.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database connection
const db = new Database(dbPath, { verbose: console.log });

// Create tables if they don't exist
function initDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT
    )
  `);
}

// Initialize database
initDatabase();

module.exports = db; 