// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const utils = require("./../utils");
const { contentTypes } = require("./../content-types");
const userService = require("./user.service");

exports.register = async (req, res) => {
  const body = req.body;

  if (!Object.keys(body).length) {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "for creating a new user please send data!");
  } else {
    try {
      const newUserObject = await userService.store(body);
      res.writeHead(StatusCodes.CREATED, contentTypes.json);
      res.json(newUserObject);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  }
};

exports.getUserByEmail = async (req, res) => {
  if (req.query) {
    const email = req.query.email;
    try {
      const userObject = await userService.getUserByEmail(email);
      if (!userObject) {
        res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
        return utils.errResponse(
          res,
          `There is no user with this email: ${email}`
        );
      }
      res.writeHead(StatusCodes.OK, contentTypes.json);
      res.json(userObject);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  } else {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "add email to query params");
  }
};

exports.index = async (req, res) => {
  if (req.query) {
    const id = parseInt(req.query.id);
    try {
      const userObject = await userService.getUserbyID(id);
      if (!userObject) {
        res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
        return utils.errResponse(res, `There is no user with this id:${id}`);
      }
      res.writeHead(StatusCodes.OK, contentTypes.json);
      res.json(userObject);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  } else {
    try {
      const userObjects = await userService.getAllUsers();

      if (req.isJson) {
        res.writeHead(StatusCodes.OK, contentTypes.json);
        return res.json(userObjects);
      } else {
        const path = "./views/users/index.html";

        res.writeHead(StatusCodes.OK, contentTypes.html);
        utils.getFile(path, res, userObjects, "users");
      }
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  }
};

exports.ShowUserBookByEmail = async (req, res) => {
  if (req.query) {
    const email = req.query.email;
    try {
      const userObject = await userService.getAllBookRentByUserEmail(email);

      if (req.isJson) {
        res.writeHead(StatusCodes.OK, contentTypes.json);
        res.json(userObject);
      } else {
        const path = "./views/profile/index.html";

        res.writeHead(StatusCodes.OK, contentTypes.html);
        utils.getFile(path, res, userObject, "profile");
      }
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  } else {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "add email to query params");
  }
};
