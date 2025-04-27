const pool = require('../config/db');  // Add this at the top of the file

class User {
    static async create({ username, password, email, address }) {
      const [result] = await pool.execute(
        'INSERT INTO users (username, password, email, address) VALUES (?, ?, ?, ?)',
        [username, password, email, address]
      );
      return result.insertId;
    }
  
    static async findByUsername(username) {
      const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    }
  
    static async findById(id) {
      const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    }
  }
  
  module.exports = User;