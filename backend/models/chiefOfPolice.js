module.exports = (sequelize, DataTypes) => {
  const ChiefOfPolice = sequelize.define("chief_of_police", {
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return ChiefOfPolice;
};
