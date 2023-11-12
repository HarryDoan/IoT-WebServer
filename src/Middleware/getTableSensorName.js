function getTableSensorName(req, res, next) {
  const phone = res.locals.user;

  next();
}

module.exports = getTableSensorName;
