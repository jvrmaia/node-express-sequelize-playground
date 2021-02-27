const db = require('../models');

let clearUsers = function (req, res) {
    db.Group.findOne({where:{name:req.params.group}}).then(function(group){
        if (group) {
            db.UserGroup.destroy({where:{group_id: group.id}}).then(function(){
                return res.status(200).json({
                    status:"users group cleared"
                })
            }).catch(db.Sequelize.ValidationError, function (err) {
                return res.status(500).json({
                    error: err
                });
            });
        } else {
            db.Group.create({name:req.params.group}).then(function(){
                return res.status(200).json({
                    status:"users group cleared"
                })
            }).catch(db.Sequelize.ValidationError, function (err) {
                return res.status(500).json({
                    error: err
                });
            });
        }
    })
};

module.exports = {
    clearUsers: clearUsers
};