const { Router } = require('express');

const usersRoutes = require('./user.routes');
const dishesRoutes = require('./dishes.routes');
const sessionsRoutes = require('./sessions.routes');

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;