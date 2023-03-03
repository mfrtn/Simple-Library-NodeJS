// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const utils = require("./../utils");
const { contentTypes } = require("./../content-types");
const db = require("./../db");

//TODO Check User Renting Count

exports.create = (req, res) => {
  const body = req.body;
  if (!Object.keys(body).length) {
    errorMessage = "for creating a new renting please send data!";
    return utils.errResponse(res, errorMessage);
  } else {
    const { book_id, user_id, rent_date, rent_days } = body;

    // db.get(
    //   "SELECT id, email, name FROM Users WHERE id = ?",
    //   id,
    //   (err, data) => {
    //     if (err) {
    //       throw new Error(err.message);
    //     } else {
    //       if (!data) {
    //         return utils.errResponse(res, `User not found with id: ${id}`);
    //       }
    //       return res.json(data);
    //     }
    //   }
    // );
    db.get(
      "SELECT COUNT(user_id) as user_id_count FROM Renting  WHERE user_id = ?",
      user_id,
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data.user_id_count);
        }
      }
    );
    db.run(
      `INSERT INTO Renting(book_id, user_id, rent_date, rent_days) VALUES (?, ?, ?, ?)`,
      [book_id, user_id, rent_date, rent_days],
      (error) => {
        if (error) {
          return utils.errResponse(res, error.message);
        }
      }
    );

    res.writeHead(StatusCodes.OK, contentTypes.json);
    res.end("ok");
  }
};

// exports.create = (req, res) => {
//   const body = req.body;
//   const result = {};

//   if (!body) {
//     res.writeHead(StatusCodes.OK, contentTypes.json);
//     result.error = true;
//     result.message = "for creating a new renting please send data!";
//     res.json(result);
//   } else {
//     const { book_id, user_id, rent_date, rent_days } = body;
//     const rent = {
//       id: data.Renting.length,
//       book_id: book_id,
//       user_id: user_id,
//       rent_date: rent_date,
//       rent_days: rent_days,
//     };
//     data.Renting.push(rent);
//     res.writeHead(StatusCodes.OK, contentTypes.json);
//     res.json(rent);
//   }
// };
