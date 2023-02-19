const schedule = require("node-schedule");
const moment = require("moment-timezone");

class SocketServices {
  //connection socket
  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect id is ${socket.id}`);
    });
  }
}
module.exports = new SocketServices();
