var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    return Object(val);
}

function isObj(x) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
}

function assignKey(to, from, key) {
    var val = from[key];

    if (val === undefined) {
        return;
    }

    if (hasOwnProperty.call(to, key)) {
        if (to[key] === undefined) {
            throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
        }
    }

    if (!hasOwnProperty.call(to, key) || !isObj(val)) to[key] = val;
    else if (val instanceof Array) to[key] = from[key];
    // figure out how to merge arrays without converting them into objects
    else to[key] = assign(Object(to[key]), from[key]);
}

function assign(to, from) {
    if (to === from) {
        return to;
    }

    from = Object(from);

    for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
            assignKey(to, from, key);
        }
    }

    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(from);

        for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
                assignKey(to, from, symbols[i]);
            }
        }
    }

    return to;
}

export default function merge(target) {
    target = toObject(target);

    for (var s = 1; s < arguments.length; s++) {
        assign(target, arguments[s]);
    }

    return target;
}
