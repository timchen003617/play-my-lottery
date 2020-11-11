import { join } from 'path'

const config = {
  development: {
    port: 3000,
    root: join(__dirname, '..'),
    expiresIn: 60 * 60 * 2.5, // (單位：秒)
    memoryCacheExpire: 60 * 60 * 2.5 * 1000, // 單位(毫秒)
    secret: 'happy_tree_member',
    MYSQL_HOST: 'us-cdbr-east-02.cleardb.com',
    MYSQL_PORT: '3306',
    MYSQL_USER: 'bb99f0ef97b187',
    MYSQL_PSW: '5ff1c599',
    MYSQL_DB: 'heroku_824935d46004f29'
  },
  stage: {
    port: 3000,
    root: join(__dirname, '..'),
    expiresIn: 60 * 60 * 2.5, // (單位：秒)
    memoryCacheExpire: 60 * 60 * 2.5 * 1000, // 單位(毫秒)
    secret: 'happy_tree_member',
    loginSecret: 'happy_member_secret_3490',
    MYSQL_HOST: 'us-cdbr-east-02.cleardb.com',
    MYSQL_PORT: '3306',
    MYSQL_USER: 'bb99f0ef97b187',
    MYSQL_PSW: '5ff1c599',
    MYSQL_DB: 'heroku_824935d46004f29'
  }
}

export default config[process.env.NODE_ENV]
