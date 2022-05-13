const { Sequelize } = require("sequelize");
require("dotenv").config();
var moment = require("moment"); // require
moment().format();
const Vonage = require("@vonage/server-sdk");
const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});
const Op = Sequelize.Op;
const db = require("../models");
const multer = require("multer");
const path = require("path");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
/* const { PDFNet } = require("@pdftron/pdfnet-node"); */
//Place your word file in source

// Weekly helpers
const weeklyHelpers = require("../helpers/getWeekly.js");

// MODEL
const Clearance = db.clearances;

// UPLOAD
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimType && extname) return cb(null, true);
    cb("Dive proper file format to upload");
  },
}).fields([
  { name: "cedula", maxCount: 1 },
  { name: "idPicture", maxCount: 1 },
  { name: "barangayClearance", maxCount: 1 },
  { name: "ort", maxCount: 1 },
]);

const getRegNo = (id, date) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const finalDay =
    day >= 9 ? new Date(date).getDate() : `0${new Date(date).getDate()}`;
  const finalMonth =
    month >= 9 ? new Date(date).getMonth() : `0${new Date(date).getMonth()}`;
  return `${finalMonth}-${finalDay}-${year}-${id}`;
};

const printClearance = async (req, res) => {
  // Load the docx file as binary content
  const content = fs.readFileSync(
    path.resolve(__dirname, "../files/clearance.docx"),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const dateTimeFormat = new Date(req.body.createdAt).toLocaleString(
    "default",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const birthDate = new Date(req.body.dateOfBirth).toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const issuedOn = new Date(req.body.issuedOn).toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const dateApplied = new Date(req.body.createdAt).toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const regNo = getRegNo(req.body.id, dateTimeFormat);

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render({
    ...req.body,
    regNo,
    dateApplied,
    issuedOn,
    birthDate,
  });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  const filename = `${req.body.fname}_${req.body.mname}_${req.body.lname}`;

  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, `../images/${filename}.docx`), buf);

  /* const inputPath = path.resolve(__dirname, "../files/output.docx");
  const outputPath = path.resolve(__dirname, "../files/myDoc.pdf");

  convertToPDF = async () => {
    const pdfdoc = await PDFNet.PDFDoc.create();
    await pdfdoc.initSecurityHandler();
    await PDFNet.Convert.toPdf(pdfdoc, inputPath);
    pdfdoc.save(outputPath, PDFNet.SFDoc.SaveOptions.e_linearized);
  };

  PDFNet.runWithCleanup(convertToPDF).then(() => {
    fs.readFile(outputPath, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(data);
      }
    });
  }); */
};

// CREATE CLEARANCE
const addClearance = async (req, res) => {
  const {
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
    purpose,
    phone,
    numberOfIssued,
    orNumber,
    ctcNumber,
    amount,
    pnco,
    cop,
    issuedAt,
    issuedOn,
    issued,
    verified,
  } = req.body;

  let param = {
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
    purpose,
    phone,
    orNumber,
    ctcNumber,
    amount,
    issuedAt,
    issuedOn,
    issued,
    numberOfIssued,
    verified,
    pnco,
    cop,
    cedula: req.files["cedula"][0].path,
    idPicture: req.files["idPicture"][0].path,
    barangayClearance: req.files["barangayClearance"][0].path,
    ort: req.files["ort"][0].path,
  };

  if (issuedOn != "") {
    const from = "Vonage APIs";
    const to = `639${phone}`;
    const text = `Good day ${fname}, Your application for Police Clearance will be issue on ${issuedOn}. Thank You!`;

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
  }

  const clearance = await Clearance.create(param);
  res.status(200).json({
    message: "success",
    currentClearance: clearance,
  });
};

// CREATE CLEARANCE
const renewClearance = async (req, res) => {
  const {
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
    purpose,
    phone,
    numberOfIssued,
    orNumber,
    ctcNumber,
    amount,
    pnco,
    cop,
    issuedAt,
    issuedOn,
    issued,
    verified,
    cedula,
    idPicture,
    barangayClearance,
    ort,
  } = req.body;

  let param = {
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
    purpose,
    phone,
    orNumber,
    ctcNumber,
    amount,
    issuedAt,
    issuedOn,
    issued,
    numberOfIssued,
    verified,
    pnco,
    cop,
    cedula,
    idPicture,
    barangayClearance,
    ort,
  };

  if (issuedOn != "") {
    const from = "Vonage APIs";
    const to = `639${phone}`;
    const text = `Good day ${fname}, Your application for renewal of Police Clearance will be issue on ${issuedOn}. Thank You!`;

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
  }

  const clearance = await Clearance.create(param);
  res.status(200).json({
    message: "success",
    currentClearance: clearance,
  });
};

// READ CLEARANCE
const getAllClearances = async (req, res) => {
  /* const { itemsPerPage, pageStart, page, search, category, dateStart, dateEnd } = req.body */

  let clearances = await Clearance.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

  let pendingClearances = await Clearance.findAndCountAll({
    where: {
      issued: false,
    },
    order: [["createdAt", "DESC"]],
  });

  let issuedClearances = await Clearance.findAndCountAll({
    where: {
      issued: true,
    },
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    allClearance: clearances,
    pendingClearances: pendingClearances,
    issuedClearances: issuedClearances,
  });
};

const getAllIssuedClearances = async (req, res) => {
  let clearances = await Clearance.findAndCountAll({
    where: {
      issued: true,
    },
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    allClearance: clearances,
  });
};

// UPDATE CLEARANCE
const updateClearance = async (req, res) => {
  const clearance = req.body;

  await Clearance.update(clearance, {
    where: {
      id: req.params.id,
    },
  });

  if (clearance.issuedOn != "") {
    const from = "Vonage APIs";
    const to = `639${clearance.phone}`;
    const text = `Good day ${clearance.fname}, Your application for Police Clearance will be issue on ${clearance.issuedOn}. Thank You!`;

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
  }

  res.sendStatus(200);
};

const approveClearance = async (req, res) => {
  await Clearance.update(
    {
      issued: true,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.sendStatus(200);
};

// DELETE CLEARANCE
const deleteClearance = async (req, res) => {
  const { id } = req.body;
  await Clearance.destroy({
    where: {
      id: id,
    },
  });

  res.sendStatus(200);
};

// Statistical Report
const clearanceIssuedStatisticalReport = async (req, res) => {
  // Daily
  const daily = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: new Date().setHours(0, 0, 0),
        [Op.lt]: new Date().setHours(23, 59, 59),
      },
    },
  });

  // Weekly
  const everySunday = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.firstday().firstdaystart,
        [Op.lt]: weeklyHelpers.firstday().firstdayend,
      },
    },
  });

  const everyMonday = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.secondday().seconddaystart,
        [Op.lt]: weeklyHelpers.secondday().seconddayend,
      },
    },
  });

  const everyTuesday = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.thirdday().thirddaystart,
        [Op.lt]: weeklyHelpers.thirdday().thirddayend,
      },
    },
  });

  const everyWednesday = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.fourthday().fourthdaystart,
        [Op.lt]: weeklyHelpers.fourthday().fourthdayend,
      },
    },
  });

  const everyThursday = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.fifthday().fifthdaystart,
        [Op.lt]: weeklyHelpers.fifthday().fifthdayend,
      },
    },
  });

  const everyFriday = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.sixthday().sixthdaystart,
        [Op.lt]: weeklyHelpers.sixthday().sixthdayend,
      },
    },
  });

  const everySaturday = await Clearance.count({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.seventhday().seventhdaystart,
        [Op.lt]: weeklyHelpers.seventhday().seventhdayend,
      },
    },
  });

  // Monthly
  const jan = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 1),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const feb = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 2),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const march = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 3),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const april = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 4),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const may = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 5),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const june = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 6),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const july = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 7),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const aug = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 8),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const sep = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 9),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const oct = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 10),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const nov = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 11),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });
  const dec = await Clearance.count({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 12),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
  });

  /* const quarterly = await Clearance.count(); */

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    daily,
    weekly: [
      { label: "Sunday", count: everySunday },
      { label: "Monday", count: everyMonday },
      { label: "Tuesday", count: everyTuesday },
      { label: "Wednesday", count: everyWednesday },
      { label: "Thursday", count: everyThursday },
      { label: "Friday", count: everyFriday },
      { label: "Saturday", count: everySaturday },
    ],
    monthly: [
      { label: "January", value: 1, count: jan },
      { label: "February", value: 2, count: feb },
      { label: "March", value: 3, count: march },
      { label: "April", value: 4, count: april },
      { label: "May", value: 5, count: may },
      { label: "June", value: 6, count: june },
      { label: "July", value: 7, count: july },
      { label: "August", value: 8, count: aug },
      { label: "September", value: 9, count: sep },
      { label: "October", value: 9, count: oct },
      { label: "November", value: 9, count: nov },
      { label: "December", value: 9, count: dec },
    ],
    quarterly: [
      {
        label: "1st Quarter",
        count: jan + feb + march,
      },
      {
        label: "2nd Quarter",
        count: april + may + june,
      },
      {
        label: "3rd Quarter",
        count: july + aug + sep,
      },
      {
        label: "4th Quarter",
        count: oct + nov + dec,
      },
    ],
  });
};

const clearanceIncomeStatisticalReport = async (req, res) => {
  // Daily
  const daily = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gte]: new Date().setHours(0, 0, 0),
        [Op.lte]: moment().toDate(),
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  // Weekly
  const everySunday = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.firstday().firstdaystart,
        [Op.lt]: weeklyHelpers.firstday().firstdayend,
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  const everyMonday = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.secondday().seconddaystart,
        [Op.lt]: weeklyHelpers.secondday().seconddayend,
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  const everyTuesday = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.thirdday().thirddaystart,
        [Op.lt]: weeklyHelpers.thirdday().thirddayend,
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  const everyWednesday = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.fourthday().fourthdaystart,
        [Op.lt]: weeklyHelpers.fourthday().fourthdayend,
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  const everyThursday = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.fifthday().fifthdaystart,
        [Op.lt]: weeklyHelpers.fifthday().fifthdayend,
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  const everyFriday = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.sixthday().sixthdaystart,
        [Op.lt]: weeklyHelpers.sixthday().sixthdayend,
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  const everySaturday = await Clearance.findAll({
    where: {
      issued: 1,
      createdAt: {
        [Op.gt]: weeklyHelpers.seventhday().seventhdaystart,
        [Op.lt]: weeklyHelpers.seventhday().seventhdayend,
      },
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  // Monthly
  const jan = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 1),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const feb = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 2),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const march = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 3),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const april = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 4),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const may = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 5),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const june = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 6),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const july = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 7),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const aug = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 8),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const sep = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 9),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const oct = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 10),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const nov = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 11),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });
  const dec = await Clearance.findAll({
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("createdAt")), 12),
        Sequelize.where(
          Sequelize.fn("YEAR", Sequelize.col("createdAt")),
          new Date().getFullYear()
        ),
      ],
    },
    attributes: [[Sequelize.fn("sum", Sequelize.col("amount")), "total"]],
    raw: true,
  });

  /* const quarterly = await Clearance.count(); */

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    daily: Number(daily[0].total),
    weekly: [
      { label: "Sunday", count: Number(everySunday[0].total) },
      { label: "Monday", count: Number(everyMonday[0].total) },
      { label: "Tuesday", count: Number(everyTuesday[0].total) },
      { label: "Wednesday", count: Number(everyWednesday[0].total) },
      { label: "Thursday", count: Number(everyThursday[0].total) },
      { label: "Friday", count: Number(everyFriday[0].total) },
      { label: "Saturday", count: Number(everySaturday[0].total) },
    ],
    monthly: [
      { label: "January", value: 1, count: Number(jan[0].total) },
      { label: "February", value: 2, count: Number(feb[0].total) },
      { label: "March", value: 3, count: Number(march[0].total) },
      { label: "April", value: 4, count: Number(april[0].total) },
      { label: "May", value: 5, count: Number(may[0].total) },
      { label: "June", value: 6, count: Number(june[0].total) },
      { label: "July", value: 7, count: Number(july[0].total) },
      { label: "August", value: 8, count: Number(aug[0].total) },
      { label: "September", value: 9, count: Number(sep[0].total) },
      { label: "October", value: 9, count: Number(oct[0].total) },
      { label: "November", value: 9, count: Number(nov[0].total) },
      { label: "December", value: 9, count: Number(dec[0].total) },
    ],
    quarterly: [
      {
        label: "1st Quarter",
        count:
          Number(jan[0].total) + Number(feb[0].total) + Number(march[0].total),
      },
      {
        label: "2nd Quarter",
        count:
          Number(april[0].total) + Number(may[0].total) + Number(june[0].total),
      },
      {
        label: "3rd Quarter",
        count:
          Number(july[0].total) + Number(aug[0].total) + Number(sep[0].total),
      },
      {
        label: "4th Quarter",
        count: Number(oct[0].total) + Number(nov[0].total) + Number([0].total),
      },
    ],
  });
};

module.exports = {
  printClearance,
  addClearance,
  renewClearance,
  getAllClearances,
  getAllIssuedClearances,
  updateClearance,
  approveClearance,
  deleteClearance,
  upload,
  clearanceIssuedStatisticalReport,
  clearanceIncomeStatisticalReport,
};
