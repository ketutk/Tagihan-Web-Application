const Book = require("../models/book.model");
const User = require("../models/user.model");
const { updateAct } = require("./bookactive");

exports.listTagihan = async (req, res) => {
  const { bookid } = req.params;
  const Books = await Book.findOne({ id: req.id });
  const user = await User.findOne({ _id: req.id });

  const book = Books.books.find((e) => e._id == bookid);

  try {
    if (book) {
      return res.status(200).json({
        status: true,
        data: book,
        message: "",
        user: user,
      });
    } else {
      return res.status(200).json({
        status: true,
        data: {
          deskripsi: "",
          detail: [
            {
              nama: "",
              dokter: "",
              tanggal: "",
              tagihan: 0,
            },
          ],
        },
        message: "Data gagal didapatkan",
        user,
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: false,
      message: "Illegal Login",
    });
  }
};

exports.tambahTagihan = async (req, res) => {
  const { bookid, nama, dokter, tanggal, tagihan } = req.body;
  const Books = await Book.findOne({ id: req.id });

  const book = Books.books.find((e) => e._id == bookid);

  if (book) {
    const newDetail = {
      nama: nama,
      dokter: dokter,
      tanggal: tanggal,
      tagihan: tagihan,
    };
    try {
      book.detail.push(newDetail);
      await Book.updateOne(
        { id: req.id, "books._id": bookid },
        {
          $set: {
            "books.$.detail": book.detail,
          },
        }
      );
      updateAct(req.id, bookid, book.deskripsi, "Add");
      return res.status(200).json({
        status: true,
        message: "Data tagihan berhasil ditambahkan",
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "Buku tagihan tidak ditemukan, gagal menambahkan tagihan.",
    });
  }
};

exports.hapusTagihan = async (req, res) => {
  const { bookid, idTagihan } = req.body;
  const Books = await Book.findOne({ id: req.id });
  try {
    const book = Books.books.find((e) => e._id == bookid);
    const newDetail = book.detail.filter((e) => e._id != idTagihan);
    await Book.updateOne(
      { id: req.id, "books._id": bookid },
      {
        $set: {
          "books.$.detail": newDetail,
        },
      }
    );
    updateAct(req.id, bookid, book.deskripsi, "Delete");
    res.status(200).json({
      status: true,
      message: "Data tagihan berhasil dihapus",
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: "Mohon maaf data tagihan tidak berhasil dihapus",
    });
  }
};

exports.ubahTagihan = async (req, res) => {
  const bookid = req.params.bookid;
  const idTagihan = req.query.idTagihan;

  const Books = await Book.findOne({ id: req.id });

  try {
    const books = Books.books.find((e) => e._id == bookid);
    if (books) {
      const tagihan = books.detail.find((e) => e._id == idTagihan);
      if (tagihan) {
        return res.status(200).json({
          status: true,
          message: "",
          data: tagihan,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data gagal didapatkan",
          data: {
            nama: "",
            dokter: "",
            tanggal: "",
            tagihan: "",
          },
        });
      }
    } else {
      return res.status(200).json({
        status: true,
        message: "Data gagal didapatkan",
        data: {
          nama: "",
          dokter: "",
          tanggal: "",
          tagihan: "",
        },
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Maaf terjadi kesalahan ERR:400",
    });
  }
};

exports.updateTagihan = async (req, res) => {
  const { bookid, idTagihan, nama, dokter, tanggal, tagihan } = req.body;
  const Books = await Book.findOne({ id: req.id });

  if (Books) {
    const book = Books.books.find((e) => e._id == bookid);
    if (book) {
      const data = book.detail.find((e) => e._id == idTagihan);
      if (data) {
        try {
          const newData = {
            nama,
            dokter,
            tanggal,
            tagihan,
          };
          await Book.updateOne(
            { "books.detail._id": idTagihan },
            {
              $set: {
                "books.$[].detail.$[inner].nama": nama,
                "books.$[].detail.$[inner].dokter": dokter,
                "books.$[].detail.$[inner].tanggal": tanggal,
                "books.$[].detail.$[inner].tagihan": tagihan,
              },
            },
            {
              arrayFilters: [{ "inner._id": idTagihan }],
            }
          );
          updateAct(req.id, bookid, book.deskripsi, "Update");

          res.status(200).json({
            status: true,
            message: "Data berhasil diubah",
          });
        } catch (err) {
          res.status(200).json({
            status: false,
            message: "Data gagal diubah. Terjadi kesalahan",
          });
        }
      }
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Terjadi Kesalahan ERR404",
    });
  }

  // const newData = {
  //   nama,
  //   dokter,
  //   tanggal,
  //   tagihan,
  // };
};
