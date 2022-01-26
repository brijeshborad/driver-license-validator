"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatches = exports.isValid = void 0;
var ca_dl_1 = require("./regex/ca-dl");
var us_dl_1 = require("./regex/us-dl");
/**
 * Check if a driver license number matches any format.
 *
 * @param dl Driver license number.
 * @param options Optional configuration options.
 */
function isValid(dl, options) {
    if (options === void 0) { options = {}; }
    var result = getMatches(dl, options);
    return (result === null || result === void 0 ? void 0 : result.length) > 0;
}
exports.isValid = isValid;
/**
 * Get all matching formats for a driver license number.
 *
 * @param dl Driver license number.
 * @param options Optional configuration options.
 */
function getMatches(dl, options) {
    if (options === void 0) { options = {}; }
    var results = [];
    var formats;
    var states;
    switch (options.country) {
        case 'CA':
            formats = ca_dl_1.CA_DL;
            break;
        case 'US':
        default:
            formats = us_dl_1.US_DL;
            break;
    }
    if (!options.states) {
        states = Object.keys(formats);
    }
    else if (!Array.isArray(options.states)) {
        states = [options.states];
    }
    states.forEach(function (state) {
        var info = formats[state];
        if (!info) {
            throw new Error("Could not find state \"" + state + "\"!");
        }
        info.forEach(function (item) {
            var regex = item.regex, description = item.description;
            var pattern = options.ignoreCase ? new RegExp(regex, 'i') : regex;
            if (pattern.test(dl)) {
                results.push({
                    description: description,
                    state: state,
                });
            }
        });
    });
    return results.length ? results : null;
}
exports.getMatches = getMatches;
//# sourceMappingURL=index.js.map