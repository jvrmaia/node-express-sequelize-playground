let health = require('./health');
let user = require('./user');
let permission = require('./permission');
let group = require('./group');

let index = function (req, res) {
    res.send("ok");
};

module.exports = {
    index: index,
    health: health,
    user: user,
    permission: permission,
    group: group
};