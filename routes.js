// NodeJS Modules
const url = require("url");

// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const utils = require("./utils");

const routing = {
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {},
};

exports.handler = async (req, res) => {
  try {
    req.path = url.parse(req.url).pathname;
    req.query = url.parse(req.url).query;
    res.json = (data) => {
      utils.jsonSerialize(data, res);
    };

    req.body = {};
    if (req.headers["content-type"] === "application/json") {
      req.body = await utils.parseJsonBody(req);
    }

    routing[req.method][req.path](req, res);
  } catch (error) {
    console.log("ERROR OCCURED");
    res.writeHead(StatusCodes.NOT_FOUND);
    res.end("NOT FOUND");
  }
};

exports.get = (url, action) => {
  routing.GET[url] = action;
};

exports.post = (url, action) => {
  routing.POST[url] = action;
};

exports.put = (url, action) => {
  routing.PUT[url] = action;
};

exports.patch = (url, action) => {
  routing.PATCH[url] = action;
};

exports.delete = (url, action) => {
  routing.DELETE[url] = action;
};
