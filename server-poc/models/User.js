const db = require('../config/database');

class User {
  /**
   * Find a user by ID
   * @param {number} id - User ID
   * @returns {Object|null} - User object or null if not found
   */
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) || null;
  }
  
  /**
   * Find a user by email
   * @param {string} email - User email
   * @returns {Object|null} - User object or null if not found
   */
  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) || null;
  }
  
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Object} - Created user object
   */
  static create(userData) {
    const { username, email, password } = userData;
    
    const stmt = db.prepare(
      'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)'
    );
    
    const now = new Date().toISOString();
    const info = stmt.run(username, email, password, now);
    
    return {
      id: info.lastInsertRowid,
      username,
      email,
      created_at: now
    };
  }
  
  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {boolean} - Success status
   */
  static update(id, userData) {
    const allowedFields = ['username', 'email', 'password'];
    const updates = [];
    const values = [];
    
    for (const [key, value] of Object.entries(userData)) {
      if (allowedFields.includes(key)) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (updates.length === 0) {
      return false;
    }
    
    updates.push('updated_at = ?');
    values.push(new Date().toISOString());
    values.push(id);
    
    const stmt = db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`);
    const info = stmt.run(...values);
    
    return info.changes > 0;
  }
  
  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {boolean} - Success status
   */
  static delete(id) {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const info = stmt.run(id);
    
    return info.changes > 0;
  }
}

module.exports = User; 