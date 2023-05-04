const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'ali',
  password: 'admin',
  database: 'Spotify'
});

// Define User model
const User = {
  create: async (userData) => {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query('INSERT INTO Users SET ?', userData);
      return result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  },
  update: async (id, userData) => {
    const connection = await pool.getConnection();
    try {
      await connection.query('UPDATE Users SET ? WHERE User_Id = ?', [userData, id]);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  },
  findById: async (id) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM Users WHERE User_Id = ?', id);
      return rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = User;