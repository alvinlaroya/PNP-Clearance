require("dotenv").config();

const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");
const jwt = require("jsonwebtoken");

// MODEL
const User = db.users;

// CREATE CASE
const registerUser = async (req, res) => {
  const { fname, mname, lname, email, password, address, birthDate, position } =
    req.body;

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
        if(!response.dataValues.verified) return res.status(200).send("Not verified user")
        const token = jwt.sign(response.dataValues, process.env.SECRET_JWT_KEY);
        res.header("Access-Control-Allow-Origin", "*");
        res.json({
          token: token,
          id: response.dataValues.id
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
    attributes: ["fname", "mname", "lname", "email", "address", "birthDate", "position", "status", "hasUpdate"]
  }).then(async(response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        user: response.dataValues
    });
  })
};


const getAllUsers = async (req, res) => {
  let users = await User.findAndCountAll({
      order: [
          ['createdAt', 'DESC'],
      ],
  })

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
      message: "success",
      data: users,
  });
}

// UPDATE CASE
const updatePersonnel = async (req, res) => {
  const user = req.body;

  let resultUser = await User.findOne({ where: { id: req.params.id } });
  if (resultUser) {
    resultUser.update({
      verified: user.verified,
      status: user.status.value,
    })
  }

  res.sendStatus(200);
};

module.exports = {
  authenticateUserWithemail,
  registerUser,
  getAuthenticatedUser,
  getAllUsers,
  updatePersonnel
};
