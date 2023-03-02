// NPM Modules
const { StatusCodes } = require("http-status-codes");

// MyApp Modules
const data = require("./../data");
const { contentTypes } = require("./../content-types");
const db = require("./../db");

exports.create = (req, res) => {
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
      id: data.Renting.length,
      book_id: book_id,
      user_id: user_id,
      rent_date: rent_date,
      rent_days: rent_days,
    };
    data.Renting.push(rent);
    res.writeHead(StatusCodes.OK, contentTypes.json);
    res.json(rent);
  }
};
