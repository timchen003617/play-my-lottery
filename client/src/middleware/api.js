import config from "../config/config";
import { fetchJson, encodeReqPayload } from "../util";
const apiurl = `${config.node_server}/api`;

const authorization = () => {
  const url = `${apiurl}/authorization`;
  return fetchJson(url).then(({ json }) => {
    return json;
  });
};

const login = (payload) => {
  const url = `${apiurl}/login/login`;
  const options = {};
  options.method = "POST";
  const encodeData = encodeReqPayload(payload);
  options.body = JSON.stringify({ encodeData });
  return fetchJson(url, options).then(({ json }) => {
    return json;
  });
};

const speedBet = payload => {
  const account = localStorage.getItem('account')
  payload.account = account
  const url = `${apiurl}/Lottery/speedBet`
  const options = {}
  options.method = 'POST'
  const encodeData = encodeReqPayload(payload)
  options.body = JSON.stringify({ encodeData })
  return fetchJson(url, options).then(({ json }) => {
    return json
  })
}

const getLotteryList = payload => {
  const account = localStorage.getItem('account')
  payload.account = account
  const url = `${apiurl}/Lottery/getLotteryList`
  const options = {}
  options.method = 'POST'
  const encodeData = encodeReqPayload(payload)
  options.body = JSON.stringify({ encodeData })
  return fetchJson(url, options).then(({ json }) => {
    return json
  })
}

export default {
  authorization,
  login,
  speedBet,
  getLotteryList
};
