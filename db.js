const sqlite3 = require("sqlite3").verbose();

const DBFILENAME = "libraryDB.sqlite3";

const db = new sqlite3.Database(DBFILENAME, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to db....");

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Books(
                      id INTEGER PRIMARY KEY,
                      isbn TEXT NOT NULL,
                      title TEXT NOT NULL,
                      author TEXT,
                      stock INTEGER,
                      published DATE,
                      publisher TEXT,
                      pages INTEGER
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Users(
                      id INTEGER PRIMARY KEY,
                      email TEXT NOT NULL UNIQUE,
                      name TEXT NOT NULL,
                      password TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Renting(
                      id INTEGER PRIMARY KEY,
                      book_id INTEGER NOT NULL,
                      user_id INTEGER NOT NULL,
                      rent_date DATE,
                      rent_days INTEGER,
                      FOREIGN KEY (book_id)
                        REFERENCES Books(id),
                      FOREIGN KEY (user_id)
                        REFERENCES User(id)
      )`);
    });
  }
});

module.exports = db;

exports.Books = [
  {
    id: 0,
    isbn: "9781593279509",
    title: "Eloquent JavaScript, Third Edition",
    author: "Marijn Haverbeke",
    stock: 3,
    published: "2018-12-04T00:00:00.000Z",
    publisher: "No Starch Press",
    pages: 472,
  },
  {
    id: 1,
    isbn: "9781491943533",
    title: "Practical Modern JavaScript",
    author: "Nicolás Bevacqua",
    stock: 5,
    published: "2017-07-16T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 334,
  },
  {
    id: 2,
    isbn: "9781593277574",
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    stock: 4,
    published: "2016-09-03T00:00:00.000Z",
    publisher: "No Starch Press",
    pages: 352,
  },
  {
    id: 3,
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    stock: 5,
    published: "2014-04-08T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 460,
  },
  {
    id: 4,
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    stock: 7,
    published: "2012-08-30T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 254,
  },
  {
    id: 5,
    isbn: "9798602477429",
    title: "You Don't Know JS Yet",
    author: "Kyle Simpson",
    stock: 8,
    published: "2020-01-28T00:00:00.000Z",
    publisher: "Independently published",
    pages: 143,
  },
  {
    id: 6,
    isbn: "9781484200766",
    title: "Pro Git",
    author: "Scott Chacon and Ben Straub",
    stock: 3,
    published: "2014-11-18T00:00:00.000Z",
    publisher: "Apress; 2nd edition",
    pages: 458,
  },
  {
    id: 7,
    isbn: "9781484242216",
    title: "Rethinking Productivity in Software Engineering",
    author: "Caitlin Sadowski, Thomas Zimmermann",
    stock: 3,
    published: "2019-05-11T00:00:00.000Z",
    publisher: "Apress",
    pages: 310,
  },
];

exports.Users = [
  {
    id: 0,
    email: "amin@yahoo.com",
    name: "amin",
    password: "",
  },
  {
    id: 1,
    email: "mohammad@yahoo.com",
    name: "mohammad",
    password: "",
  },
  {
    id: 2,
    email: "mahtab@yahoo.com",
    name: "mahtab",
    password: "",
  },
  {
    id: 3,
    email: "raha@yahoo.com",
    name: "raha",
    password: "",
  },
];

exports.Renting = [
  {
    id: 0,
    book_id: 0,
    user_id: 0,
    rent_date: "2023-01-11",
    rent_days: 5,
  },
  {
    id: 1,
    book_id: 1,
    user_id: 0,
    rent_date: "2023-02-01",
    rent_days: 5,
  },
  {
    id: 2,
    book_id: 2,
    user_id: 3,
    rent_date: "2023-02-10",
    rent_days: 5,
  },
];
