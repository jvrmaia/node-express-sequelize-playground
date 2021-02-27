'use strict';
module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define('Permission', {
    kind: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {}
    }
  });
  return Permission;
};