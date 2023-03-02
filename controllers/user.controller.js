// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const data = require("./../data");
const { contentTypes } = require("./../content-types");
const db = require("./../db");

exports.register = (req, res) => {
  const body = req.body;
  const result = {};

  if (!body) {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    result.error = true;
    result.message = "for creating a new user please send data!";
    res.json(result);
  } else {
    const { email, name, password } = body;
    db.run(
      `INSERT INTO Users(email, name, password) VALUES (?, ?, ?)`,
      [email, name, password],
      (error) => {
        res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
        result.error = true;
        result.message = error.message;
        return res.json(result);
      }
    );
    const user = {
      email,
      name,
    };
    res.writeHead(StatusCodes.CREATED, contentTypes.json);
    res.json(user);
  }
};
