const db = require('../models');

let associateUserToGroup = function(user, targetGroup, res) {
    db.Group.findOne({where:{name: targetGroup}}).then(function(group){
        if (group) {
            return user.addGroup(group, { through: { id: user.id }}).then(function(result){
                res.status(200).json({
                    status: "ok",
                    message: `User '${user.username}' added to group '${group.name}'`
                });
            }).catch(db.Sequelize.ValidationError, function (err) {
                res.status(500).json({
                    status: "error",
                    error: "Failed to add user to group: " + err
                });
            });
        } else {
            return db.Group.create({name: targetGroup}).then(function(createdGroup){
                user.addGroup(createdGroup, { through: { id: user.id }}).then(function(result){
                    res.status(200).json({
                        status: "ok",
                        message:  `User '${user.username}' added to group '${createdGroup.name}'`
                    });
                }).catch(db.Sequelize.ValidationError, function (err) {
                    res.status(500).json({
                        status: "error",
                        message: "Failed to add user to group: " + err
                    });
                });
            })
        }
    })
};

let addUserToGroup = function (req, res) {
    db.User.findOne({where:{username:req.params.username}}).then(function(user) {
        if (user) {
            return associateUserToGroup(user, req.params.group, res);
        } else {
            db.User.create({username:req.params.username}).then(function(createdUser){
                return associateUserToGroup(createdUser, req.params.group, res);
            }).catch(db.Sequelize.ValidationError, function (err) {
                res.status(500).json({
                    status: "error",
                    message: "Failed to create user: " + err
                });
            });
        }
    }).catch(db.Sequelize.ValidationError, function (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to find user: " + err
        });
    });;
};

let hasPermissionToObject = function (req, res) {
    res.status(200).json({});
};

let getAllPermissionsToObject = function (req, res) {
    res.status(200).json({});
};

module.exports = {
    addUserToGroup: addUserToGroup,
    hasPermissionToObject: hasPermissionToObject,
    getAllPermissionsToObject: getAllPermissionsToObject
};