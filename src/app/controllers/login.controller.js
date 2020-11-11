import CryptoJS from "crypto-js";
import config from "../../config";
import { fetchJson, sign_token, logger, paramsWrapper } from "../../utils";
import pool from "../../config/db_mysql";
import cache from "memory-cache";

const authLogin = (req, res, next) => {
  const account = req.body.account;
  let password = req.body.password;
  // Decrypt password
  cache.del(account);
  let sql = "SELECT * FROM `members` WHERE `name` = ?";
  pool.query(sql, [account], (err, results) => {
    return new Promise((resolve, reject) => {
      if (err) reject({ errorMsg: err.errorMsg.sqlMessage });
      logger.debug(JSON.stringify(results));
      if (results.length < 1) {
        reject({ errorMsg: "帳號密碼錯誤" });
      }
      
      if (password === results[0].PASSWORD) {
        const payload = { user: results[0].NAME };
        const token = sign_token(payload);
        if (!token) {
          reject({ errorMsg: "Token產生錯誤" });
        }
        let response = {};
        response.data = {}
        response.data.account = results[0].NAME
        response.data.nickname = results[0].NICKNAME
        response.jwttoken = token;
        res.json(response)
      } else {
        reject({ errorMsg: "帳號密碼錯誤" });
      }
    }).catch(next);
  });
};

const authLogout = (req, res, next) => {
  const account = req.body.account;
  const token = cache.get(account);
  const url = `${config.php_server}/login/logout`;
  const options = {};
  options.method = "POST";
  const params = {};

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;
  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      cache.del(account);
      res.json(json);
    })
    .catch(next);
};

export default {
  authLogin,
  authLogout,
};
