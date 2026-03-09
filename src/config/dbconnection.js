import mysql from 'mysql2/promise';

export const database = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bellaviu_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Add connection timeout and retry settings
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
});

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    const connection = await database.getConnection();
    console.log('Database connection successful:', {
      host: connection.config.host,
      user: connection.config.user,
      database: connection.config.database,
      state: connection.state
    });
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', {
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState
    });
    return false;
  }
};