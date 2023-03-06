// NodeJS Modules
const fs = require("fs");

// NPM Modules
const { StatusCodes } = require("http-status-codes");
const parse = require("node-html-parser").parse;

exports.getFile = (path, res, objects, flag) => {
  fs.readFile(path, (err, html) => {
    if (err) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
      res.end(err);
    } else {
      if (objects) {
        if (flag === "books") {
          const document = parse(html);

          let output = `<tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Pages</th>
            <th>Stock</th>
            <th>Rented</th>
            <th>Remain</th>
          </tr>\n`;

          for (const value of objects) {
            const remain = value.stock - value.rentCount;
            if (remain <= 0) {
              continue;
            }
            output += `<tr>
              <td>${value.title}</td>
              <td>${value.author}</td>
              <td>${value.publisher}</td>
              <td>${value.pages}</td>
              <td>${value.stock}</td>
              <td>${value.rentCount}</td>
              <td>${remain}</td>
            </tr>\n`;
          }

          document.getElementById("table1").innerHTML = output;

          res.end(document.toString());
        } else if (flag === "users") {
          const document = parse(html);

          let output = `<tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Show Profile</th>
          </tr>\n`;

          for (const value of objects) {
            output += `<tr>
              <td>${value.id}</td>
              <td>${value.name}</td>
              <td>${value.email}</td>
              <td><a href='/profile?email=${value.email}'>Show</a></td>
            </tr>\n`;
          }

          document.getElementById("table1").innerHTML = output;

          res.end(document.toString());
        } else if (flag === "profile") {
          const document = parse(html);

          let output = `<tr>
          <th>Book ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Rent Date</th>
          <th>Days</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>\n`;
          const today = new Date();
          today.setDate(today.getDate() + 1);
          today.setHours(0, 0, 0, 0);

          for (const value of objects.data) {
            const rentDate = new Date(value.rent_date);
            const returnDate = new Date(rentDate);

            returnDate.setDate(rentDate.getDate() + parseInt(value.rent_days));
            rentDate.setHours(0, 0, 0, 0);
            output += `<tr>
            <td>${value.book_id}</td>
            <td>${value.title}</td>
            <td>${value.author}</td>
            <td>${rentDate.toDateString()}</td>
            <td>${value.rent_days}</td>
            <td>${returnDate.toDateString()}</td>
            <td>${today > returnDate ? "Return" : "Keep"}</td>
          </tr>\n`;
          }

          document.getElementById("table1").innerHTML = output;
          document.getElementById("email").innerHTML = objects.email;

          res.end(document.toString());
        }
      } else {
        res.end(html);
      }
    }
  });
};

exports.parseFileBooksHTML = (path, res, objects) => {
  fs.readFile(path, (err, html) => {
    if (err) {
      res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
      res.end(err);
    }
  });
};

exports.parseJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = [];
    req
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
  });
};

exports.jsonSerialize = (data, res) => {
  res.end(JSON.stringify(data));
};

exports.parseQueryFromUrl = (query) => {
  const queryObj = query.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    return { ...acc, [key]: value };
  }, {});
  return queryObj;
};

exports.errResponse = (res, errorMessage) => {
  const result = {
    error: true,
    message: errorMessage,
  };

  return res.json(result);
};
