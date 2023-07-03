const express = require("express");
const router = express.Router();
const { DaftarUser, LoginUser, getUser, forgotPassword, resetPassword } = require("../controller/user.controller");
const { runValidation, validationDaftar, validationLogin } = require("../validation");
const { newBook, listBook, deleteBook, editBook } = require("../book/bookcontrol");
const { listTagihan, tambahTagihan, hapusTagihan, ubahTagihan, updateTagihan } = require("../book/tagihancontrol");
const middleware = require("../middleware/middleware");
const { getActive } = require("../book/bookactive");

// USER AUTH
router.post("/daftar", validationDaftar, runValidation, DaftarUser);
router.post("/login", validationLogin, runValidation, LoginUser);
router.get("/user", middleware, getUser);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);

// BOOK SETTING
router.post("/newbook", middleware, newBook);
router.get("/listbook", middleware, listBook);
router.post("/deletebook", middleware, deleteBook);
router.post("/editbook", middleware, editBook);
router.get("/dashboard", middleware, getActive);

// TAGIHAN SETTING
router.get("/tagihan/:bookid", middleware, listTagihan);
router.post("/tambah", middleware, tambahTagihan);
router.post("/hapus", middleware, hapusTagihan);
router.get("/ubah/:bookid", middleware, ubahTagihan);
router.post("/update", middleware, updateTagihan);

module.exports = router;
