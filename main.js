// NodeJS Modules
const http = require("http");

// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const route = require("./routes");
const utils = require("./utils");
const { contentTypes } = require("./content-types");
const db = require("./db");
const {
  userController,
  bookController,
  rentController,
} = require("./controllers");

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

route.get("/books", bookController.index);

route.put("/books", bookController.update);

route.delete("/books", bookController.delete);

route.post("/books", bookController.create);

route.post("/renting", rentController.create);

route.post("/register", userController.register);

const server = http.createServer(route.handler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
