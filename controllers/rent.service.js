const db = require("./../db");

function store(body) {
  const { book_id, user_id, rent_date, rent_days } = body;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Renting(book_id, user_id, rent_date, rent_days) VALUES (?, ?, ?, ?)`,
      [
        book_id,
        user_id,
        rent_date ? Date.parse(rent_date) : new Date(),
        rent_days,
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

function countUserRentbyID(user_id) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT COUNT(user_id) as user_id_count FROM Renting WHERE user_id = ?",
      user_id,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.user_id_count);
        }
      }
    );
  });
}

function countBookRentbyID(book_id) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT COUNT(book_id) as book_id_count FROM Renting WHERE book_id = ?",
      book_id,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.book_id_count);
        }
      }
    );
  });
}

function destroy(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Renting WHERE id=?`, id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
module.exports = {
  store,
  countUserRentbyID,
  countBookRentbyID,
  destroy,
};
