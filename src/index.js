const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const dotenv = require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const route = require("./routes/index");
const SocketServices = require("./services/socket");

io.on("connection", SocketServices.connection);
const PORT = process.env.PORT || 1234;

route(app);

server.listen(PORT, () => console.log(`App listening to port ${PORT}`));
