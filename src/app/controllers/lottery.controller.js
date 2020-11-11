import config from "../../config";
import { fetchJson, logger, paramsWrapper } from "../../utils";
import cache from "memory-cache";
import pool from "../../config/db_mysql";
import { v4 as uuidv4 } from "uuid";

//取得彩票期數清單
const getIssueList = (req, res, next) => {
  const account = req.body.account;
  const lotteryId = req.body.lotteryId; //票種
  const limit = req.body.limit;
  const page = req.body.page;
  const token = cache.get(account);

  const url = `${config.php_server}/Lottery/getList`;
  const options = {};
  options.method = "POST";
  const params = {
    lotteryId,
    page,
    limit,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;
  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

//取得開獎號碼
const getWinningNumberList = (req, res, next) => {
  const account = req.body.account;
  const lotteryId = req.body.lotteryId; //票種
  const limit = req.body.limit;
  const page = req.body.page;
  const token = cache.get(account);

  const url = `${config.php_server}/Lottery/getList`;
  const options = {};
  options.method = "POST";
  const params = {
    lotteryId,
    page,
    limit,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;
  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

// 取得歷史帳單
const getHistoricalBill = (req, res, next) => {
  const account = req.body.account;
  const lotteryId = req.body.lotteryId; //票種
  const startIssue = req.body.startIssue;
  const endIssue = req.body.endIssue;
  const token = cache.get(account);
  const url = `${config.php_server}/Lottery_list/getHistoryBill`;
  const options = {};
  options.method = "POST";
  const params = {
    lotteryId,
    startIssue,
    endIssue,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;
  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

// 取得日誌
const getLogList = (req, res, next) => {
  const account = req.body.account;
  const logParentTypeId = req.body.logParentTypeId;
  const lotteryId = req.body.lotteryId;
  const token = cache.get(account);
  const url = `${config.php_server}/Record/getList`;
  const options = {};
  options.method = "POST";
  const params = {
    logParentTypeId,
    lotteryId,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;
  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

// 設定日誌為常用
const setLogRecord = (req, res, next) => {
  const account = req.body.account;
  const logId = req.body.id;
  const setUsually = req.body.isUsually;
  const token = cache.get(account);
  const url = `${config.php_server}/Record/setRecord`;
  const options = {};
  options.method = "POST";
  const params = {
    id: logId,
    isUsually: setUsually,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;
  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

//取得賠率
const getOdds = (req, res, next) => {
  const account = req.body.account;
  const lotteryId = req.body.lotteryId; //票種
  const lotteryIssueId = req.body.lotteryIssueId; //期號
  const lotteryTypeId = req.body.lotteryTypeId; //玩法 (OXXX, OOXX, OOOX...)
  const num = req.body.num; //下注號碼
  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/getOdds`;
  const options = {};
  options.method = "POST";
  const params = {
    lotteryId,
    lotteryIssueId,
    lotteryTypeId,
    num,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;
  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

//下注
const speedBet = (req, res, next) => {
  const account = req.body.account;
  const betAmountArray = req.body.betAmount; //下注金額
  const numArray = req.body.num; //下注號碼
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();
  let now =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  let sql =
    "INSERT INTO `order` (memberName, orderId, betAmount, odds, num, status, createDate) VALUES ?";
  let records = [];


  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
    await pool.query(sql, [records], (err, results) => {
      return new Promise((resolve, reject) => {
        if (err) reject({ errorMsg: err.errorMsg.sqlMessage });
        logger.debug(JSON.stringify(results));
        if (!results.insertId || results.affectedRows === 0) {
          reject({ errorMsg: "投注失敗" });
        }
        let response = {};
        response.message = "投注成功";
        res.json(response);
      }).catch(next);
    });
  }

  asyncForEach(numArray, async (array, index) => {
    let orderid = uuidv4();
    await records.push([account, orderid, betAmountArray[index], 100, array, 3, now]);
  })
};

//取得下注明細
const getLotteryList = (req, res, next) => {
  const account = req.body.account;
  const num = req.body.num || "";
  const betAmount = req.body.betAmount || "";
  const status = req.body.status || "";
  const page = Number(req.body.page);
  const limit = Number(req.body.limit);
  let sql = "SELECT * FROM `order` WHERE `memberName` = ?";

  pool.query(sql, [account], (err, results) => {
    return new Promise((resolve, reject) => {
      if (err) reject({ errorMsg: err.errorMsg.sqlMessage });
      logger.debug(JSON.stringify(results));
      let response = {};
      response.data = {};
      response.data.totalCount = results.length;
      let sliceresults = results.slice(
        (page - 1) * limit,
        (page - 1) * limit + limit
      );
      response.data.list = sliceresults;
      res.json(response);
    }).catch(next);
  });
};

//取得彩種中文名稱
const getLotteyNameList = (req, res, next) => {
  const account = req.body.account;
  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/getName`;
  const options = {};
  options.method = "POST";

  const params = {};
  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

//取得所有彩種開盤時間,距離關盤時間
const getLotteryOpen = (req, res, next) => {
  const account = req.body.account;
  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/getLotteryOpen`;
  const options = {};
  options.method = "POST";

  const params = {};
  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      const now = Date.now();
      json.now = now;
      res.json(json);
    })
    .catch(next);
};

//清空小票
const cleanTicket = (req, res, next) => {
  const account = req.body.account;
  const id = req.body.id;
  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/ticketClean`;
  const options = {};
  options.method = "POST";

  const params = {
    id,
  };
  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

//清空會員小票
const cleanMemberTicket = (req, res, next) => {
  const account = req.body.account;
  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/ticketMemberClean`;
  const options = {};
  options.method = "POST";

  const params = {};
  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

//退碼
const cancelOrder = (req, res, next) => {
  const account = req.body.account;
  const id = req.body.id; // 訂單編號
  const lotteryId = req.body.lotteryId;

  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/cancelOrder`;
  const options = {};
  options.method = "POST";

  const params = {
    id,
    lotteryId,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};
//打印
const ticketPrint = (req, res, next) => {
  const account = req.body.account;
  const id = req.body.id;

  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/ticketPrint`;
  const options = {};
  options.method = "POST";

  const params = {
    id,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};
//取得二字定賠率表
const getTwoWordsOdds = (req, res, next) => {
  const account = req.body.account;
  const lotteryId = req.body.lotteryId;
  const lotteryTypeId = req.body.lotteryTypeId;
  const lotteryIssueId = req.body.lotteryIssueId;

  const token = cache.get(account);
  const url = `${config.php_server}/Lottery/getTwoWordsOdds`;
  const options = {};
  options.method = "POST";

  const params = {
    lotteryId,
    lotteryTypeId,
    lotteryIssueId,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      res.json(json);
    })
    .catch(next);
};

// 取得賠率變動表
const getDynamicOdds = (req, res, next) => {
  const account = req.body.account;
  const lotteryId = req.body.lotteryId;
  const typeParentId = req.body.typeParentId;

  const token = cache.get(account);
  const url = `${config.php_server}/Lottery_list/getDynamicOdds`;
  const options = {};
  options.method = "POST";

  const params = {
    lotteryId,
    typeParentId,
  };

  let data = paramsWrapper(params);
  data = `data=${token}.${data}`;

  options.body = data;
  fetchJson(url, options, req)
    .then(({ json }) => {
      if (json.data["2"] && json.data["2"].length % 5 !== 0) {
        let count = 5 - (json.data["2"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["2"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["3"] && json.data["3"].length % 5 !== 0) {
        let count = 5 - (json.data["3"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["3"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["4"] && json.data["4"].length % 5 !== 0) {
        let count = 5 - (json.data["4"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["4"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["5"] && json.data["5"].length % 5 !== 0) {
        let count = 5 - (json.data["5"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["5"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["6"] && json.data["6"].length % 5 !== 0) {
        let count = 5 - (json.data["6"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["6"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["8"] && json.data["8"].length % 5 !== 0) {
        let count = 5 - (json.data["8"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["8"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["9"] && json.data["9"].length % 5 !== 0) {
        let count = 5 - (json.data["9"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["9"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["10"] && json.data["10"].length % 5 !== 0) {
        let count = 5 - (json.data["10"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["10"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["11"] && json.data["11"].length % 5 !== 0) {
        let count = 5 - (json.data["11"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["11"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["12"] && json.data["12"].length % 5 !== 0) {
        let count = 5 - (json.data["12"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["12"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["13"] && json.data["13"].length % 5 !== 0) {
        let count = 5 - (json.data["13"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["13"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["14"] && json.data["14"].length % 5 !== 0) {
        let count = 5 - (json.data["14"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["14"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["15"] && json.data["15"].length % 5 !== 0) {
        let count = 5 - (json.data["15"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["15"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["16"] && json.data["16"].length % 5 !== 0) {
        let count = 5 - (json.data["16"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["16"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["17"] && json.data["17"].length % 5 !== 0) {
        let count = 5 - (json.data["17"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["17"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["19"] && json.data["19"].length % 5 !== 0) {
        let count = 5 - (json.data["19"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["19"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["20"] && json.data["20"].length % 5 !== 0) {
        let count = 5 - (json.data["20"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["20"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["21"] && json.data["21"].length % 5 !== 0) {
        let count = 5 - (json.data["21"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["21"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["22"] && json.data["22"].length % 5 !== 0) {
        let count = 5 - (json.data["22"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["22"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["24"] && json.data["24"].length % 5 !== 0) {
        let count = 5 - (json.data["24"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["24"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["26"] && json.data["26"].length % 5 !== 0) {
        let count = 5 - (json.data["26"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["26"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["28"] && json.data["28"].length % 5 !== 0) {
        let count = 5 - (json.data["28"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["28"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      if (json.data["30"] && json.data["30"].length % 5 !== 0) {
        let count = 5 - (json.data["30"].length % 5);
        for (let i = 0; i < count; i++) {
          json.data["30"].push({
            id: "--",
            number: "--",
            dynamicOdds: "--",
          });
        }
      }
      res.json(json);
    })
    .catch(next);
};

export default {
  getIssueList,
  getWinningNumberList,
  getOdds,
  speedBet,
  getLotteyNameList,
  getLotteryList,
  getLotteryOpen,
  cleanTicket,
  cleanMemberTicket,
  cancelOrder,
  ticketPrint,
  getTwoWordsOdds,
  getDynamicOdds,
  getHistoricalBill,
  getLogList,
  setLogRecord,
};
