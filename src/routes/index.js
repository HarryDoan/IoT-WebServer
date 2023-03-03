const v1SensorRouter = require("../v1/routes/sensorRoutes");
const v1UserRouter = require("../v1/routes/userRoutes");
const dashboard = require("./dashboard");
function route(app) {
  //Frontend routes
  app.use("/", dashboard);

  //API routes
  app.use("/api/v1/sensors", v1SensorRouter);
  app.use("/api/v1/users", v1UserRouter);
}

module.exports = route;
