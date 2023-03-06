// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const utils = require("./../utils");
const { contentTypes } = require("./../content-types");
const rentService = require("./rent.service");
const userService = require("./user.service");
const bookService = require("./book.service");

//TODO Check User Renting Count

exports.store = async (req, res) => {
  const body = req.body;
  if (!Object.keys(body).length) {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(
      res,
      "for creating a new renting please send data!"
    );
  } else {
    try {
      //---- find book with book_id ----
      const bookObject = await bookService.getBookbyID(parseInt(body.book_id));
      if (!bookObject) {
        res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
        return utils.errResponse(
          res,
          `There is no book with this id:${body.book_id}`
        );
      } else {
        // Check if book resource is engouh
        const countBookRent = await rentService.countBookRentbyID(
          parseInt(body.book_id)
        );
        if (bookObject.stock - countBookRent < 1) {
          res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
          return utils.errResponse(
            res,
            "There is not enough resource for renting this book"
          );
        } else {
          //---- find user with user_id ----
          const userObject = await userService.getUserbyID(
            parseInt(body.user_id)
          );
          if (!userObject) {
            res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
            return utils.errResponse(
              res,
              `There is no user with this id:${body.user_id}`
            );
          } else {
            //---- Check user currnet renting count ----
            const countUserRent = await rentService.countUserRentbyID(
              parseInt(body.user_id)
            );
            if (countUserRent >= 3) {
              res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
              return utils.errResponse(
                res,
                "Sorry, You reached maximum renting count"
              );
            } else {
              //---- Store New Renting Object in Database ----
              const newRentingObject = await rentService.store(body);
              res.writeHead(StatusCodes.CREATED, contentTypes.json);
              res.json(newRentingObject);
            }
          }
        }
      }
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  }
};

exports.destroy = async (req, res) => {
  if (req.query) {
    const id = req.query.id;
    try {
      await rentService.destroy(parseInt(id));
      res.writeHead(StatusCodes.NO_CONTENT, contentTypes.json);
      return res.end("ok");
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  } else {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "for delete a rentig please send rent id!");
  }
};

exports.returnBook = async (req, res) => {
  if (req.query) {
    const id = req.query.id;
    try {
      await rentService.destroy(parseInt(id));
      res.writeHead(StatusCodes.NO_CONTENT, contentTypes.json);
      return res.end("ok");
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  } else {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "for delete a rentig please send rent id!");
  }
};
