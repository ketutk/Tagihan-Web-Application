require("dotenv").config();
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { kirimEmail } = require("../helpers/index");

exports.DaftarUser = async (req, res) => {
  const { username, email, password } = req.body;

  const emailUser = await User.findOne({ email: email });
  const usernameUser = await User.findOne({ username: username });
  const passwordUser = await User.findOne({ password: password });
  if (usernameUser) {
    return res.status(404).json({
      status: false,
      message: "username sudah tersedia",
    });
  }
  if (emailUser) {
    return res.status(404).json({
      status: false,
      message: "email sudah tersedia",
    });
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const user = new User({
    username: username,
    email: email,
    password: hashPassword,
  });
  user.save();
  return res.status(201).json({
    status: true,
    message: "User berhasil di daftarkan",
  });
};
exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;
  const dataUser = await User.findOne({ $or: [{ username: username }, { email: username }] });
  if (dataUser) {
    // jika username ada
    const passwordUser = await bcryptjs.compare(password, dataUser.password);

    if (passwordUser) {
      // jika password nya ada
      const data = {
        id: dataUser._id,
      };
      const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);
      return res.status(201).json({
        message: "berhasil",
        token: token,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Password yang dimasukkan salah",
      });
    }
  } else {
    return res.status(404).json({
      status: false,
      message: "Username atau Email yang dimasukkan salah",
    });
  }
};
exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  return res.status(200).json({
    message: "berhasil",
    data: user,
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "Email tidak tersedia",
    });
  }

  const token = jsonwebtoken.sign(
    {
      idUser: user._id,
    },
    process.env.JWT_SECRET
  );

  await user.updateOne({ resetPasswordLink: token });

  const templateEmail = {
    from: "Krisna Corp",
    to: email,
    subject: "Link Reset Password",
    html: `<p>Silahkan klik link dibawah untuk reset password anda</p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`,
  };
  const success = kirimEmail(templateEmail);
  if (success) {
    return res.status(200).json({
      status: true,
      message: "Link reset password berhasil terkirim",
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Terjadi Kesalahan. Mohon coba lagi dalam sesaat",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({ resetPasswordLink: token });
  if (user) {
    const hashPassword = await bcryptjs.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    return res.status(201).json({
      status: true,
      message: "Password berhasil diganti",
    });
  } else {
    return res.status(404).json({
      status: false,
      message: "Token err 404",
    });
  }
};
