const v1SensorRouter = require("../v1/routes/sensorRoutes");
const v1SwitchesRouter = require("../v1/routes/switchRoutes");
const v1UserRouter = require("../v1/routes/userRoutes");
const dashboard = require("./dashboard");
const chart = require("./chart");
const login = require("./login");
const history = require("./history");
const schedule = require("./schedule");
function route(app) {
  //Client routes
  app.use("/dashboard", dashboard);
  app.use("/chart", chart);
  app.use("/history", history);
  app.use("/schedule", schedule);
  app.use("/", login);

  //API for Board
  app.use("/api/v1/sensors", v1SensorRouter);
  app.use("/api/v1/switches", v1SwitchesRouter);

  //API for App
  app.use("/api/v1/users", v1UserRouter);
}

module.exports = route;
