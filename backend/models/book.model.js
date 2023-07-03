const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  books: [
    {
      deskripsi: {
        type: String,
        required: true,
      },
      detail: [
        {
          nama: {
            type: String,
            required: true,
          },
          dokter: {
            type: String,
            required: true,
          },
          tanggal: {
            type: String,
            required: true,
          },
          tagihan: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);
