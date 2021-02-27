"use strict";

const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
let app = express();

// middleware configuration
app.use(compression());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    let logDir = process.env.LOG_DIR || path.join(__dirname, './logs');
    fs.existsSync(logDir) || fs.mkdirSync(logDir);
    let accessLogStream = rfs('access.log', {
        interval: '1d',
        path: logDir
    });
    app.use(morgan('combined', {stream: accessLogStream}));
}
app.use(helmet());

// routes configuration
let routes = require('./routes');
app.get('/', routes.index);
app.get('/health', routes.health);
app.post('/user/:username/add/:group', routes.user.addUserToGroup);
app.get('/user/:name/object/:name/permission/:kind', routes.user.hasPermissionToObject);
app.get('/user/:name/object/:name/permissions', routes.user.getAllPermissionsToObject);
app.delete('/group/:group/clear', routes.group.clearUsers);
app.post('/permission/:kind/add', routes.permission.addPermission);
app.delete('/permission/:kind/clear', routes.permission.clearPermissions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

module.exports = app;
