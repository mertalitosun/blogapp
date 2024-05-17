const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Blog = sequelize.define("blog", {
  blogid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  blogTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altbaslik: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  blogDesc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homePage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  confirm: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  categoryid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// const sync = async () => {
//   await Blog.sync({ force: true });
//   console.log("blog tablosu eklendi");
// };

// sync();
module.exports = Blog;
