// Filters
export default {
    msecondToMinutes: function (msec) {
        let minutes = Math.floor(msec / 60000);

        msec = Math.floor(msec / 60000 % 1 * 60);
        if (msec < 10) {
            msec = '0' + msec;
        }

        return minutes + ':' + msec;
    },
    getTime: function (msec) {
        const date = new Date(msec);

        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.toTimeString().slice(0, 5)
    }
}
