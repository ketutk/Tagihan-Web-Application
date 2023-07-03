const Active = require("../models/active.model");
const User = require("../models/user.model");
const Book = require("../models/book.model");
const mongoose = require("mongoose");
require("dotenv").config();

exports.getActive = async (req, res) => {
  const active = await Active.findOne({ id: req.id });
  const user = await User.findOne({ _id: req.id });

  if (active) {
    res.status(200).json({
      status: true,
      data: active,
      user: user,
    });
  } else {
    res.status(200).json({
      status: false,
      data: {
        id: "NaN",
        books: [],
      },
      user: user,
      message: "Data tidak ditemukan",
    });
  }
};

exports.updateAct = async (id, bookid, desc, activity) => {
  const active = await Active.findOne({ id: id });
  let d = new Date();
  if (!active) {
    await Active.create({
      id: id,
      books: [
        {
          bookid: bookid,
          desc: desc,
          activity: activity,
          date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
          time: `${d.getHours()}:${d.getMinutes()}`,
        },
      ],
    });
  } else {
    const actBooks = active.books;
    const books = active.books;

    const exist = actBooks.find((e) => e.bookid == bookid && e.activity == activity);
    if (books.length !== 4 && !exist) {
      const newActBook = {
        bookid: bookid,
        desc: desc,
        activity: activity,
        date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
        time: `${d.getHours()}:${d.getMinutes()}`,
      };
      actBooks.unshift(newActBook);
      await Active.updateOne(
        { id: id },
        {
          $set: {
            books: actBooks,
          },
        }
      );
    } else if (!exist) {
      actBooks.pop();
      const newActBook = {
        bookid: bookid,
        desc: desc,
        activity: activity,
        date: `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
        time: `${d.getHours()}:${d.getMinutes()}`,
      };
      actBooks.unshift(newActBook);
      await Active.updateOne(
        { id: id },
        {
          $set: {
            books: actBooks,
          },
        }
      );
    }
  }
};

// const AddActive=()=>{

// }
