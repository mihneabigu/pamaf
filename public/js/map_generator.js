//Module that deals with generating random half-maps
//Initial matrix size: 21x11
//Final matrix size: 21x21
//Available area for wall blocks: 15x7

//Class for blocks
class BLOCK {
    //Block initialization: type, model matrix
    constructor() {
        this.type = block_types[Math.floor(Math.random() * block_types.length)];
        this.model = block_models[this.type][Math.floor(Math.random() * block_models[this.type].length)];
        console.log("*New block: ", this.type, " version: ", this.model);
    }

    //Function that returns max x value
    get_max_x() {
        let max_x = 0;
        for (let i = 0; i < this.model.length; i++) {
            let x = 0;
            for (let j = 0; j < this.model[i].length; j++) {
                if (this.model[i][j] == 1) {
                    x++;
                }
            }
            if (x > max_x) {
                max_x = x;
            }
        }
        return max_x;
    }

    //Function that returns max y value
    get_max_y() {
        let max_y = 0;
        for (let j = 0; j < 3; j++) {
            let y = 0;
            for (let i = 0; i < 3; i++) {
                if (this.model[i][j] == 1) {
                    y++;
                }
            }
            if (y > max_y) {
                max_y = y;
            }
        }
        return max_y;
    }

    //Function that returns top x value
    get_top_x() {
        let top_x = 0;
        for (let i = 0; i < this.model.length; i++) {
            for (let j = 0; j < this.model[i].length; j++) {
                if (this.model[i][j] == 1) {
                    top_x++;
                }
            }
            if (top_x > 0) {
                return top_x;
            }
        }
        return top_x;
    }

    //Checks if two blocks fit horizontally
    fits_hz(block, limit) {
        let verdict = false;
        //If their top x sum goes passes the limit.. they don't fit
        if (this.get_top_x() + block.get_top_x() + 1 <= limit) {
            verdict = true;
        }
        return verdict;
    }

    //Check if two blocks fit vertically
    fits_vert(block, limitY) {
        let verdict = false;
        if (this.get_max_y() + block.get_max_y() + 1 <= limitY) {
            verdict = true;
        }
        return verdict;
    }

    //Function that checks if block would fit on the map
    fits(map, mapY, mapX) {
        let barrierX = mapX;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let x_sum = 0;
                if (this.model[i][j] == 1) {
                    x_sum = map[mapY][mapX] + 1;
                }
                if (x_sum > 1) {
                    return false;
                }
                mapX++;
            }
            mapY++;
            mapX = barrierX;
        }
        return true;
    }

    //Save block
    save_block(map, mapY, mapX) {
        let barrierX = mapX;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                map[mapY][mapX] = this.model[i][j];
                mapX++;
            }
            mapY++;
            mapX = barrierX;
        }
    }
}

//Class for the map
class GAME_MAP {
    constructor() {
        //Initial empty map
        this.model = [
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],

            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],

            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],

            [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        ]
        this.generate_self();
    }

    //Generate first section
    generate_section_hz(number) {
        //
        let they_fit = false;
        let barrierX = 3;
        let main_x = 3;
        let main_y = 0;
        let limit = 0;

        if (number == 1) {
            barrierX = 3;
            main_y = 3;
            limit = 8;
        }
        else
            if (number == 2) {
                main_y = 15;
                limit = 7;
            }

        while (!they_fit) {
            let block1 = new BLOCK;
            console.log("*top x: ", block1.get_top_x());
            let block2 = new BLOCK;
            they_fit = block1.fits_hz(block2, limit);
            console.log("FITS?: ", they_fit);
            if (they_fit) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        this.model[main_y][main_x] = block1.model[i][j];
                        main_x++;
                    }
                    main_x++;
                    for (let k = 0; k < 3; k++) {
                        this.model[main_y][main_x] = block2.model[i][k];
                        main_x++;
                    }
                    main_y++;
                    main_x = barrierX;
                }
            }
        }
    }

    generate_section_vert() {
        //
        let they_fit = false;
        let barrierY = 7;
        let main_x = 3;
        let main_y = 7;
        let limit = 8;

        let block1 = new BLOCK;
        let block2 = new BLOCK;
        console.log("*max y: ", block1.get_max_y(), " *max x: ", block1.get_max_y());
        while (block1.get_max_x() > 3) {
            block1 = new BLOCK;
        }

        they_fit = block1.fits_vert(block2, limit);
        console.log("FITS?: ", they_fit);

        while (!they_fit) {
            block2 = new BLOCK;
            console.log("HERE");
            they_fit = block1.fits_vert(block2, limit);
            console.log("FITS?: ", they_fit);

        }
        if (they_fit) {
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < 3; i++) {
                    this.model[main_y][main_x] = block1.model[i][j];
                    main_y++;
                }
                main_y++;
                for (let k = 0; k < 3; k++) {
                    this.model[main_y][main_x] = block2.model[k][j];
                    main_y++;
                }
                main_x++;
                main_y = barrierY;
            }
        }
    }

    //Function to generate center of the map
    generate_section_center() {
        let barrierX = 7;
        let main_x = 7;
        let main_y = 12;

        let block1 = new BLOCK;
        while (block1.get_max_y() > 2) {
            block1 = new BLOCK;
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.model[main_y][main_x] = block1.model[i][j];
                main_x++;
            }
            main_y++;
            main_x = barrierX;
        }
    }

    //Function used to fill up spaces
    fill_spaces() {
        for (let i = 2; i < this.model.length; i++) {
            for (let j = 2; j < this.model[i].length; j++) {
                if (this.model[i][j] == 0
                    && this.model[i][j + 1] == 0
                    && this.model[i + 1][j] == 0
                    && this.model[i + 1][j + 1] == 0) {
                    this.model[i + 1][j] = 1;
                    // this.model[i + 1][j + 1] = 1;
                }
                if (this.model[i][j] == 1
                    && this.model[i][j + 1] == 0
                    && this.model[i + 1][j] == 0
                    && this.model[i + 1][j + 1] == 1
                    && this.model[i + 2][j + 1] == 0
                    && this.model[i + 2][j] == 0
                    && this.model[i + 2][j - 1] == 0) {
                    this.model[i + 1][j + 1] = 1;
                    // this.model[i + 1][j + 1] = 1;
                }
            }
        }
    }

    //Function used to clear possible paths
    clear_paths() {
        let max_tries = 2;
        let tries = 0;
        while (tries < max_tries) {
        for (let i = 1; i < this.model.length; i++) {
            for (let j = 1; j < this.model[i].length; j++) {
                if (
                    this.model[i][j] == 0
                    && this.model[i + 1][j] == 1
                    && this.model[i][j - 1] == 1
                    && this.model[i][j + 1] == 1) {
                    this.model[i][j + 1] = 0;
                }
                if (
                    this.model[i][j] == 0
                    && this.model[i][j - 1] == 1
                    && this.model[i - 1][j] == 1
                    && this.model[i][j + 1] == 1) {
                    this.model[i - 1][j] = 0;
                }
                if (
                    this.model[i][j] == 0
                    && this.model[i][j + 1] == 1
                    && this.model[i - 1][j] == 1
                    && this.model[i - 1][j + 1] == 1
                    && this.model[i - 2][j] == 1
                    && this.model[i - 2][j + 1] == 1) {
                    this.model[i - 1][j] = 0;
                }
                if (
                    this.model[i][j] == 0
                    && this.model[i - 1][j] == 1
                    && this.model[i + 1][j] == 1
                    && this.model[i][j + 1] == 1
                    ) {
                    this.model[i][j + 1] = 0;
                }
                if (
                    this.model[i][j] == 0
                    && this.model[i - 1][j] == 1
                    && this.model[i + 1][j] == 1
                    && this.model[i][j - 1] == 1
                    ) {
                    this.model[i][j] = 1;
                }
                if (
                    this.model[i][j] == 0
                    && this.model[i][j + 1] == 1
                    && this.model[i + 1][j] == 1
                    && this.model[i][j - 1] == 1
                    && this.model[i - 2][j] == 0
                    ) {
                    this.model[i - 1][j] = 1;
                }
                if ( i == this.model.length - 3 && j != 1){
                    this.model[i][j] = 0;
                }
            }
            }
            tries++;
        }
    }

    // //Function that adds more blocks if possible
    // add_more() {
    //     let it_fits = false;
    //     let max_tries = 3;
    //     for (let i = 2; i < this.model.length - 2; i++) {
    //         for (let j = 2; j < this.model[i].length - 2; j++) {
    //             let block = new BLOCK;
    //             let tries = 0;
    //             it_fits = block.fits(this.model, i, j);
    //             while (!it_fits && tries < max_tries) {
    //                 block = new BLOCK;
    //                 it_fits = block.fits(this.model, i, j);
    //                 tries++;
    //             }
    //             if (it_fits) {
    //                 block.save_block(this.model, i, j);
    //             }
    //         }
    //     }
    // }

    //Main generating function
    generate_self() {
        this.generate_section_hz(1);
        this.generate_section_hz(2);
        this.generate_section_vert();
        this.generate_section_center();
        // this.add_more();
        this.fill_spaces();
        this.clear_paths();
        this.fill_spaces();
        test_draw(create_map(this.model));
        console.log(this.model);
    }
}
