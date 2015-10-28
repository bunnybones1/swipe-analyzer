THREE = require('three');
var ManagedView = require('threejs-managed-view').View;
var Pointers = require('input-unified-pointers');
var SwipeAnalyzer = require('./');

var camera = new THREE.OrthographicCamera(0, window.innerWidth, 0, window.innerHeight, 100, -100);
var view = new ManagedView({
	camera: camera
});
// view.renderManager.skipFrames = 10;
var swipeAnalyzer = new SwipeAnalyzer({
	pointers: new Pointers(view.canvas),
	scene: view.scene
});