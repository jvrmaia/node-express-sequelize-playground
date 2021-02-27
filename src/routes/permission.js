const db = require('../models');

let associateEntityToPermission = function (entity, scope, targetPermission, res) {
    entity.addPermission(targetPermission).then(function(){
        res.status(200).json({
            status:"ok",
            message:`Relation between '${entity.get((scope === 'users') ? 'username' : 'name')}' and '${targetPermission.kind}' created`
        })
    }).catch(db.Sequelize.ValidationError, function (err) {
        res.status(500).json({
            status: "error",
            message: "failed to create relation: " + err
        });
    });
};

let disassociateEntityToPermission = function (entity, scope, targetPermission, res) {
    entity.removePermission(targetPermission).then(function(){
        res.status(200).json({
            status:"ok",
            message:`Relation between '${entity.get((scope === 'users') ? 'username' : 'name')}' and '${targetPermission.kind}'  deleted`
        })
    }).catch(db.Sequelize.ValidationError, function (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete relation: " + err
        });
    });
};

let handleGroupOpPermission = function (group_name, permission, op, res) {
    db.Group.findOne({where: {name: group_name}}).then(function (group) {
        if (group) {
            if (op === 'delete') {
                return disassociateEntityToPermission(group, 'groups', permission, res);
            } else {
                return associateEntityToPermission(group, 'groups', permission, res);
            }
        } else {
            db.Group.create({name: group_name}).then(function (groupCreated) {
                if (op === 'add') {
                    return associateEntityToPermission(groupCreated, 'groups', permission, res);
                } else {
                    res.status(200).json({
                        status: "ok",
                        message: "All permissions deleted"
                    });
                }
            }).catch(db.Sequelize.ValidationError, function (err) {
                res.status(500).json({
                    status: "error",
                    message: "Failed to create group: " + err
                });
            });
        }
    }).catch(db.Sequelize.ValidationError, function (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to find group: " + err
        });
    });
};

let handleUserOpPermission = function (username, permission, op, res) {
    db.User.findOne({where: {username: username}}).then(function (user) {
        if (user) {
            if (op === 'delete') {
                return disassociateEntityToPermission(user, 'users', permission, res);
            } else {
                return associateEntityToPermission(user, 'users', permission, res);
            }
        } else {
            db.User.create({username: username}).then(function (userCreated) {
                if (op === 'add') {
                    return associateEntityToPermission(userCreated, 'users', permission, res);
                } else {
                    res.status(200).json({
                        status: "ok",
                        message: "all permissions deleted"
                    });
                }
            }).catch(db.Sequelize.ValidationError, function (err) {
                res.status(500).json({
                    status: "error",
                    message: "failed to create user: " + err
                });
            });
        }
    }).catch(db.Sequelize.ValidationError, function (err) {
        res.status(500).json({
            status: "error",
            message: "failed to find group: " + err
        });
    });
};

let handleEntityOpPermission = function (group_name, username, permission, op, res) {
    if (group_name) {
        return handleGroupOpPermission(group_name, permission, op, res);
    } else if (username) {
        return handleUserOpPermission(username, permission, op, res);
    } else {
        res.status(500).json({error: 'Missing ?user=value or ?group=value'})
    }
};

let addPermission = function (req, res) {
    let kind = req.params.kind;
    let group_name = req.query.group;
    let username = req.query.user;
    db.Permission.findOne({where: {kind: kind}}).then(function (permission) {
        if (permission) {
            handleEntityOpPermission(group_name, username, permission, 'add', res);
        } else {
            db.Permission.create({kind: kind}).then(function(createdPermission) {
                return handleEntityOpPermission(group_name, username, createdPermission, 'add', res);
            }).catch(db.Sequelize.ValidationError, function (err) {
                res.status(500).json({
                    status: "error",
                    message: "Failed to create permission: " + err
                });
            });
        }
    }).catch(db.Sequelize.ValidationError, function (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to find permission: " + err
        });
    });
};

let clearPermissions = function (req, res) {
    let kind = req.params.kind;
    let group_name = req.query.group;
    let username = req.query.user;
    db.Permission.findOne({where: {kind: kind}}).then(function (permission) {
        if (permission) {
            handleEntityOpPermission(group_name, username, permission, 'delete', res);
        } else {
            db.Permission.create({kind: kind}).then(function(createdPermission) {
                res.status(200).json({
                    status: "ok",
                    message: "All permissions of user/group deleted"
                });
            }).catch(db.Sequelize.ValidationError, function (err) {
                res.status(500).json({
                    status: "error",
                    message: "Failed to clear permissions: " + err
                });
            });
        }
    }).catch(db.Sequelize.ValidationError, function (err) {
        res.status(500).json({
            status: "error",
            message: "Failed to find permission: " + err
        });
    });
};

module.exports = {
    addPermission: addPermission,
    clearPermissions: clearPermissions
};