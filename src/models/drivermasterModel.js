const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const { getToday, getLocalTime } = require("../utils/utils.js");

const DrivermasterModel = sequelize.define(
  "drivermaster",
  {
    recno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tenantrecno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    descn: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    rating: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    // trdate: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   defaultValue: getToday(),
    // },
    // trtime: {
    //   type: DataTypes.STRING(6),
    //   allowNull: true,
    //   defaultValue: getLocalTime(),
    // },
  },
  {
    tableName: "drivermaster", // Specify the table name in your database
  }
);

module.exports = DrivermasterModel;
