class DashboardController {
  dashboard(req, res) {
    res.render("dashboard", {
      data: {
        name: "Dong",
        age: 23,
      },
    });
  }
}

module.exports = new DashboardController();
