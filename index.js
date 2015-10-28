var defaults = require('lodash.defaults');
var planeGeometry = require('./geometry/plane');
function SwipeAnalyzer(params) {
	params = params || {};
	defaults(params, {

	});
	var pointers = params.pointers;

	var scene = params.scene;

	var materials = [];

	var plotMesh = new THREE.Mesh(
		new planeGeometry(1, 0.5),
		new THREE.MeshBasicMaterial({
			side: THREE.DoubleSide
		})
	);
	plotMesh.position.set(50, 50, 0);
	plotMesh.scale.y = 2;
	scene.add(plotMesh);

	var data = [];
	for (var i = 0; i < 21; i++) {
		data[i] = [];
		var color = new THREE.Color();
		color.setHSL(i/21 * 3, 1, 0.5);
		materials[i] = new THREE.MeshBasicMaterial({
			color: color,
			side: THREE.DoubleSide
		})
	};
	var plotClones = [];
	var plotClonesIndex = 0;
	var plotClonesMax = 200;
	var tempVector = new THREE.Vector3();
	function plotAt(x, y, id) {
		var subData = data[id];
		var lastPlotData = subData.length > 0 ? subData[subData.length-1] : null;
		subData.push([x, y]);
		if(lastPlotData) {
			if(!plotClones[plotClonesIndex]) {
				plotClones[plotClonesIndex] = plotMesh.clone();
				scene.add(plotClones[plotClonesIndex]);
			}
			var clone = plotClones[plotClonesIndex];
			clone.material = materials[id];
			clone.position.set(lastPlotData[0], lastPlotData[1], 0);
			tempVector.x = x;
			tempVector.y = y;
			var delta = clone.position.clone().sub(tempVector);
			if(delta.length() > 0.001) {
				clone.scale.x = delta.length();
				var angle = Math.atan2(delta.y, delta.x);
				clone.rotation.z = angle;
				plotClonesIndex = (plotClonesIndex + 1) % plotClonesMax;
			}
		}
	}
	function onStart(x, y, id){
		console.log('swipe start', id);
		plotAt(x, y, id);
	}
	function onTrack(x, y, id){
		plotAt(x, y, id);
	}
	function onStop(x, y, id){
		plotAt(x, y, id);
		console.log('swipe stop', id);
		data[id].length = 0;
	}
	pointers.onPointerDownSignal.add(onStart);
	pointers.onPointerDragSignal.add(onTrack);
	pointers.onPointerUpSignal.add(onStop);
}
module.exports = SwipeAnalyzer;