'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserGroup = sequelize.define('UserGroup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          models.Group.belongsToMany(models.User, { as: 'Users', through: { model: models.UserGroup, unique: false }, foreignKey: 'group_id' });
          models.User.belongsToMany(models.Group, { as: 'Groups', through: { model: models.UserGroup, unique: false }, foreignKey: 'user_id' });
      }
    }
  });
  return UserGroup;
};