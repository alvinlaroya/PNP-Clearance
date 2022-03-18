module.exports = (sequelize, DataTypes) => {
    const Clearance = sequelize.define("clearances", {
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        placeOfBirth: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        civilStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        citizenship: {
            type: DataTypes.STRING,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        purpose: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        numberOfIssued: {
            type: DataTypes.INTEGER,
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        orNumber: {
            type: DataTypes.STRING
        },
        ctcNumber: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.INTEGER
        },
        issuedAt: {
            type: DataTypes.INTEGER
        },
        issuedOn: {
            type: DataTypes.INTEGER
        },
        cedula: {
            type: DataTypes.STRING
        },
        idPicture: {
            type: DataTypes.STRING
        },
        barangayClearance: {
            type: DataTypes.STRING
        },
        ort: {
            type: DataTypes.STRING
        },
    })

    return Clearance
}