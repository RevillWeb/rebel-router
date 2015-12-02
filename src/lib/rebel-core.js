export function validElementTag(tag) {
    return /^[a-z0-9\-]+$/.test(tag);
}
export function parseQueryString(url) {
    var result = {};
    var queryString = (url.indexOf("?") > -1) ? url.substr(url.indexOf("?") + 1, url.length) : null;
    if (queryString !== null) {
        queryString.split("&").forEach(function (part) {
            if (!part) return;
            part = part.replace("+", " ");
            var eq = part.indexOf("=");
            var key = eq > -1 ? part.substr(0, eq) : part;
            var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
            var from = key.indexOf("[");
            if (from == -1) result[decodeURIComponent(key)] = val;
            else {
                var to = key.indexOf("]");
                var index = decodeURIComponent(key.substring(from + 1, to));
                key = decodeURIComponent(key.substring(0, from));
                if (!result[key]) result[key] = [];
                if (!index) result[key].push(val);
                else result[key][index] = val;
            }
        });
    }
    return result;
}