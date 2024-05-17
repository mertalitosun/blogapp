const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Category = sequelize.define(
  "category",
  {
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// const sync = async () => {
//   await Category.sync({ force: true });
//   console.log("category tablosu eklendi");
// };
// sync();
module.exports = Category;
