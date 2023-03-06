// NodeJS Modules
const url = require("url");

// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const utils = require("./utils");
const { contentTypes } = require("./content-types");

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
    query = url.parse(req.url).query;

    req.query = null;
    if (query) {
      req.query = utils.parseQueryFromUrl(query);
    }

    res.json = (data) => {
      utils.jsonSerialize(data, res);
    };
    req.isJson =
      req.headers["content-type"] === "application/json" ? true : false;
    req.body = {};
    if (req.isJson) {
      try {
        req.body = await utils.parseJsonBody(req);
      } catch (error) {
        console.log(error.message);
      }
    }
    routing[req.method][req.path](req, res);
  } catch (error) {
    console.log("ERROR OCCURED", error.message);
    res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
    return utils.errResponse(
      res,
      "The Page you are looking for is not availabe"
    );
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
