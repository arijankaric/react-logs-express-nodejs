const pool = require('../config/db');

class TravelLog {
  static async create({ title, description, start_date, end_date, tags, user_id }) {
    const [result] = await pool.query(
      'INSERT INTO travel_logs (title, description, start_date, end_date, tags, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, start_date, end_date, JSON.stringify(tags), user_id]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [logs] = await pool.query(
      'SELECT * FROM travel_logs WHERE user_id = ?',
      [userId]
    );
    return logs;
  }

  static async findById(id, userId) {
    const [log] = await pool.query(
      'SELECT * FROM travel_logs WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return log[0];
  }

  static async update(id, userId, updates) {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(key === 'tags' ? JSON.stringify(value) : value);
    }
    
    values.push(id, userId);
    
    const [result] = await pool.query(
      `UPDATE travel_logs SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM travel_logs WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = TravelLog;