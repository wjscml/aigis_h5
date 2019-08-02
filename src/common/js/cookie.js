const cookie = {
    getCookie(key) {
        const data = document.cookie;
        let startIndex = data.indexOf(key + '=');
        if (startIndex > -1) {
            startIndex = startIndex + key.length + 1;
            let endIndex = data.indexOf(';', startIndex);
            endIndex = endIndex < 0 ? data.length : endIndex;
            return decodeURIComponent(data.substring(startIndex, endIndex));
        } else {
            return '';
        }
    },

    setCookie(key, value, time) {
        const times = time;
        const cur = new Date();
        cur.setTime(cur.getTime() + times * 24 * 3600 * 1000);

        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (times === undefined ? '' : cur.toUTCString());
    },

    delCookie(key) {
        const data = this.getCookie(key)
        if (data !== false) {
            this.setCookie(key, data, -1);
            console.log(key, data)
        }
    }
}
export default cookie