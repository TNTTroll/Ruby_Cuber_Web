// ------------------ Functions
    // --- Get a letters' direction from numbers 
export function num_to_let(layer, direction) {
    let sides = 'FURBLD';

    return (direction == 1) ? sides[layer] : sides[layer] + "'";
}

    // --- Get a numbers' direction from letters
export function let_to_num(letter) {
    let sides = 'FURBLD';

    return (letter.length == 1) ? [sides.indexOf(letter[0]), 1] : [sides.indexOf(letter[0]), -1];
}

    // --- Get positive/negative direction 
export function get_direction(layer, direction) {
      return ( layer <= 2 ) ? -direction : direction; 
}
    
    // --- Get list of random moves
export function random_scrumble(len) {
    let sides = 'FURBLD';
    let moves = [];

    for (let i = 0; i < len; i++) {
        let newAction = sides[ rand_int(sides.length) ];
        if (rand_int(2) == 1) newAction += "'";
        moves.push( newAction );
    }

    return moves;
}

function rand_int(maxi) {
    return Math.floor(Math.random() * maxi);
}