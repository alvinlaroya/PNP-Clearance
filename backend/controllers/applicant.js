const { Sequelize } = require("sequelize");
require("dotenv").config();
var moment = require("moment"); // require
moment().format();
const Op = Sequelize.Op;
const db = require("../models");
// MODEL
const Applicant = db.applicants;

// CREATE CLEARANCE
const addApplicant = async (req, res) => {
  /*   const {
    fname,
    mname,
    lname,
    address,
    dateOfBirth,
    placeOfBirth,
    age,
    civilStatus,
    citizenship,
    height,
    weight,
    phone,
  } = req.body;
 */
  const applicant = await Applicant.create(req.body);
  res.status(200).json({
    message: "success",
    applicant: applicant,
  });
};

// READ APPLICANT

const getAllApplicant = async (req, res) => {
  let applicants = await Applicant.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    applicants: applicants,
  });
};

// UPDATE APPLICANT
const updateApplicant = async (req, res) => {
  const applicant = req.body;

  await Applicant.update(applicant, {
    where: {
      id: req.params.id,
    },
  });

  res.sendStatus(200);
};

module.exports = {
  addApplicant,
  getAllApplicant,
  updateApplicant,
};
