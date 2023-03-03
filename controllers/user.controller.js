// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const utils = require("./../utils");
const { contentTypes } = require("./../content-types");
const db = require("./../db");

exports.register = (req, res) => {
  const body = req.body;
  const result = {};

  if (body.length >= 1) {
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
        if (error) {
          res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
          return utils.errResponse(res, error.message);
        }
      }
    );
    res.writeHead(StatusCodes.CREATED, contentTypes.json);
    res.json({ email, name });
  }
};

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, email, name FROM Users WHERE email = ?",
      email,
      (err, user) => {
        if (err) {
          reject(err);
        } else {
          if (!user) {
            reject(reject(`User not found with email: ${email}`));
          }
          resolve(user);
        }
      }
    );
  });
}

exports.byemail = (req, res) => {
  if (req.query) {
    const email = req.query.email;
    findUserByEmail(email)
      .then((resolve) => {
        console.log(resolve);
        res.json(resolve);
      })
      .catch((error) => {
        console.log(error);
        return utils.errResponse(res, error);
      });
  } else {
    return utils.errResponse(res, "add email to query params");
  }
};

exports.index = (req, res) => {
  if (req.query) {
    const id = parseInt(req.query.id);

    db.get(
      "SELECT id, email, name FROM Users WHERE id = ?",
      id,
      (err, user) => {
        if (err) {
          throw new Error(err.message);
        } else {
          if (!user) {
            return utils.errResponse(res, `User not found with id: ${id}`);
          }
          return res.json(user);
        }
      }
    );
  } else {
    db.all("SELECT id, email, name FROM Users", (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        return res.json(data);
      }
    });
  }
};
