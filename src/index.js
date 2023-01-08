const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const v1SensorRouter = require("./v1/routes/sensorRoutes");

const PORT = process.env.PORT || 1234;

//Route
app.use("/api/v1/sensors", v1SensorRouter);

app.listen(PORT, () => console.log("Server listening on port: ", PORT));