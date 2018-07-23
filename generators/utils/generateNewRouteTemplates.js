/**
 * generateNewRouteTemplates
 *
 * Check whether the given component exist in either the components or containers directory
 */

const objectAssignDeep = require('object-assign-deep');
const camelCase = require('camelcase');

function generateNewRouteTemplates(destArr, containerName, oldRouteTemplates) {
  let parentObj = Object.assign({});
  let childObj = Object.assign({});
  let route = '';

  if (!destArr.length) return false;

  const routeName = camelCase(destArr[destArr.length - 1]);

  destArr.map(dest => {
    route += `/${dest}`;
  });

  if (routeName) {
    childObj = Object.assign(
      {},
      {
        root: route,
        [camelCase(containerName)]: route + `/${camelCase(containerName)}`,
      }
    );
  } else {
    childObj = Object.assign(
      {},
      {
        [camelCase(containerName)]: route + `/${camelCase(containerName)}`,
      }
    );
  }

  for (var i = destArr.length - 1; i >= 0; i--) {
    parentObj = Object.assign({});
    parentObj[destArr[i]] = Object.assign({}, childObj);
    childObj = Object.assign({}, parentObj);
  }

  return objectAssignDeep(oldRouteTemplates, parentObj);
}

module.exports = generateNewRouteTemplates;
