// ------------------ Imports
import * as F from './Cube_3x3_Faces.js';
import * as S from './Cube_3x3_Sides.js';


// ------------------ Functions
export function restack_array(name, layer_new, array) {
	for (let i = 0; i < S.state_sides[name].length; i++)
		array[ S.state_sides[name][i] ] = layer_new[i];

	return array;
}

export function rotate_side(turn, array, layer) {
	if (turn === 1)
		var r_array = F.turn_faces_clockwise( swipe_clockwise(array), layer,
									         S.borders[layer][0], S.borders[layer][1]);
	else
		var r_array = F.turn_faces_counter_clockwise( swipe_counter_clockwise(array), layer,
											        S.borders[layer][0], S.borders[layer][1]);

	return rotate_face(r_array, layer, turn);
}

function rotate_face(array, layer, turn) {
	switch (layer) {
		case 0:
			if (turn === 1) array.forEach ( element => element.rotation.z -= Math.PI/2 );
			else array.forEach ( element => element.rotation.z += Math.PI/2 );
			break;
		case 1:
			if (turn === 1) array.forEach ( element => element.rotation.y -= Math.PI/2 );
			else array.forEach ( element => element.rotation.y += Math.PI/2 );
			break;
		case 2:
			if (turn === 1) array.forEach ( element => element.rotation.x -= Math.PI/2 );
			else array.forEach ( element => element.rotation.x += Math.PI/2 );
			break;
		case 3:
			if (turn === 1) array.forEach ( element => element.rotation.z += Math.PI/2 );
			else array.forEach ( element => element.rotation.z -= Math.PI/2 );
			break;
		case 4:
			if (turn === 1) array.forEach ( element => element.rotation.x += Math.PI/2 );
			else array.forEach ( element => element.rotation.x -= Math.PI/2 );
			break;
		case 5:
			if (turn === 1) array.forEach ( element => element.rotation.y += Math.PI/2 );
			else array.forEach ( element => element.rotation.y -= Math.PI/2 );
			break;
	}

	return array;
}

function swipe_clockwise(array) {
	let temp_cross = array[0];
	array[0] = array[2];
	array[2] = array[8];
	array[8] = array[6];
	array[6] = temp_cross;

	let temp_diagonal = array[1];
	array[1] = array[5];
	array[5] = array[7];
	array[7] = array[3];
	array[3] = temp_diagonal;

	return array;
}

function swipe_counter_clockwise(array) {
	let temp_cross = array[0];
	array[0] = array[6];
	array[6] = array[8];
	array[8] = array[2];
	array[2] = temp_cross;

	let temp_diagonal = array[1];
	array[1] = array[3];
	array[3] = array[7];
	array[7] = array[5];
	array[5] = temp_diagonal;

	return array;
}