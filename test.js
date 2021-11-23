const { msToTime, convertTime12to24 } = require("./helpers/time-utils");

let date = new Date()
console.log(
    `Date: ${date.getDate()}\nHours: ${date.getHours()}\nMinutes: ${date.getMinutes()}`
);
let stringDate = date.toISOString("en-US", { timeZone: "Asia/Kolkata" })
let matchDate = new Date()
matchDate.setHours(convertTime12to24('7:30 pm').split(':')[0])
matchDate.setMinutes(30)
console.log(msToTime(matchDate - date));
