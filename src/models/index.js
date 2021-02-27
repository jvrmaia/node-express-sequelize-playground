'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST
};
var db        = {};

let sequelize;
if (env !== 'test') {
    sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      dialect: 'mysql',
      pool: {
          max: 5,
          min: 0,
          idle: 10000
      }
    });
} else {
    sequelize = new Sequelize('user_manager_db', 'admin', 'admin', {
        dialect: 'sqlite',
        storage: './data/database.sqlite'
    });
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
