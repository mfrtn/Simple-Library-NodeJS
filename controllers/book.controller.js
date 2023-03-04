// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const utils = require("./../utils");
const { contentTypes } = require("./../content-types");
const bookService = require("./book.service");

exports.index = async (req, res) => {
  if (req.query) {
    const id = parseInt(req.query.id);
    try {
      const bookObject = await bookService.getBookbyID(id);
      if (!bookObject) {
        res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
        return utils.errResponse(res, `There is no book with this id:${id}`);
      }
      res.writeHead(StatusCodes.OK, contentTypes.json);
      res.json(bookObject);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  } else {
    try {
      const bookObjects = await bookService.getAllBooks();
      res.writeHead(StatusCodes.OK, contentTypes.json);
      res.json(bookObjects);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  }
};

exports.update = async (req, res) => {
  const id = req.query.id;
  const body = req.body;

  if (!id) {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "for update a book please send book id!");
  } else if (!Object.keys(body).length) {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "for update a new book please send data!");
  } else {
    try {
      const newBookObject = await bookService.update(body, parseInt(id));
      res.writeHead(StatusCodes.CREATED, contentTypes.json);
      res.json(newBookObject);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  }
};

exports.destroy = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "for delete a book please send book id!");
  } else {
    try {
      await bookService.destroy(parseInt(id));
      res.writeHead(StatusCodes.NO_CONTENT, contentTypes.json);
      return res.end("ok");
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  }
};

exports.store = async (req, res) => {
  const body = req.body;
  if (!Object.keys(body).length) {
    res.writeHead(StatusCodes.NOT_ACCEPTABLE, contentTypes.json);
    return utils.errResponse(res, "for creating a new book please send data!");
  } else {
    try {
      const newBookObject = await bookService.store(body);
      res.writeHead(StatusCodes.CREATED, contentTypes.json);
      res.json(newBookObject);
    } catch (error) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, contentTypes.json);
      return utils.errResponse(res, error.message);
    }
  }
};
