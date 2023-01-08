// ------------------ Functions
export function load_pieces(path, amount) {
	let pieces = Array(27);
	let loader = new THREE.JSONLoader();

	function save_helper(i) {
    	return function(g, m) {
        	pieces[i] = new THREE.Mesh(g, m);
    	}
	}

	for (let i = 0; i < amount; i++) {
		let thisPath = new URL('../../3x3_Normal/Cube_Piece_' + i + '.json', import.meta.url).toJSON();
	    loader.load( thisPath, save_helper(i) );
	}

	return pieces;
}