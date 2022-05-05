require("dotenv").config();

const { Sequelize, json } = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/user");
const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

// MODEL
const User = db.users;

// CREATE CASE
const registerUser = async (req, res) => {
  const {
    fname,
    mname,
    lname,
    email,
    password,
    address,
    birthDate,
    position,
    phone,
  } = req.body;

  let param = {
    fname,
    mname,
    lname,
    email,
    password: password,
    address: `${address}, Sison, Pangasinan`,
    birthDate,
    position,
    verified: false,
    status: 0,
    phone,
    hasUpdate: 0,
  };

  const user = await User.create(param);
  res.status(200).send(user);
};

const authenticateUserWithemail = async (req, res) => {
  const { email, password } = req.body;
  /* res.json({
      email, password
  }) */
  try {
    User.findOne({
      where: {
        email: email, // user email
      },
    }).then(async (response) => {
      if (!response) return res.sendStatus(404);
      if (
        !response.dataValues.password ||
        !(await response.validPassword(password, response.dataValues.password))
      ) {
        res.sendStatus(404);
      } else {
        if (!response.dataValues.verified)
          return res.status(200).send("Not verified user");
        const token = jwt.sign(response.dataValues, process.env.SECRET_JWT_KEY);
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          token: token,
          id: response.dataValues.id,
        });
      }
    });
  } catch (error) {
    res.sendStatus(404).json({
      error: {
        message: "user match failed",
      },
    });
  }
};

const getAuthenticatedUser = async (req, res) => {
  await User.findOne({
    where: {
      id: req.body.id, // user email
    },
    attributes: [
      "fname",
      "mname",
      "lname",
      "email",
      "address",
      "birthDate",
      "position",
      "status",
      "hasUpdate",
    ],
  }).then(async (response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
      user: response.dataValues,
    });
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    data: users,
  });
};

// UPDATE USER
const updatePersonnel = async (req, res) => {
  const user = req.body;

  let resultUser = await User.findOne({ where: { id: req.params.id } });
  if (resultUser) {
    resultUser.update({
      verified: user.verified,
      status: user.status.value,
      hasUpdate: user.hasUpdate,
    });
  }

  res.sendStatus(200);
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  let resultUser = await User.findOne({ where: { phone: req.body.phone } });

  let r = (Math.random() + 1).toString(36).substring(7);
  let newPassword = `password${r}`;

  if (resultUser) {
    resultUser.update({
      password: newPassword,
    });

    const from = "Vonage APIs";
    const to = `639${resultUser.phone}`;
    const text = `Your new password is ${newPassword}!`;

    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.log("Message sent successfully.");
        } else {
          console.log(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
        }
      }
    });

    /* console.log(`new password ${newPassword}`); */
  }

  res.sendStatus(200);
};

module.exports = {
  authenticateUserWithemail,
  registerUser,
  forgotPassword,
  getAuthenticatedUser,
  getAllUsers,
  updatePersonnel,
};
