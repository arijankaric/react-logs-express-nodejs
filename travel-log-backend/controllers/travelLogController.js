const pool = require('../config/db');

// Helper function to format dates for frontend
const formatForFrontend = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString();
};

const getAllLogs = async (req, res, next) => {
  try {
    const [logs] = await pool.query(
      'SELECT * FROM travel_logs WHERE user_id = ?',
      [req.user.id]
    );
    res.json(logs);
  } catch (error) {
    next(error);
  }
};

const getLogById = async (req, res, next) => {
  try {
    const [log] = await pool.query(
      'SELECT * FROM travel_logs WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (log.length === 0) {
      return res.status(404).json({ message: 'Travel log not found' });
    }
    const formattedLog = {
      ...log[0],
      start_date: formatForFrontend(log[0].start_date),
      end_date: formatForFrontend(log[0].end_date)
    };
    res.json(formattedLog);
  } catch (error) {
    next(error);
  }
};

const createLog = async (req, res, next) => {
  try {
    const { title, description, start_date, end_date, tags } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO travel_logs (title, description, start_date, end_date, tags, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, start_date, end_date, JSON.stringify(tags), req.user.id]
    );

    // Update user's travel logs array
    await pool.query(
      'INSERT INTO user_travel_logs (user_id, travel_log_id) VALUES (?, ?)',
      [req.user.id, result.insertId]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    next(error);
  }
};

const updateLog = async (req, res, next) => {
  try {
    const { title, description, start_date, end_date, tags } = req.body;
    
    const [result] = await pool.query(
      'UPDATE travel_logs SET title = ?, description = ?, start_date = ?, end_date = ?, tags = ? WHERE id = ? AND user_id = ?',
      [title, description, start_date, end_date, JSON.stringify(tags), req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Travel log not found' });
    }

    res.json({ message: 'Travel log updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteLog = async (req, res, next) => {
  try {
    // First delete from junction table
    await pool.query(
      'DELETE FROM user_travel_logs WHERE travel_log_id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    // Then delete from main table
    const [result] = await pool.query(
      'DELETE FROM travel_logs WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Travel log not found' });
    }

    res.json({ message: 'Travel log deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLogs,
  getLogById,
  createLog,
  updateLog,
  deleteLog
};