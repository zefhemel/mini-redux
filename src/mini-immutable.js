var update = require('react-addons-update');

function buildPath(path, operator, value) {
    var pathObjRoot = {};
    var currentPathObj = pathObjRoot;
    for(var i = 0; i < path.length; i++) {
        var pathPart = path[i];
        currentPathObj[pathPart] = {};
        currentPathObj = currentPathObj[pathPart];
    }
    currentPathObj[operator] = value;
    return pathObjRoot;
}

function setIn(obj, path, value) {
    var pathObj = buildPath(path, '$set', value);
    return update(obj, pathObj);
}

function pushIn(obj, path, value) {
    var pathObj = buildPath(path, '$push', value);
    return update(obj, pathObj);
}

function updateIn(obj, path, fn) {
    var pathObj = buildPath(path, '$apply', fn);
    return update(obj, pathObj);
}

module.exports = {
    setIn: setIn,
    pushIn: pushIn,
    updateIn: updateIn
};