// ------------------ Variables
let scene = new THREE.Scene();
change_background_set();


// ------------------ Function

function change_background_set() {
	let bg_loader = new THREE.CubeTextureLoader();
	let bg_texture = bg_loader.load([
		new URL('../BG/R.jpg', import.meta.url).href,
		new URL('../BG/L.jpg', import.meta.url).href,
   		new URL('../BG/D.jpg', import.meta.url).href,
		new URL('../BG/U.jpg', import.meta.url).href,
		new URL('../BG/B.jpg', import.meta.url).href,
		new URL('../BG/F.jpg', import.meta.url).href
  	]);

	scene.background = bg_texture;
}


// ------------------ Exports
export { scene }