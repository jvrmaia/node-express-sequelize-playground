const db = require('../models');

/**
 * @api {get} /health Request about application status
 * @apiName health
 * @apiGroup Health
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "OK",
 *       "message": "Healthy",
 *       "dependencies": []
 *     }
 */
let health = function (req, res) {
    db.sequelize.authenticate()
    .then(() => {
        res.status(200).json({
            status: 'OK',
            message: 'Healthy',
            dependecies: [
                {
                    name: "Database",
                    status: "OK"
                }
            ]
        });
    })
    .catch(err => {
        res.status(500).json({
            status: 'FAIL',
            message: 'Unhealthy',
            dependecies: [
                {
                    name: "Database",
                    status: "FAIL"
                }
            ]
        });
    });
};

module.exports = health;