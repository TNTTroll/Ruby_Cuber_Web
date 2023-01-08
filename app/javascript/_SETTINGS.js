// ------------------ Camera
let FOV = 75;
let ASPECT_RATIO = window.innerWidth / window.innerHeight;
let MIN_LEN = 0.1;
let MAX_LEN = 1000;
	
let camera_pos = 8;

let camera_enabled = true;  // Prevent camera rotation 
let camera_zoom = false;    // Prevent from zooming
let camera_pan = false;     // Prevent Right_Mouse_Button - grab

let rotation_speed = 2;

export { FOV, ASPECT_RATIO, MIN_LEN, MAX_LEN, 
		 camera_pan, camera_enabled, camera_pos, camera_zoom,
		 rotation_speed };


// ------------------ Light
let spot_Light_Color1 = 0xeeeece;  // Color: warn yellow
let sl1_pos = 1000;

let spot_Light_Color2 = 0xffffff;  // Color: Black
let sl2_pos = -200;

export {spot_Light_Color1, sl1_pos,
		spot_Light_Color2, sl2_pos};