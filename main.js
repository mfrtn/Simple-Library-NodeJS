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

route.get("/books", (req, res) => {
  // console.log(req.query.split("="));
  res.writeHead(StatusCodes.OK, contentTypes.json);
  const output = db.Books.map((book) => {
    return {
      title: book.title,
      author: book.author,
    };
  });
  res.json(output, res);
});

route.post("/books", (req, res) => {
  const body = req.body;
  const result = null;
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

const server = http.createServer(route.handler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// http
//   .createServer((req, res) => {
//     console.log(req.method);
//     res.end("Hello World!");
//   })
//   .listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
