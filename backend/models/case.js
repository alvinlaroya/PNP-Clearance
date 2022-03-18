module.exports = (sequelize, DataTypes) => {
    const Case = sequelize.define("cases", {
        serialNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
    })

    return Case
}