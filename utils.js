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
