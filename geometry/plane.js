var __geoms = {};
var md5 = require('md5');
module.exports = function(alignX, alignY) {
	alignX = alignX === undefined ? 0.5 : alignX;
	alignY = alignY === undefined ? 0.5 : alignY;
	var hash = md5('' + alignX + alignY);
	var geom = __geoms[hash];
	var offsetX = 0.5 - alignX;
	var offsetY = 0.5 - alignY;
	if(!geom) {
		console.log('NEW QUAD!', alignX, alignY);
		geom = new THREE.PlaneGeometry(1, 1, 1, 1);
		geom.vertices.forEach(function(vertex) {
			vertex.x += offsetX;
			vertex.y += offsetY;
		});
		geom.verticesNeedUpdate = true;
		__geoms[hash] = geom;
	}
	return geom;
}