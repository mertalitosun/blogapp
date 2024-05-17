const mysql = require("mysql2");
const config = require("../config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  dialect: "mysql",
  host: config.db.host
});
const connect = async () =>{
  try{
    await sequelize.authenticate();
    console.log("mysql server bağlantısı yapıldı");
  }catch(err){
    console.log("bağlantı hatası:", err)
  }
}
connect();
module.exports = sequelize

