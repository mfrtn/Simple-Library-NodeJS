const db = require("./../db");

function getBookbyID(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM Books WHERE id = ?", id, (err, book) => {
      if (err) {
        reject(err);
      } else {
        resolve(book);
      }
    });
  });
}

function getAllBooks() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Books ", (err, books) => {
      if (err) {
        reject(err);
      } else {
        resolve(books);
      }
    });
  });
}

function store(body) {
  const { isbn, title, author, stock, published, publisher, pages } = body;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Books(isbn, title, author, stock, published, publisher, pages ) VALUES (?, ?, ? ,?, ?, ? ,?)`,
      [
        isbn,
        title,
        author,
        stock ? stock : 1,
        Date.parse(published),
        publisher,
        pages,
      ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      }
    );
  });
}

function update(body, id) {
  const { isbn, title, author, stock, published, publisher, pages } = body;
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE Books SET isbn=?, title=?, author=?, stock=?, published=?, publisher=?, pages=? WHERE id=?`,
      [
        isbn,
        title,
        author,
        stock ? stock : 1,
        Date.parse(published),
        publisher,
        pages,
        id,
      ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      }
    );
  });
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Books WHERE id=?`, id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
module.exports = {
  getBookbyID,
  getAllBooks,
  store,
  update,
  destroy,
};
