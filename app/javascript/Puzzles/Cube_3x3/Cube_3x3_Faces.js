// ------------------ Imports
import * as S from './Cube_3x3_Sides.js';


// ------------------ Functions
export function turn_faces_clockwise(array, up, front, left) {
	let temp_cross = array[0].children[up];
	array[0].children[up] = array[2].children[up];
	array[2].children[up] = array[8].children[up];
	array[8].children[up] = array[6].children[up];
	array[6].children[up] = temp_cross;

	let temp_diagonal = array[1].children[up];
	array[1].children[up] = array[5].children[up];
	array[5].children[up] = array[7].children[up];
	array[7].children[up] = array[3].children[up];
	array[3].children[up] = temp_diagonal;

	array = side_clockwise(array, front, left, S.opposite_side[front], S.opposite_side[left]);

	return array;
} 

function side_clockwise(array, front, left, back, right) {
	let temp_1 = array[0].children[front];
	let temp_2 = array[1].children[front];
	let temp_3 = array[2].children[front];
	array[0].children[front] = array[6].children[left];
	array[1].children[front] = array[3].children[left];
	array[2].children[front] = array[0].children[left];
	array[6].children[left] = array[8].children[back];
	array[3].children[left] = array[7].children[back];
	array[0].children[left] = array[6].children[back];
	array[8].children[back] = array[2].children[right];
	array[7].children[back] = array[5].children[right];
	array[6].children[back] = array[8].children[right];
	array[2].children[right] = temp_1;
	array[5].children[right] = temp_2;
	array[8].children[right] = temp_3;

	return array;
}

export function turn_faces_counter_clockwise(array, up, front, left) {
	let temp_cross = array[0].children[up];
	array[0].children[up] = array[6].children[up];
	array[6].children[up] = array[8].children[up];
	array[8].children[up] = array[2].children[up];
	array[2].children[up] = temp_cross;

	let temp_diagonal = array[1].children[up];
	array[1].children[up] = array[3].children[up];
	array[3].children[up] = array[7].children[up];
	array[7].children[up] = array[5].children[up];
	array[5].children[up] = temp_diagonal;

	array = side_counter_clockwise(array, front, left, S.opposite_side[front], S.opposite_side[left]);

	return array;
} 

function side_counter_clockwise(array, front, left, back, right) {
	let temp_1 = array[0].children[front];
	let temp_2 = array[1].children[front];
	let temp_3 = array[2].children[front];
	array[0].children[front] = array[2].children[right];
	array[1].children[front] = array[5].children[right];
	array[2].children[front] = array[8].children[right];
	array[2].children[right] = array[8].children[back];
	array[5].children[right] = array[7].children[back];
	array[8].children[right] = array[6].children[back];
	array[8].children[back] = array[6].children[left];
	array[7].children[back] = array[3].children[left];
	array[6].children[back] = array[0].children[left];
	array[6].children[left] = temp_1;
	array[3].children[left] = temp_2;
	array[0].children[left] = temp_3;

	return array;
}