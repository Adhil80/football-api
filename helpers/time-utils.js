module.exports = {
    convertTime12to24: (time) => {
        var hours = parseInt(time.substr(0, 2));
        if (time.indexOf('am') != -1 && hours == 12) {
            time = time.replace('12', '0');
        }
        if (time.indexOf('pm') != -1 && hours < 12) {
            time = time.replace(hours, (hours + 12));
        }
        return time.replace(/(am|pm)/, '').replace(' ', '');
    },
    getMonthNumberFromName: (month1) => {
        month1 = month1.toLowerCase();
        month1 = month1.substring(0, 3)
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        return months.indexOf(month1);
    },
    msToTime: (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        hrs = parseInt(hrs)
        mins = parseInt(mins)
        secs = parseInt(secs)

        return hrs + ':' + mins + ':' + secs 
    }
}