const pool = require('../config/db');
  
  // Helper function to format dates for frontend
  const formatForFrontend = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString();
  };

     // Convert dates to MySQL format (YYYY-MM-DD)
    //  const formatDateForMySQL = (dateString) => {
    //     console.log(dateString);
    //     dateString = normalizeDate(dateString);
    //     console.log(dateString);
    //     const date = new Date(dateString);
    //     return date.toISOString().split('T')[0]; // Extracts just the date part
    //   };

    //   const normalizeDate = (dateString) => {
    //     if (!dateString) return null;
        
    //     // Parse the date and remove timezone offset
    //     const date = new Date(dateString);
    //     return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    //   };

const getAllPlans = async (req, res, next) => {
  try {
    const [plans] = await pool.query(
      'SELECT * FROM journey_plans WHERE user_id = ?',
      [req.user.id]
    );
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

const getPlanById = async (req, res, next) => {
  try {
    const [plan] = await pool.query(
      'SELECT * FROM journey_plans WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (plan.length === 0) {
      return res.status(404).json({ message: 'Journey plan not found' });
    }
    const formattedPlan = {
        ...plan[0],
        start_date: formatForFrontend(plan[0].start_date),
        end_date: formatForFrontend(plan[0].end_date)
      };
    res.json(formattedPlan);
  } catch (error) {
    next(error);
  }
};

const createPlan = async (req, res, next) => {
    try {
      const { name, locations, start_date, end_date, activities, description } = req.body;
      
   

      const [result] = await pool.execute(
        'INSERT INTO journey_plans (name, locations, start_date, end_date, activities, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          name,
          JSON.stringify(locations),
          start_date, // Formatted date
          end_date,   // Formatted date
          JSON.stringify(activities),
          description,
          req.user.id
        ]
      );
  
      // Update user's journey plans array
      await pool.execute(
        'INSERT INTO user_journey_plans (user_id, journey_plan_id) VALUES (?, ?)',
        [req.user.id, result.insertId]
      );
  
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      next(error);
    }
  };

// const createPlan = async (req, res, next) => {
//   try {
//     const { name, locations, start_date, end_date, activities, description } = req.body;
    
//     const [result] = await pool.query(
//       'INSERT INTO journey_plans (name, locations, start_date, end_date, activities, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
//       [name, JSON.stringify(locations), start_date, end_date, JSON.stringify(activities), description, req.user.id]
//     );

//     // Update user's journey plans array
//     await pool.query(
//       'INSERT INTO user_journey_plans (user_id, journey_plan_id) VALUES (?, ?)',
//       [req.user.id, result.insertId]
//     );

//     res.status(201).json({ id: result.insertId });
//   } catch (error) {
//     next(error);
//   }
// };

const updatePlan = async (req, res, next) => {
  try {
    const { name, locations, start_date, end_date, activities, description } = req.body;
    
    const [result] = await pool.query(
      'UPDATE journey_plans SET name = ?, locations = ?, start_date = ?, end_date = ?, activities = ?, description = ? WHERE id = ? AND user_id = ?',
      [name, JSON.stringify(locations), start_date, end_date, JSON.stringify(activities), description, req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Journey plan not found' });
    }

    res.json({ message: 'Journey plan updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deletePlan = async (req, res, next) => {
  try {
    // First delete from junction table
    await pool.query(
      'DELETE FROM user_journey_plans WHERE journey_plan_id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    // Then delete from main table
    const [result] = await pool.query(
      'DELETE FROM journey_plans WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Journey plan not found' });
    }

    res.json({ message: 'Journey plan deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};