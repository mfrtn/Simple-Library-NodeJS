const db = require("./../db");

function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, email, name FROM Users WHERE email = ?",
      email,
      (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      }
    );
  });
}

function getUserbyID(id) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, email, name FROM Users WHERE id = ?",
      id,
      (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      }
    );
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all("SELECT email, name FROM Users ", (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
}

function store(body) {
  const { email, name, password } = body;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Users(email, name, password) VALUES (?, ?, ?)`,
      [email, name, password],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ email, name });
        }
      }
    );
  });
}

function getAllBookRentByUserEmail(email) {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT book_id , Books.title, Books.isbn, Books.author, Books.pages, rent_date, rent_days FROM Renting INNER JOIN Users ON Renting.user_id = Users.id INNER JOIN Books ON Renting.book_id = Books.id WHERE email = ?",
      email,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({ data: data, email });
        }
      }
    );
  });
}

module.exports = {
  getUserByEmail,
  getUserbyID,
  getAllUsers,
  store,
  getAllBookRentByUserEmail,
};
