// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const data = require("./../data");
const { contentTypes } = require("./../content-types");
const db = require("./../db");

function findBookObject(req, res) {
  const result = {};

  if (req.query) {
    const output = data.Books.filter((value) => {
      return value.id === parseInt(req.query.id);
    });

    if (output.length >= 1) {
      res.writeHead(StatusCodes.OK, contentTypes.json);
      return output[0];
    } else {
      res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
      result.error = true;
      result.message = "we can't find any books with your current query";
      return res.json(result);
    }
  } else {
    return null;
  }
}

exports.index = (req, res) => {
  if (req.query) {
    const output = findBookObject(req, res);
    if (output) {
      res.json(output);
    }
  } else {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    const output = data.Books.map((book) => {
      return {
        title: book.title,
        author: book.author,
      };
    });
    res.json(output);
  }
};

exports.update = (req, res) => {
  const body = req.body;
  const result = {};

  if (req.query) {
    const book = findBookObject(req, res);
    if (book) {
      if (!body) {
        res.writeHead(StatusCodes.OK, contentTypes.json);
        result.error = true;
        target;
        result.message = "for update a book please send data!";
        return res.json(result);
      } else {
        for (const key in body) {
          if (Object.hasOwnProperty.call(book, key)) {
            book[key] = body[key];
          }
        }
        return res.json(book);
      }
    }
  } else {
    res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
    result.error = true;
    result.message = "we can't find any books with your current query";
    return res.json(result);
  }
};

exports.delete = (req, res) => {
  const result = {};

  if (req.query) {
    const book = findBookObject(req, res);
    if (book) {
      data.Books = data.Books.filter((value) => {
        return value.id !== book.id;
      });
    }
    res.writeHead(StatusCodes.NO_CONTENT, contentTypes.json);
    res.json({ message: "Book has been deleted" });
  } else {
    res.writeHead(StatusCodes.NOT_FOUND, contentTypes.json);
    result.error = true;
    result.message = "we can't find any books with your current query";
    return res.json(result);
  }
};

exports.create = (req, res) => {
  const body = req.body;
  const result = {};

  if (!Object.keys(body).length) {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    result.error = true;
    result.message = "for creating a new book please send data!";
    res.json(result);
  } else {
    const { isbn, title, author, stock, published, publisher, pages } = body;
    const book = {
      id: data.Books.length,
      isbn,
      title,
      author,
      stock,
      published,
      publisher,
      pages,
    };
    data.Books.push(book);
    res.writeHead(StatusCodes.OK, contentTypes.json);
    res.json(book);
  }
};
