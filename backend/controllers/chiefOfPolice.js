const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");

// MODEL
const ChiefOfPolice = db.chiefOfPolice;

// CREATE CASE
const addPolice = async (req, res) => {
  const { position, fname, mname, lname } = req.body;

  let param = {
    fname,
    mname,
    lname,
    position,
    fullname: `${fname} ${lname}`,
  };

  const response = await ChiefOfPolice.create(param);
  res.status(200).send(response);
};

const getAllPolice = async (req, res) => {
  let polices = await ChiefOfPolice.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    data: polices,
  });
};

// UPDATE CASE
const updatePolice = async (req, res) => {
  const police = req.body;

  await ChiefOfPolice.update(police, {
    where: {
      id: req.params.id,
    },
  });

  res.sendStatus(200);
};

module.exports = {
  addPolice,
  getAllPolice,
  updatePolice,
};
