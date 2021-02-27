'use strict';
module.exports = function(sequelize, DataTypes) {
  var Object = sequelize.define('Object', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {}
    }
  });
  return Object;
};