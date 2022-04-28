var curr = new Date(); // get current date
var sunday = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var monday = sunday + 1;
var tuesday = sunday + 2;
var wednesday = sunday + 3;
var thursday = sunday + 4;
var friday = sunday + 5;
var saturday = sunday + 6; // last day is the first day + 6

var firstdaystart = new Date(curr.setDate(sunday)).setHours(0, 0, 0);
var firstdayend = new Date(curr.setDate(sunday)).setHours(23, 59, 59);
var seconddaystart = new Date(curr.setDate(monday)).setHours(0, 0, 0);
var seconddayend = new Date(curr.setDate(monday)).setHours(23, 59, 59);
var thirddaystart = new Date(curr.setDate(tuesday)).setHours(0, 0, 0);
var thirddayend = new Date(curr.setDate(tuesday)).setHours(23, 59, 59);
var fourthdaystart = new Date(curr.setDate(wednesday)).setHours(0, 0, 0);
var fourthdayend = new Date(curr.setDate(wednesday)).setHours(23, 59, 59);
var fifthdaystart = new Date(curr.setDate(thursday)).setHours(0, 0, 0);
var fifthdayend = new Date(curr.setDate(thursday)).setHours(23, 59, 59);
var sixthdaystart = new Date(curr.setDate(friday)).setHours(0, 0, 0);
var sixthdayend = new Date(curr.setDate(friday)).setHours(23, 59, 59);
var seventhdaystart = new Date(curr.setDate(saturday)).setHours(0, 0, 0);
var seventhdayend = new Date(curr.setDate(saturday)).setHours(23, 59, 59);

module.exports = {
  firstday: function () {
    return { firstdaystart, firstdayend };
  },
  secondday: function () {
    return { seconddaystart, seconddayend };
  },
  thirdday: function () {
    return { thirddaystart, thirddayend };
  },
  fourthday: function () {
    return { fourthdaystart, fourthdayend };
  },
  fifthday: function () {
    return { fifthdaystart, fifthdayend };
  },
  sixthday: function () {
    return { sixthdaystart, sixthdayend };
  },
  seventhday: function () {
    return { seventhdaystart, seventhdayend };
  },
};
