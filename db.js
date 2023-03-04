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
                      isbn TEXT NOT NULL UNIQUE,
                      title TEXT NOT NULL,
                      author TEXT,
                      stock INTEGER NOT NULL,
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
                        REFERENCES Users(id),
                      UNIQUE (book_id, user_id)
      )`);
    });
  }
});

module.exports = db;
