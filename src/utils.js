export default {
    mapQuality: (num) => {
        const map = {
            0: '普通 96kbps',
            1: '较高 128kbps',
            2: '超高 192kbps',
            3: '无损 320kbps'
        };
        return map[num];
    }
}