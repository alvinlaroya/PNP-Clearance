const { Sequelize } = require('sequelize')
const Op = Sequelize.Op;
const db = require('../models')

// MODEL
const Case = db.cases


// CREATE CASE
const addCase = async (req, res) => {
    const { serialNo, fname, mname, lname } = req.body;

    let param = {
        fname,
        mname,
        lname,
        serialNo,
    }

    const clearance = await Case.create(param)
    res.status(200).send(clearance)
}

// READ CASES

const getAllCases = async (req, res) => {
    let cases = await Case.findAndCountAll({
        order: [
            ['createdAt', 'DESC'],
        ],
    })

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        message: "success",
        data: cases,
    });
}

// DELETE CASE
const deleteCase = async (req, res) => {
    await Case.destroy({
        where: {
            id: req.params.id
        }
    });

    res.send("Delete succesfully")
}


const searchCase = async (req, res) => {
    const { search } = req.body
    let relatedCase = await Case.findAndCountAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        {
                            fname: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            mname: {
                                [Op.like]: `%${search}%`
                            }
                        },
                        {
                            lname: {
                                [Op.like]: `%${search}%`
                            }
                        },
                    ]
                }
            ]
        },
        order: [
            ['createdAt', 'DESC'],
        ],
    })

    res.header("Access-Control-Allow-Origin", "*");
    res.json({
      message: "success",
      data: relatedCase
    });
}


// UPDATE CASE
const updateCase = async (req, res) => {
    const clearance = req.body;
  
    await Case.update(clearance, {
      where: {
        id: req.params.id,
      },
    });
  
    res.sendStatus(200);
  };

module.exports = {
    addCase,
    getAllCases,
    deleteCase,
    searchCase,
    updateCase
}
