const json = obj => JSON.stringify(obj);
const mode = "cors";
const headers = {
  "Accept-Charset": "utf-8",
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

const get = (url, callback) => {
  fetch(url, {
    mode,
    headers
  })
    .then(res => res.json())
    .then(res => callback(res))
    .catch(result => callback({ success: false, result }));
};

const post = (url, obj, callback) => {
  fetch(url, {
    mode,
    headers,
    method: "post",
    body: json(obj)
  })
    .then(res => res.json())
    .then(res => callback(res))
    .catch(result => callback({ success: false, result }));
};

const put = (url, obj, callback) => {
  fetch(url, {
    mode,
    headers,
    method: "put",
    body: json(obj)
  })
    .then(res => res.json())
    .then(res => callback(res))
    .catch(result => callback({ success: false, result }));
};

const trash = (url, obj, callback) => {
  fetch(url, {
    mode,
    headers,
    method: "delete",
    body: json(obj)
  })
    .then(res => res.json())
    .then(res => callback(res))
    .catch(result => callback({ success: false, result }));
};

const readable = number => {
  const n = Number(number);

  const k = Number(1000);
  const m = Number(1000000);
  const b = Number(1000000000);
  const t = Number(1000000000000);

  if (Math.trunc(n / k) > 0 && Math.trunc(n / k) < k) return `${n / k}K`;
  if (Math.trunc(n / m) > 0 && Math.trunc(n / m) < k) return `${n / m}M`;
  if (Math.trunc(n / b) > 0 && Math.trunc(n / b) < k) return `${n / b}B`;
  if (Math.trunc(n / t) > 0 && Math.trunc(n / t) < k) return `${n / t}T`;
  return number;
};

module.exports = { get, put, post, trash, readable };
