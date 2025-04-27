const pool = require('../config/db');

class JourneyPlan {
  static async create({ name, locations, start_date, end_date, activities, description, user_id }) {
    const [result] = await pool.query(
      'INSERT INTO journey_plans (name, locations, start_date, end_date, activities, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, JSON.stringify(locations), start_date, end_date, JSON.stringify(activities), description, user_id]
    );
    return result.insertId;
  }

  static async findByUserId(userId) {
    const [plans] = await pool.query(
      'SELECT * FROM journey_plans WHERE user_id = ?',
      [userId]
    );
    return plans;
  }

  static async findById(id, userId) {
    const [plan] = await pool.query(
      'SELECT * FROM journey_plans WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return plan[0];
  }

  static async update(id, userId, updates) {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(key === 'locations' || key === 'activities' ? JSON.stringify(value) : value);
    }
    
    values.push(id, userId);
    
    const [result] = await pool.query(
      `UPDATE journey_plans SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      values
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM journey_plans WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = JourneyPlan;