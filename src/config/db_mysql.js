import mysql from 'mysql';
import config from '../config';
import { logger } from '../utils'

const mysql_connection = {
    connectionLimit: 100,
    acquireTimeout: 5000,
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PSW,
    database: config.MYSQL_DB
};

logger.debug(`start **mysql** db on ${config.MYSQL_HOST}`);

const pool = mysql.createPool(mysql_connection);

pool.on('connection', () => logger.debug(`connected mysql db on: ${JSON.stringify(mysql_connection)}`));
pool.on('release', (connection) => logger.debug('Connection mysql released', connection.threadId));


export default pool
