const db = require("mysql2-promise")();

database = {
  host     : "",
  database : "",
  user     : "",
  password : "",
  port:      3306
}

db.configure (
 database 
);

module.exports = {
  database,
  db
}
