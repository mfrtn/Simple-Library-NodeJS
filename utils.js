// NodeJS Modules
const fs = require("fs");

// NPM Modules
const { StatusCodes } = require("http-status-codes");
const { resolve } = require("path");

exports.getFile = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
      res.end(err);
    } else {
      res.end(data);
    }
  });
};

exports.parseJsonBody = (req) => {
  return new Promise((resolve) => {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(JSON.parse(body));
      });
  });
};

exports.jsonSerialize = (data, res) => {
  res.end(JSON.stringify(data));
};

exports.parseQueryFromUrl = (query) => {
  const queryObj = query.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    return { ...acc, [key]: value };
  }, {});
  return queryObj;
};

exports.errResponse = (res, errorMessage) => {
  const result = {
    error: true,
    message: errorMessage,
  };

  return res.json(result);
};
