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
const handlebars = require("handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

handlebars.registerHelper("concat", function () {
  return Array.prototype.slice.call(arguments, 0, -1).join("");
});

app.engine(".hbs", engine({ extname: ".hbs", handlebars }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

const route = require("./routes/index");
const SocketServices = require("./services/socket");

io.on("connection", SocketServices.connection);
const PORT = process.env.PORT || 3001;

route(app);

server.listen(PORT, () => console.log(`App listening to port ${PORT}`));
