var hasOwnProperty = {}.hasOwnProperty;

var COMMAND_PUSH = '$push';
var COMMAND_UNSHIFT = '$unshift';
var COMMAND_SPLICE = '$splice';
var COMMAND_SET = '$set';
var COMMAND_MERGE = '$merge';
var COMMAND_APPLY = '$apply';

var ALL_COMMANDS_LIST = [
    COMMAND_PUSH,
    COMMAND_UNSHIFT,
    COMMAND_SPLICE,
    COMMAND_SET,
    COMMAND_MERGE,
    COMMAND_APPLY,
];

var ALL_COMMANDS_SET = {};

ALL_COMMANDS_LIST.forEach(function (command) {
    ALL_COMMANDS_SET[command] = true;
});

function buildPath(path, operator, value) {
    var pathObjRoot = {};
    var currentPathObj = pathObjRoot;
    for (var i = 0; i < path.length; i++) {
        var pathPart = path[i];
        currentPathObj[pathPart] = {};
        currentPathObj = currentPathObj[pathPart];
    }
    currentPathObj[operator] = value;
    return pathObjRoot;
}

function setInSpec(path, value) {
    return buildPath(path, COMMAND_SET, value);
}

function pushInSpec(path, value) {
    return buildPath(path, COMMAND_PUSH, value);
}

function updateInSpec(path, value) {
    return buildPath(path, COMMAND_APPLY, value);
}

function setIn(obj, path, value) {
    return update(obj, setInSpec(path, value));
}

function pushIn(obj, path, values) {
    return update(obj, pushInSpec(path, values));
}

function updateIn(obj, path, fn) {
    return update(obj, updateInSpec(path, fn));
}

function assign(target) {
    var output = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source !== undefined && source !== null) {
            for (var nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                    output[nextKey] = source[nextKey];
                }
            }
        }
    }
    return output;
}

// Ported from https://github.com/facebook/react/blob/master/src/addons/update.js
// And simplified a bit

function shallowCopy(x) {
    if (Array.isArray(x)) {
        return x.concat();
    } else if (x && typeof x === 'object') {
        return assign(new x.constructor(), x);
    } else {
        return x;
    }
}

function update(value, spec) {
    if (hasOwnProperty.call(spec, COMMAND_SET)) {
        return spec[COMMAND_SET];
    }

    var nextValue = shallowCopy(value);

    if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
        assign(nextValue, spec[COMMAND_MERGE]);
    }

    if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
        spec[COMMAND_PUSH].forEach(function (item) {
            nextValue.push(item);
        });
    }

    if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
        spec[COMMAND_UNSHIFT].forEach(function (item) {
            nextValue.unshift(item);
        });
    }

    if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
        spec[COMMAND_SPLICE].forEach(function (args) {
            nextValue.splice.apply(nextValue, args);
        });
    }

    if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
        nextValue = spec[COMMAND_APPLY](nextValue);
    }

    for (var k in spec) {
        if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
            nextValue[k] = update(value[k], spec[k]);
        }
    }

    return nextValue;
}

function mergeTwoSpecs(dest, source) {
    if (dest.constructor === Array) {
        if (!source) {
            return dest;
        }
        var newArray = [];
        var el, i;
        for (i = 0; i < dest.length; i++) {
            el = dest[i];
            newArray.push(el);
        }
        for (i = 0; i < source.length; i++) {
            el = source[i];
            if (newArray.indexOf(el) === -1) {
                newArray.push(el);
            }
        }
        return newArray;
    } else if (typeof dest === 'object') {
        dest = shallowCopy(dest);
        if (typeof source === 'object') {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    if (dest[p] === undefined) {
                        dest[p] = source[p];
                    } else {
                        dest[p] = mergeTwoSpecs(dest[p], source[p]);
                    }
                }
            }
        } else {
            throw Error("Source not an object", source, dest);
        }
        return dest;
    } else {
        return source;
    }
}

function mergeSpecs(specs) {
    var spec = {};
    for (var i = 0; i < specs.length; i++) {
        spec = mergeTwoSpecs(spec, specs[i]);
    }
    return spec;
}

module.exports = {
    setIn: setIn,
    setInSpec: setInSpec,
    updateInSpec: updateInSpec,
    pushIn: pushIn,
    pushInSpec: pushInSpec,
    updateIn: updateIn,
    update: update,
    mergeSpecs: mergeSpecs,
};