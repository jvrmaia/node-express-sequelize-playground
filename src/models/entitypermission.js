'use strict';
module.exports = function(sequelize, DataTypes) {
    var EntityPermission = sequelize.define('EntityPermission', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        entity_id: DataTypes.INTEGER,
        entity_type: DataTypes.STRING,
        permission_id: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                models.User.belongsToMany(models.Permission, { through: { model: models.EntityPermission, unique: false, scope: { entity_type: 'users' } }, constraints: false, foreignKey: 'entity_id' });
                models.Permission.belongsToMany(models.User, { through: { model: models.EntityPermission, unique: false, scope: { entity_type: 'users' } }, constraints: false, foreignKey: 'permission_id' });
                models.Group.belongsToMany(models.Permission, { through: { model: models.EntityPermission, unique: false, scope: { entity_type: 'groups' } }, constraints: false, foreignKey: 'entity_id' });
                models.Permission.belongsToMany(models.Group, { through: { model: models.EntityPermission, unique: false, scope: { entity_type: 'users' } }, constraints: false, foreignKey: 'permission_id' });
            }
        }
    });
    return EntityPermission;
};