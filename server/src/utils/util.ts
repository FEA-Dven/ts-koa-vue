class Util {
    public saveJSONParse(str: string): any {
        try {
            return JSON.parse(str);
        } catch (e) {
            return {};
        }
    }
}

export default Util;
