const Book = require("../models/book.model");
const User = require("../models/user.model");
exports.newBook = async (req, res) => {
  const { desc, tanggal, nama, tagihan, dokter } = req.body;

  const isBook = await Book.findOne({ id: req.id });

  if (!isBook) {
    const book = new Book({
      id: req.id,
      books: [
        {
          deskripsi: desc,
          detail: [
            {
              nama: nama,
              dokter: dokter,
              tanggal: tanggal,
              tagihan: tagihan,
            },
          ],
        },
      ],
    });
    book.save();
    return res.status(200).json({
      status: true,
      message: "Buku berhasil ditambahkan",
    });
  } else {
    const duplicate = isBook.books.find((book) => {
      return book.deskripsi == desc;
    });

    if (duplicate) {
      return res.status(401).json({
        status: false,
        message: "Nama buku telah dipakai, gunakan nama yang lain",
      });
    } else {
      const newBook = {
        deskripsi: desc,
        detail: [
          {
            nama: nama,
            dokter: dokter,
            tanggal: tanggal,
            tagihan: tagihan,
          },
        ],
      };
      isBook.books.push(newBook);
      isBook.save();
      return res.status(200).json({
        status: true,
        message: "Buku berhasil ditambahkan",
      });
    }
  }
};

exports.listBook = async (req, res) => {
  const isBook = await Book.findOne({ id: req.id });
  const user = await User.findOne({ _id: req.id });

  if (!isBook) {
    const book = new Book({
      id: req.id,
      books: [],
    });
    book.save();
    const nowBook = await Book.findOne({ id: req.id });
    return res.status(200).json({
      status: false,
      data: nowBook,
    });
  } else {
    return res.status(200).json({
      status: true,
      data: isBook,
      user: user,
    });
  }
};
exports.deleteBook = async (req, res) => {
  const bookId = req.body._id;
  const userBook = await Book.findOne({ id: req.id });
  try {
    userBook.books.pull({ _id: bookId });
    userBook.save();
    res.status(200).json({
      status: true,
      message: "Data berhasil di hapus",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Data tidak berhasil di hapus",
    });
  }
};

exports.editBook = async (req, res) => {
  const { _id, newName } = req.body;
  const isBook = await Book.findOne({ id: req.id });

  const duplicate = isBook.books.find((book) => {
    return book.deskripsi == newName;
  });

  if (duplicate) {
    return res.status(401).json({
      status: false,
      message: "Nama buku telah dipakai, gunakan nama yang lain",
    });
  } else {
    await Book.updateOne(
      { id: req.id, "books._id": _id },
      {
        $set: {
          "books.$.deskripsi": newName,
        },
      }
    );
    res.status(200).json({
      status: true,
      message: "Nama buku berhasil diubah",
    });
  }
};
