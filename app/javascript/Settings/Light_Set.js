// ------------------ Imports
import { scene } from './Background_Set.js';
import * as S    from '../_SETTINGS.js';


// ------------------ Functions
export function set_light_spots() {
	let spot_light1 = new THREE.SpotLight( S.spot_Light_Color1, .6 );
	let spot_light2 = new THREE.SpotLight( S.spot_Light_Color2, .6 );
	let ambient_light = new THREE.AmbientLight( S.spot_Light_Color1, .45);

	let pos_1 = new THREE.Vector3(10, 10, 10);
	let pos_2 = new THREE.Vector3(-10, -10, -10);

	spot_light1.position.set(pos_1.x, pos_1.y, pos_1.z);
	spot_light2.position.set(pos_2.x, pos_2.y, pos_2.z);

	scene.add(spot_light1);
	scene.add(spot_light2);
	scene.add(ambient_light);
}
