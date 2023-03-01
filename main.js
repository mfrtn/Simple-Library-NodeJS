// NodeJS Modules
const http = require("http");

// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const route = require("./routes");
const utils = require("./utils");
const { contentTypes } = require("./content-types");
const db = require("./db");

const PORT = process.env.PORT || 3000;

// BOOKS :
// 1. get all books
// 2. get a book detail
// 3. create a new book
// 4. edit a book
// 5. delete a book

route.get("/", (req, res) => {
  const path = "./views/index.html";
  utils.getFile(path, res);
});

route.get("/about", (req, res) => {
  res.writeHead(StatusCodes.OK, contentTypes.html);
  res.end("About");
});

function findBookObject(req, res) {
  const result = {};

  if (req.query) {
    const output = db.Books.filter((value) => {
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

route.get("/books", (req, res) => {
  if (req.query) {
    const output = findBookObject(req, res);
    if (output) {
      res.json(output);
    }
  } else {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    const output = db.Books.map((book) => {
      return {
        title: book.title,
        author: book.author,
      };
    });
    res.json(output);
  }
});

route.put("/books", (req, res) => {
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
});

route.delete("/books", (req, res) => {
  const result = {};

  if (req.query) {
    const book = findBookObject(req, res);
    if (book) {
      db.Books = db.Books.filter((value) => {
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
});

route.post("/books", (req, res) => {
  const body = req.body;
  const result = {};

  if (!body) {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    result.error = true;
    result.message = "for creating a new book please send data!";
    res.json(result);
  } else {
    const { isbn, title, author, stock, published, publisher, pages } = body;
    const book = {
      id: db.Books.length,
      isbn,
      title,
      author,
      stock,
      published,
      publisher,
      pages,
    };
    db.Books.push(book);
    res.writeHead(StatusCodes.OK, contentTypes.json);
    res.json(book);
  }
});

route.post("/renting", (req, res) => {
  const body = req.body;
  const result = {};

  if (!body) {
    res.writeHead(StatusCodes.OK, contentTypes.json);
    result.error = true;
    result.message = "for creating a new renting please send data!";
    res.json(result);
  } else {
    const { book_id, user_id, rent_date, rent_days } = body;
    const rent = {
      id: db.Renting.length,
      book_id: book_id,
      user_id: user_id,
      rent_date: rent_date,
      rent_days: rent_days,
    };
    db.Renting.push(rent);
    res.writeHead(StatusCodes.OK, contentTypes.json);
    res.json(rent);
  }
});

route.post("/register", (req, res) => {
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
});

const server = http.createServer(route.handler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
