const date = require("date-and-time");

function formatDate(createdAtDate) {
  return date.format(createdAtDate, " ddd, MMM DD YYYY, HH:mm");
}

module.exports = formatDate;
