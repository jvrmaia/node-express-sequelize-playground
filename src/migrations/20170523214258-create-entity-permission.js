'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('EntityPermissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            entity_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            entity_type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            permission_id: {
                allowNull: false,
                references: {
                    model: 'Permissions',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('EntityPermissions');
    }
};