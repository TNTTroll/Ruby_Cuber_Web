// ------------------ Imports
import "@hotwired/turbo-rails";
import { on_mouse_down }   from './Settings/Mouse_Set';
import { scene }           from './Settings/Background_Set.js';
import { set_light_spots } from './Settings/Light_Set';
import * as S              from './_SETTINGS.js';

import { Cube_3x3 }        from './Puzzles/Cube_3x3/Cube_3x3';
import { load_pieces }     from './Puzzles/Cube_3x3/Cube_3x3_Load';


// ------------------ Variables
let puzzle, first_move, game_type, puzzle_type = '3x3_Normal';
let time;


// ------------------ Functions
function init() {
    document.addEventListener('mousedown', on_mouse_down, false);
    set_light_spots();

    render();
}

function switch_display(place, turn) {
    if (turn === 1) {
        place.classList.remove('hide');
        place.classList.add('show');
    } else {
        place.classList.remove('show');
        place.classList.add('hide');
    }
}

function start_game() {
    document.getElementById('c').scrollIntoView();

    switch_display(document.getElementById('statistics'), 0);
    switch_display(document.getElementById('over'), 0);

    document.getElementById('BtnIdSolved').disabled = true;

    first_move = true;

    document.getElementById('pop').remove();

    load_puzzle(puzzle_type);
}


// ------------------ Loader
export function load_puzzle(puzzle_type) {
    let all_variants = [];

    switch (puzzle_type) {
        case '3x3_Normal':
            load_puzzle('3x3_Normal', 27).then( function() { puzzle = new Cube_3x3(all_variants); });
            break;
        default:
            load_puzzle('3x3_Normal', 27).then( function() { puzzle = new Cube_3x3(all_variants); });
            break;
    }

    function load_puzzle(path, amount) {
        all_variants = load_pieces(path, amount);

        return new Promise(function(resolve){
            setTimeout(function() {
                resolve();
            }, 500);
        });
    }
}


// ------------------ Camera
// --- Camera
let camera = new THREE.PerspectiveCamera(S.FOV, S.ASPECT_RATIO, S.MIN_LEN, S.MAX_LEN);

camera.position.set(S.camera_pos, S.camera_pos, S.camera_pos);

// --- Canvas
let canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setViewport(-window.innerWidth *.09, 0, window.innerWidth, window.innerHeight);

// --- Control
const controls = new THREE.OrbitControls( camera, canvas );

controls.target.set(0, 0, 0);

controls.enabled = S.camera_enabled;
controls.enableZoom = S.camera_zoom;
controls.enablePan = S.camera_pan;

controls.update();


// ------------------ Animation
let step_count, group, is_active = false;
function roll_the_layer(group, step_count, direction, axe) {
    group.rotation[axe] += direction * Math.PI / 100 * S.rotation_speed;
    return --step_count;
}


// ------------------ Render
export function render() {
    requestAnimationFrame( render );

    update();

    renderer.render( scene, camera );
}
export function update() {

    if (puzzle) {

        if (puzzle.roll_layer.name != null && !is_active) {
            group = new THREE.Group();

            for (let i = 0; i < puzzle.elem_layers[0].length; i++)
                group.add(puzzle.elem_layers[puzzle.roll_layer.name][i]);

            scene.add(group);

            is_active = true;
            step_count = 50 / S.rotation_speed;
        }

        if (is_active) {
            step_count = roll_the_layer(group,
                step_count,
                puzzle.roll_layer.direction,
                puzzle.roll_layer.axe);


            if (step_count === 0) {
                is_active = false;

                puzzle.roll_layer = Object.assign({name: null, direction: null, axe: null});

                scene.remove(group);
                puzzle.place_elements();
            }
        }
    }
}


// ------------------ Windows
window.start_practice = function () {
    start_game();
    game_type = 'Practice';
}

window.start_competition = function () {
    start_game();
    game_type = 'Competition';
}

window.btn_scrumble = function () {
    puzzle.scrumble(puzzle);
}

window.btn_restart = function() {
    window.open('main/page', '_self');
}

window.turn_button = function (layer, direction) {
    if (first_move) {
        if (game_type === 'Competition') {
            start_timer();
            document.getElementById('Timer').textContent = '00:00:00';
        }

        document.getElementById('BtnIdSolved').disabled = false;
        first_move = false;
    }

    puzzle.make_a_turn(layer, direction);
}

window.btn_solved = function () {
    let out_text = document.getElementById('isSolved');

    if (puzzle.is_solved()) {
        out_text.innerHTML = 'Puzzle is solved';
        end_game();

    } else {
        if (game_type === 'Practice') out_text.innerHTML = 'Puzzle is NOT solved';
        else game_over();
    }
}

window.end_game = function () {
    switch_display(document.getElementById('statistics'), 1);

    let timer_stat = document.getElementById('timerStat');

    if (game_type === 'Competition') {
        stop_timer();
        window.open('/base/board/?solved=1&time='+String(time), '_self');
        timer_stat.innerHTML = document.getElementById('Timer').textContent;
    } else {
        window.open('/base/board/?solved=1&time=0', '_self');
    }
}

window.game_over = function () {
    stop_timer();
    window.open('/base/board/?solved=0&time='+String(time), '_self');
    switch_display(document.getElementById('over'), 1);
}

window.close_me = function (who) {
    switch_display(document.getElementById('skins'), 0);
}



// ------------------ Timer
let t, display = document.getElementById('Timer');
let sec = 0, min = 0, hrs = 0;

function tick() {
    sec++;

    if (sec >= 60) {
        sec = 0;
        min++;

        if (min >= 60) {
            min = 0;
            hrs++;
        }
    }
}

function show_time() {
    tick();
    display.textContent = (hrs > 9 ? hrs : "0" + hrs)
        + ":" + (min > 9 ? min : "0" + min)
        + ":" + (sec > 9 ? sec : "0" + sec);

    timer();
}

function timer() { t = setTimeout(show_time, 1000); }

export function start_timer() { timer(); }

export function stop_timer() {
    time = sec + min*60 + hrs*3600;
    display.style.color = 'green';
    clearTimeout(t);
}


// ------------------ Init
init();


// ------------------ Exports
export { puzzle, scene };
export { camera, renderer, controls };