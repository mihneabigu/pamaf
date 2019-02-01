//MODULE related to hardcoded maps
//Initial matrix size: 21x11
//Final matrix size: 21x21

var create_map = function (matrix) {
    //Function that creates a map by using half of a model
    //Max elements on line
    let MAX_LINE = 21;
    //Final map matrix
    let MAP = [];
    let LINE = 0;
    //Parsing through the given model
    for (let i = 0; i < matrix.length; i++) {
        //Creating new line + initializing it
        MAP[LINE] = new Array(MAX_LINE).fill(0);
        for (let j = 0; j < matrix[i].length; j++) {
            //Add each element from the given matrix
            MAP[LINE][j] = matrix[i][j];
            //Adding it symmetrically
            MAP[LINE][MAX_LINE - j - 1] = matrix[i][j];
        };
        //Next line...
        LINE++;
    };
    //Adding extras on the map
    add_extras(MAP);
    //Returning final matrix of the map
    return MAP;
}

var add_extras = function (map) {
    //Function that adds extras on the map besides walls
    let special_point = 2;
    let player_spawn = 7;
    let ghost_spawn = 10;
    
    //Adding special power points
    map[2][2] = special_point;
    map[2][18] = special_point;
    map[18][2] = special_point;
    map[18][18] = special_point;

    //Adding ghost spawning position
    map[8][10] = ghost_spawn;
    
    //Adding player spawning position
    map[12][10] = player_spawn;
}

var get_random_map = function() {
    //Get random half of map from the list
    let sketch = MAPS[Math.floor(Math.random() * MAPS.length)];
    //Generating it symetrically
    let map = create_map(sketch);
    //Return final matrix
    return map;
}