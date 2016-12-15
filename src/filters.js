// Filters
export default {
    time: function (mseconds) {
        let minutes = Math.floor(mseconds / 60000);

        mseconds = Math.floor(mseconds / 60000 % 1 * 60);
        if (mseconds < 10) {
            mseconds = '0' + mseconds;
        }

        return minutes + ':' + mseconds;
    }
}
