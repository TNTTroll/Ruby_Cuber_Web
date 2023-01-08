// ------------------ Imports
import { scene }        from '../../Settings/Background_Set.js';
import { state_mapping } from './Cube_3x3_Mapping.js';

import * as S           from './Cube_3x3_Sides.js';
import * as T           from '../Cube_3x3/Cube_3x3_Turn.js';
import * as A           from '../Add_Funcs.js';


// ------------------ Variables
let distance = 2.01;

let elements = S.set_pos.length;
let one_side = S.set_pos.length / 3;
let sides = Object.values(S.state_sides).length;


// ------------------ Class
export class Cube_3x3 {
	raycast_list = [];
	elem_layers = Array(sides).fill().map(() => Array(one_side));
	correct_placement = [];

	moves_len = 10;
	moves = [];

	roll_layer = {
		direction: null,
		name: null,
		axe: null
	};

		// --- Create an array of pieces to display
	constructor(pieces) {
		this.raycast_list = pieces;

		this.configurate_side();
		this.place_elements();
	}

		// --- Fill array of layers (faces) with elements
	configurate_side() {
		for (let i = 0; i < sides; i++)
			for (let j = 0; j < one_side; j++)
				this.elem_layers[i][j] = this.raycast_list[ S.state_sides[i][j] ];
	}

		// --- Place all elements all the screen
	place_elements() {
		this.remove_elements();

		for (let i = 0; i < elements; i++) {
			let new_elem = this.raycast_list[i];

			new_elem.name = i;
			new_elem.children = state_mapping[i];

			scene.add(new_elem);

			new_elem.position.set(
				S.set_pos[i][0] * distance,
				S.set_pos[i][1] * distance,
				S.set_pos[i][2] * distance);

			this.correct_placement.push([ new_elem.uuid, state_mapping[i] ]);
		}
	}

		// --- Remove all elements
	remove_elements() {
		for (let i = 0; i < elements; i++)
			scene.remove( this.raycast_list[i] );
	}

		// --- Mix puzzle for start a game
	scrumble(puzzle) {
		let scrumble_moves = A.random_scrumble(this.moves_len);

		let step = 0;
		let interval_id = setInterval(() => {
			let layer = A.let_to_num(scrumble_moves[step]);
			puzzle.make_a_turn( layer[0], layer[1] );

			++step;

			if (step === this.moves_len) clearInterval(interval_id);

		}, 500);
	}

		// --- Return 'true' if all elements on their own places
	is_solved() {
		for (let i = 0; i < elements; i++)
			if (this.raycast_list[i].uuid !== this.correct_placement[i][0] ||
				this.raycast_list[i].children !== this.correct_placement[i][1])
				return false;

		return true;
	}

		// --- Make a turn of any layer
	make_a_turn(layer, direction) {
		this.raycast_list = T.restack_array(layer,
			 							    T.rotate_side( direction, this.elem_layers[layer], layer ),
			 							    this.raycast_list);

		this.configurate_side();

		this.roll_layer = Object.assign({name: layer,
										axe: S.axes[layer],
										direction: A.get_direction(layer, direction)});

		this.moves.push( A.num_to_let(layer, direction) );
	}
}
