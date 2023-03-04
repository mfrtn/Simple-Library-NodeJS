const db = require("./db");

const booksData = [
  {
    isbn: "9781593279509",
    title: "Eloquent JavaScript, Third Edition",
    author: "Marijn Haverbeke",
    stock: 3,
    published: "2018-12-04T00:00:00.000Z",
    publisher: "No Starch Press",
    pages: 472,
  },
  {
    isbn: "9781491943533",
    title: "Practical Modern JavaScript",
    author: "Nicolás Bevacqua",
    stock: 5,
    published: "2017-07-16T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 334,
  },
  {
    isbn: "9781593277574",
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    stock: 4,
    published: "2016-09-03T00:00:00.000Z",
    publisher: "No Starch Press",
    pages: 352,
  },
  {
    isbn: "9781449365035",
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    stock: 5,
    published: "2014-04-08T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 460,
  },
  {
    isbn: "9781449331818",
    title: "Learning JavaScript Design Patterns",
    author: "Addy Osmani",
    stock: 7,
    published: "2012-08-30T00:00:00.000Z",
    publisher: "O'Reilly Media",
    pages: 254,
  },
  {
    isbn: "9798602477429",
    title: "You Don't Know JS Yet",
    author: "Kyle Simpson",
    stock: 8,
    published: "2020-01-28T00:00:00.000Z",
    publisher: "Independently published",
    pages: 143,
  },
  {
    isbn: "9781484200766",
    title: "Pro Git",
    author: "Scott Chacon and Ben Straub",
    stock: 3,
    published: "2014-11-18T00:00:00.000Z",
    publisher: "Apress; 2nd edition",
    pages: 458,
  },
  {
    isbn: "9781484242216",
    title: "Rethinking Productivity in Software Engineering",
    author: "Caitlin Sadowski, Thomas Zimmermann",
    stock: 3,
    published: "2019-05-11T00:00:00.000Z",
    publisher: "Apress",
    pages: 310,
  },
];

const usersData = [
  {
    email: "amin@yahoo.com",
    name: "amin",
    password: "",
  },
  {
    email: "mohammad@yahoo.com",
    name: "mohammad",
    password: "",
  },
  {
    email: "mahtab@yahoo.com",
    name: "mahtab",
    password: "",
  },
  {
    email: "raha@yahoo.com",
    name: "raha",
    password: "",
  },
];

const rentingData = [
  {
    book_id: 1,
    user_id: 1,
    rent_date: "2023-01-11T12:32:00.000Z",
    rent_days: 5,
  },
  {
    book_id: 1,
    user_id: 2,
    rent_date: "2023-02-01T09:44:00.000Z",
    rent_days: 5,
  },
  {
    book_id: 2,
    user_id: 3,
    rent_date: "2023-02-10T14:24:00.000Z",
    rent_days: 5,
  },
];

booksData.forEach((book) => {
  db.run(
    `INSERT INTO Books(isbn, title, author, stock, published ,publisher, pages) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      book.isbn,
      book.title,
      book.author,
      book.stock,
      Date.parse(book.published),
      book.publisher,
      book.pages,
    ],
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

usersData.forEach((user) => {
  db.run(
    `INSERT INTO Users(email, name, password) VALUES (?, ?, ?)`,
    [user.email, user.name, user.password],
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

rentingData.forEach((rent) => {
  db.run(
    `INSERT INTO Renting(book_id, user_id, rent_date, rent_days) VALUES (?, ?, ?, ?)`,
    [rent.book_id, rent.user_id, Date.parse(rent.rent_date), rent.rent_days],
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
});
