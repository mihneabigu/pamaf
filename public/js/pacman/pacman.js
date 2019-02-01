var canvasy = document.getElementById("game");
var pixelSize = 20;

var globalVolume = 0.5

var coridor = [];

var MAP = get_random_map();

var multiplayerMap = [
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
    [5, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1, 5],
    [5, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 5],
    [5, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 5],
    [5, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 5],
    [5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 5],
    [5, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 5],
    [5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5],
    [5, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 5],
    [5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
    [5, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 5],
    [5, 1, 0, 0, 0, 1, 0, 0, 0, 0, 7, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5],
    [5, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 5],
    [5, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 5],
    [5, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 5],
    [5, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5],
    [5, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 5],
    [5, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 5],
    [5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
];

var map;
// canvasy.width = map[0].length * pixelSize + 250;
// canvasy.height = map.length * pixelSize;
// canvasy.width = 700
// canvasy.height = 550
var ctx = canvasy.getContext("2d");

var maxWidth = canvasy.width;
var maxHeight = canvasy.height;

// ctx.beginPath();
// ctx.arc(maxWidth / 2, maxHeight / 2, 30, 0, Math.PI * 2, false);
// ctx.stroke();
// ctx.closePath();

var imagesProfs = ["buraga.jpg", "masalagiu.jpeg", "tiplea.jpg", "varlan.jpeg"];


var changeAlpha = false;

var gameOver = false;



var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var PAUSE = 80;

var DIRECTIONS = [LEFT, UP, RIGHT, DOWN];

function Sound(src) {
    this.sound = new Audio();
    this.sound.src = src;

    this.play = function () {
        this.sound.volume = globalVolume;
        this.sound.play();
    }
    this.stop = function () {
        this.sound.volume = globalVolume;
        this.sound.pause();
    }
}

function Wall(x, y, size, i, j, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.i = i;
    this.j = j;
    this.type = type;

    this.draw = function () {
        ctx.beginPath();
        if (this.type == "wall") {
            ctx.fillStyle = "black";
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x + 2, this.y + 2, this.size - 2, this.size - 2);
        } else {
            ctx.fillStyle = "#CBF3D2";
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
        ctx.closePath();
    }
}

function Dot(x, y, radius, i, j, index, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.i = i;
    this.j = j;
    this.index = index;
    this.color = color;
    this.addOrNegate = 0.1;
    this.initialRadius = radius;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        if (this.color == "blue") {
            ctx.fillStyle = "white";
            ctx.fill();
            this.radius += this.addOrNegate;
            if (Math.floor(this.radius) == pixelSize / 2 - 2) {
                this.addOrNegate = -0.1;
            }
            if (Math.floor(this.radius) == this.initialRadius) {
                this.addOrNegate = 0.1;
            }
        } else {
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        ctx.closePath();

    }
}

function Ghost(x, y, dx, dy, radius, color, imgSrc) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.direction = RIGHT;
    this.initialX = x;
    this.initialY = y;
    this.initialDx = dx;
    this.initialDy = dy;
    this.initialDir = RIGHT;
    this.due = null;
    this.color = color;
    this.imgSrc = imgSrc;
    this.immune = true;

    this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.clip();
        var image = new Image();
        image.src = this.imgSrc;
        if (changeAlpha) {
            ctx.globalAlpha = 0.5;
        }
        ctx.drawImage(image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    this.reset = function () {
        this.x = this.initialX;
        this.y = this.initialY;
        this.dx = this.initialDx;
        this.dy = this.initialDy;
        this.direction = this.initialDir;
        this.due = null;
    }

    this.nextDue = function () {
        if (this.due == DOWN) {
            if (this.direction == RIGHT && map[Math.floor(this.y / pixelSize) + 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x + this.radius) / pixelSize) == (this.x + this.radius) / pixelSize ||
                this.direction == LEFT && map[Math.floor(this.y / pixelSize) + 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x - this.radius) / pixelSize) == (this.x - this.radius) / pixelSize
            ) {
                //console.log(this.x + " " + this.y);
                this.dy = 1;
                this.dx = 0;
                this.direction = this.due;
                //this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
            }
        }

        if (this.due == UP) {
            if (this.direction == RIGHT && map[Math.floor(this.y / pixelSize) - 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x + this.radius) / pixelSize) == (this.x + this.radius) / pixelSize ||
                this.direction == LEFT && map[Math.floor(this.y / pixelSize) - 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x - this.radius) / pixelSize) == (this.x - this.radius) / pixelSize
            ) {
                //console.log(this.x + " " + this.y);
                this.dy = -1;
                this.dx = 0;
                this.direction = this.due;
                //this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
            }
        }

        if (this.due == RIGHT) {
            if (this.direction == UP && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) + 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize ||
                this.direction == DOWN && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) + 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize
            ) {
                //console.log(this.x + " " + this.y);
                this.dy = 0;
                this.dx = 1;
                this.direction = this.due;
                //this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
            }
        }

        if (this.due == LEFT) {
            if (this.direction == UP && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) - 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize ||
                this.direction == DOWN && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) - 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize
            ) {
                //console.log(this.x + " " + this.y);
                this.dy = 0;
                this.dx = -1;
                this.direction = this.due;
                //this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
            }
        }
    }

    this.changeDirection = function () {
        if (this.due != null) {
            if (this.due == LEFT && this.direction == RIGHT) {
                while (this.due == LEFT) {
                    this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
                }
            } else if (this.due == RIGHT && this.direction == LEFT) {
                while (this.due == RIGHT) {
                    this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
                }
            } else if (this.due == UP && this.direction == DOWN) {
                while (this.due == UP) {
                    this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
                }
            } else if (this.due == DOWN && this.direction == UP) {
                while (this.due == DOWN) {
                    this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
                }
            } else {
                this.nextDue();
            }
        }
    }

    this.wallCollision = function () {
        if (this.direction == RIGHT && map[Math.floor(this.y / pixelSize)][Math.floor(this.x + this.radius) / pixelSize] == 1) {
            this.dx = 0;
        }

        if (this.direction == LEFT && map[Math.floor(this.y / pixelSize)][Math.floor(this.x - this.radius) / pixelSize - 1] == 1) {
            this.dx = 0;
        }

        if (this.direction == UP && map[Math.floor((this.y + this.radius + this.dy) / pixelSize) - 1][Math.floor(this.x / pixelSize)] == 1) {
            this.dy = 0;
        }

        if (this.direction == DOWN && map[Math.floor((this.y - this.radius) / pixelSize) + 1][Math.floor(this.x / pixelSize)] == 1) {
            this.dy = 0;
        }
    }

    this.portalCollision = function () {
        if (this.direction == RIGHT && this.x + this.radius == map[0].length * pixelSize) {
            this.x = pixelSize / 2;
        }
        if (this.direction == LEFT && this.x == pixelSize / 2) {
            this.x = map[0].length * pixelSize - pixelSize / 2;
        }
    }

    this.checkIfStopped = function () {
        if (this.dx == 0 && this.dy == 0) {
            this.due = DIRECTIONS[Math.floor(Math.random() * 4)];
        }
    }

    this.checkIntersection = function () {
        if (this.direction == RIGHT && (this.x - this.radius) / pixelSize == Math.floor((this.x - this.radius) / pixelSize)) {
            let count = 0;
            let up = 0;
            let down = 0;
            let canGoOn = true;
            if (map[Math.floor(this.y / pixelSize) - 1][Math.floor((this.x - this.radius) / pixelSize)] == 0) {
                count += 1;
                up = UP;
            }
            if (map[Math.floor(this.y / pixelSize) + 1][Math.floor((this.x - this.radius) / pixelSize)] == 0) {
                count += 1;
                down = DOWN;
            }
            if (map[Math.floor(this.y / pixelSize)][Math.floor((this.x + this.radius) / pixelSize)] == 1) {
                canGoOn = false;
            }
            if (count > 0) {
                let posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                while (posdir == LEFT || posdir == UP && up == 0 || posdir == DOWN && down == 0 || posdir == RIGHT && canGoOn == false) {
                    posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                }
                if (this.due != posdir) {
                    this.due = posdir;
                }
            }
        }

        if (this.direction == LEFT && (this.x - this.radius) / pixelSize == Math.floor((this.x - this.radius) / pixelSize)) {
            let count = 0;
            let up = 0;
            let down = 0;
            let canGoOn = true;
            if (map[Math.floor(this.y / pixelSize) - 1][Math.floor((this.x - this.radius) / pixelSize)] == 0) {
                count += 1;
                up = UP;
            }
            if (map[Math.floor(this.y / pixelSize) + 1][Math.floor((this.x - this.radius) / pixelSize)] == 0) {
                count += 1;
                down = DOWN;
            }
            if (map[Math.floor(this.y / pixelSize)][Math.floor((this.x - this.radius) / pixelSize) - 1] == 1) {
                canGoOn = false;
            }
            if (count > 0) {

                let posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                while (posdir == RIGHT || posdir == UP && up == 0 || posdir == DOWN && down == 0 || posdir == LEFT && canGoOn == false) {
                    posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                }
                if (this.due != posdir) {
                    this.due = posdir;
                }
            }
        }

        if (this.direction == UP && (this.y + this.radius) / pixelSize == Math.floor((this.y + this.radius) / pixelSize)) {
            let count = 0;
            let right = 0;
            let left = 0;
            let canGoOn = true;
            if (map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor((this.x) / pixelSize) + 1] == 0) {
                count += 1;
                right = RIGHT;
            }
            if (map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor((this.x) / pixelSize) - 1] == 0) {
                count += 1;
                left = LEFT;
            }
            if (map[Math.floor((this.y - this.radius) / pixelSize - 1)][Math.floor(this.x / pixelSize)] == 1) {
                canGoOn = false;
            }
            if (count > 0) {
                let posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                while (posdir == DOWN || posdir == RIGHT && right == 0 || posdir == LEFT && left == 0 || posdir == UP && canGoOn == false) {
                    posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                }
                if (this.due != posdir) {
                    this.due = posdir;
                }

            }
        }

        if (this.direction == DOWN && (this.y - this.radius) / pixelSize == Math.floor((this.y - this.radius) / pixelSize)) {
            let count = 0;
            let right = 0;
            let left = 0;
            let canGoOn = true;
            if (map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor((this.x) / pixelSize) + 1] == 0) {
                count += 1;
                right = RIGHT;
            }
            if (map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor((this.x) / pixelSize) - 1] == 0) {
                count += 1;
                left = LEFT;
            }
            if (map[Math.floor((this.y - this.radius) / pixelSize + 1)][Math.floor(this.x / pixelSize)] == 1) {
                canGoOn = false;
            }
            if (count > 0) {
                let posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                while (posdir == UP || posdir == RIGHT && right == 0 || posdir == LEFT && left == 0 || posdir == DOWN && canGoOn == false) {
                    posdir = DIRECTIONS[Math.floor(Math.random() * 4)];
                }

                if (this.due != posdir) {
                    this.due = posdir;
                }
            }
        }


    }

    this.update = function () {


        //this.checkIfStopped();
        this.checkIntersection();
        //this.changeDirection();
        //this.wallCollision();
        this.nextDue();
        this.portalCollision();


        this.draw();
        this.x += this.dx;
        this.y += this.dy;
    }
}

var sendImmuneStatus = false;

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}

function drawCirclePower(frames, second) {
    ctx.beginPath();
    ctx.arc(480, 170, 30, degToRad(270), degToRad((frames * 1.2) - 90));
    ctx.strokeStyle = '#28d1fa';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.font = "20px Helvetica";
    ctx.fillStyle = '#28d1fa';
    ctx.fillText(second, 480, 170);
    ctx.stroke();
    ctx.lineWidth = 1;
}

function Player(x, y, dx, dy, radius, isGhost, image) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.dx = dx;
    this.dy = dy;
    this.initialDx = dx;
    this.initialDy = dy;
    this.radius = radius;
    this.direction = RIGHT;
    this.initialDir = this.direction;
    this.due = null;
    this.score = 0;
    this.lives = 3;
    this.inPortal = false;
    this.power = false;
    this.frameCount = 0;
    this.beforeDx = 0;
    this.beforeDy = 0;
    this.isGhost = isGhost;
    this.immune = true;
    this.image = image;
    this.phantomKills = 0;

    this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.clip();

        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    this.reset = function () {
        this.x = this.initialX;
        this.y = this.initialY;
        this.dx = this.initialDx;
        this.dy = this.initialDy;
        this.direction = this.initialDir;
        this.due = null;
    }

    this.nextDue = function () {
        if (this.due == DOWN) {
            if (this.direction == RIGHT && map[Math.floor(this.y / pixelSize) + 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x + this.radius) / pixelSize) == (this.x + this.radius) / pixelSize ||
                this.direction == LEFT && map[Math.floor(this.y / pixelSize) + 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x - this.radius) / pixelSize) == (this.x - this.radius) / pixelSize
            ) {
                console.log(this.x + " " + this.y);
                this.dy = playerSpeed;
                this.dx = 0;
                this.direction = this.due;
                this.due = null;
            }
        }

        if (this.due == UP) {
            if (this.direction == RIGHT && map[Math.floor(this.y / pixelSize) - 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x + this.radius) / pixelSize) == (this.x + this.radius) / pixelSize ||
                this.direction == LEFT && map[Math.floor(this.y / pixelSize) - 1][Math.floor((this.x - this.radius) / pixelSize)] == 0 && Math.floor((this.x - this.radius) / pixelSize) == (this.x - this.radius) / pixelSize
            ) {
                console.log(this.x + " " + this.y);
                this.dy = -playerSpeed;
                this.dx = 0;
                this.direction = this.due;
                this.due = null;
            }
        }

        if (this.due == RIGHT) {
            if (this.direction == UP && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) + 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize ||
                this.direction == DOWN && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) + 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize
            ) {
                console.log(this.x + " " + this.y);
                this.dy = 0;
                this.dx = playerSpeed;
                this.direction = this.due;
                this.due = null;
            }
        }

        if (this.due == LEFT) {
            if (this.direction == UP && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) - 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize ||
                this.direction == DOWN && map[Math.floor((this.y - this.radius) / pixelSize)][Math.floor(this.x / pixelSize) - 1] == 0 && Math.floor((this.y + this.radius) / pixelSize) == (this.y + this.radius) / pixelSize
            ) {
                console.log(this.x + " " + this.y);
                this.dy = 0;
                this.dx = -playerSpeed;
                this.direction = this.due;
                this.due = null;
            }
        }
    }

    this.changeDirection = function () {
        if (this.due != null) {
            if (this.due == LEFT && this.direction == RIGHT) {
                this.direction = this.due;
                this.dx = -playerSpeed;
                this.dy = 0;
                this.due = null;
            } else if (this.due == RIGHT && this.direction == LEFT) {
                this.direction = this.due;
                this.dx = playerSpeed;
                this.dy = 0;
                this.due = null;
            } else if (this.due == UP && this.direction == DOWN) {
                this.direction = this.due;
                this.dx = 0;
                this.dy = -playerSpeed;
                this.due = null;
            } else if (this.due == DOWN && this.direction == UP) {
                this.direction = this.due;
                this.dx = 0;
                this.dy = playerSpeed;
                this.due = null;
            } else {
                this.nextDue();
            }
        }
    }

    this.dotCollision = function () {
        for (let i = 0; i < dots.length; i++) {
            let distance = Math.sqrt((this.x - dots[i].x) ** 2 + (this.y - dots[i].y) ** 2);
            if (distance <= (this.radius + dots[i].radius)) {
                if (dots[i].color == "blue") {
                    console.log("POWER ON");
                    this.power = true;
                    changeAlpha = true;
                    playerSpeed = 2;
                    this.frameCount = 0;
                    this.score += 300;
                    canPlayDotSound = false;
                    for (let j = 0; j < ghosts.length; j++) {
                        ghosts[j].immune = false;
                    }
                    let eating = new Sound("./audio/eatpill.mp3");
                    eating.play();
                    sendImmuneStatus = true;
                } else {
                    this.score += 100;
                    if (canPlayDotSound) {
                        let eating = new Sound("./audio/eating.short.mp3");
                        eating.play();
                    }
                }
                for (let j = dots[i].index + 1; j < dots.length; j++) {
                    dots[j].index -= 1;
                }

                dots.splice(dots[i].index, 1);
                i--;
                if (dots.length == 0) {
                    gameOver = true;
                    onHallway = false;
                    initHallway();
                    break;
                }
            }
        }
    }

    this.wallCollision = function () {
        if (this.direction == RIGHT && map[Math.floor(this.y / pixelSize)][Math.floor(this.x + this.radius) / pixelSize] == 1) {
            this.dx = 0;
        }

        if (this.direction == LEFT && map[Math.floor(this.y / pixelSize)][Math.floor(this.x - this.radius) / pixelSize - 1] == 1) {
            this.dx = 0;
        }

        if (this.direction == UP && map[Math.floor((this.y + this.radius + this.dy) / pixelSize) - 1][Math.floor(this.x / pixelSize)] == 1) {
            this.dy = 0;
        }

        if (this.direction == DOWN && map[Math.floor((this.y - this.radius) / pixelSize) + 1][Math.floor(this.x / pixelSize)] == 1) {
            this.dy = 0;
        }
    }

    this.portalCollision = function () {
        if (onHallway) {
            if (coridor[Math.floor(this.y / pixelSize)][Math.floor(this.x / pixelSize)] == 3) {
                onHallway = false;
                initPacman();
            }
        } else {
            if (this.direction == RIGHT && this.x + this.radius == map[0].length * pixelSize) {
                this.x = pixelSize / 2;
            }
            if (this.direction == LEFT && this.x == pixelSize / 2) {
                this.x = map[0].length * pixelSize - pixelSize / 2;
            }
        }

    }

    this.ghostCollision = function () {
        //console.log("Sunt in ghost collision");
        for (let i = 0; i < ghosts.length; i++) {
            let distance = Math.sqrt((this.x - ghosts[i].x) ** 2 + (this.y - ghosts[i].y) ** 2);
            //console.log(distance);
            if (distance <= (this.radius + ghosts[i].radius)) {
                if (this.power == true && ghosts[i].immune == false) {
                    let eatingGhost = new Sound("./audio/eatghost.mp3");
                    eatingGhost.play();
                    this.score += 200;
                    this.phantomKills += 1;
                    ghosts[i].immune = true;
                    ghosts[i].reset();
                } else if (this.power == true) {;
                } else {
                    console.log("AM RESETAT")

                    this.lives -= 1;

                    if (this.lives == 0) {
                        gameOver = true;
                        onHallway = false;
                        
                        break;
                    }
                    isDead = true;
                    firstTimeCountDown = true;

                    break;
                }
            }
        }
    }

    this.powerFunction = function () {
        if (this.power == true) {
            chasingSong.play();
            this.frameCount += 1;
            drawCirclePower(this.frameCount, 5 - Math.floor(this.frameCount / 60));
        }
        if (this.frameCount == 300) {
            drawCirclePower(this.frameCount, 0);
            this.power = false;
            changeAlpha = false;
            playerSpeed = 1;
            canPlayDotSound = true;
            this.frameCount = 0;
            sendImmuneStatus = false;
            console.log("POWER OFF");
        }
    }

    this.collisionWithOtherPlayer = function () {
        let distance = Math.sqrt((this.x - otherPlayer.x) ** 2 + (this.y - otherPlayer.y) ** 2);
        if (distance <= (this.radius + otherPlayer.radius)) {
            if (this.isGhost) {
                if (this.immune) {
                    this.score += 2000;
                    otherPlayer.lives -= 1;
                    if (otherPlayer.lives == 0) {
                        gameOver = true;
                        return;
                    }
                    isDead = true;
                    firstTimeCountDown = true;
                } else {
                    this.immune = true;
                    this.reset();
                }
            } else {
                if (this.power == true && otherPlayer.immune == false) {
                    let eatingGhost = new Sound("./audio/eatghost.mp3");
                    eatingGhost.play();
                    this.score += 200;
                    sendImmuneStatus = false;
                } else if (this.power == true) {;
                } else {
                    this.lives -= 1;
                    //isDead = true;
                    if (this.lives == 0) {
                        gameOver = true;
                        return;
                    }
                    firstTimeCountDown = true;
                    this.reset();

                }
            }
        }
    }

    this.update = function () {


        this.changeDirection();

        this.wallCollision();
        this.portalCollision();
        this.ghostCollision();
        if (!this.isGhost) {
            this.dotCollision();
            this.powerFunction();
        }

        if (isMultiplayer) {
            this.collisionWithOtherPlayer();
        }


        if (!firstTimeCountDown) {
            this.draw();
            this.x += this.dx;
            this.y += this.dy;
        }
    }
}

function MultiplayerPlayer(x, y, radius, image) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.immune = true;
    this.lives = 3;
    this.image = image;

    this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.clip();

        ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.globalAlpha = 1;
        ctx.restore();
    }
}
var playerSpeed = 1;
var circle;
var otherPlayer;

let dots = [];
let walls = [];
let ghosts = [];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var onHallway = true;

function initHallway() {
    coridor = JSON.parse(JSON.stringify(HALLWAYS[yearPacman - 1]));
    map = coridor.slice();
    console.log(map);
    dots = [];
    walls = [];
    ghosts = [];
    circle = "";
    firstTimeCountDown = false;
    if (yearPacman == 1) {
        ctx.scale(3, 3);
    }
    if (yearPacman == 2) {
        ctx.scale(1.2, 1.2);
    }
    if (yearPacman == 3) {
        ctx.scale(2, 2);
    }
    for (let i = 0; i < coridor.length; i++) {
        for (let j = 0; j < coridor[i].length; j++) {
            if (coridor[i][j] == 5 || coridor[i][j] == 3) {
                let wall = new Wall(j * pixelSize, i * pixelSize, pixelSize, i, j, "portal");
                walls.push(wall);
            }
            if (coridor[i][j] == 1) {
                let wall = new Wall(j * pixelSize, i * pixelSize, pixelSize, i, j, "wall");
                walls.push(wall);
            }
            if (coridor[i][j] == 7) {
                circle = new Player(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, playerSpeed, 0, pixelSize / 2, false, playerImage);
                coridor[i][j] = 0;
            }
        }
    }
}

function initPacman() {
    dots = []
    walls = []
    ghosts = []
    firstTimeCountDown = true;
    //map = MAP.slice();
    map = JSON.parse(JSON.stringify(MAP));
    if (yearPacman == 1) {
        ctx.scale(0.44, 0.44);
    }
    if (yearPacman == 2) {
        ctx.scale(1.11, 1.11);
    }
    if (yearPacman == 3) {
        ctx.scale(0.67, 0.67);
    }

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 5) {
                let wall = new Wall(j * pixelSize, i * pixelSize, pixelSize, i, j, "portal");
                walls.push(wall);
            }
            if (map[i][j] == 1) {
                let wall = new Wall(j * pixelSize, i * pixelSize, pixelSize, i, j, "wall");
                walls.push(wall);
            }
            if (map[i][j] == 0) {
                let dot = new Dot(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, 3, i, j, dots.length, "white");
                dots.push(dot);
            }
            if (map[i][j] == 2) {
                let dot = new Dot(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, 3, i, j, dots.length, "blue");
                dots.push(dot);
                map[i][j] = 0;
            }
            if (map[i][j] == 10) {
                for (let k = 0; k < 4; k++) {
                    let ghost = new Ghost(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, 1, 0, pixelSize / 2, getRandomColor(), imagesProfs[k]);
                    ghosts.push(ghost);
                }
                let dot = new Dot(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, 3, i, j, dots.length, "white");
                dots.push(dot);
                map[i][j] = 0;
            }
            if (map[i][j] == 7) {
                circle = new Player(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, playerSpeed, 0, pixelSize / 2, false, playerImage);
                map[i][j] = 0;
            }
        }
    }
}

var creator = true;

var playerImage = "";
var otherPlayerImage = "";
var yearPacman = 1;

function initMultiplayer() {
    dots = []
    walls = []
    ghosts = []

    //map = MAP.slice();
    map = JSON.parse(JSON.stringify(multiplayerMap));
    

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 5) {
                let wall = new Wall(j * pixelSize, i * pixelSize, pixelSize, i, j, "portal");
                walls.push(wall);
            }
            if (map[i][j] == 1) {
                let wall = new Wall(j * pixelSize, i * pixelSize, pixelSize, i, j, "wall");
                walls.push(wall);
            }
            if (map[i][j] == 0) {
                let dot = new Dot(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, 3, i, j, dots.length, "white");
                dots.push(dot);
            }
            if (map[i][j] == 2) {
                let dot = new Dot(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, 3, i, j, dots.length, "blue");
                dots.push(dot);
                map[i][j] = 0;
            }
            if (map[i][j] == 10) {
                if (!creator) {
                    circle = new Player(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, playerSpeed, 0, pixelSize / 2, true, playerImage);
                    otherPlayer = new MultiplayerPlayer(0, 0, pixelSize / 2, otherPlayerImage);
                }
                let dot = new Dot(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, 3, i, j, dots.length, "white");
                dots.push(dot);
                map[i][j] = 0;
            }
            if (map[i][j] == 7) {
                if (creator) {
                    circle = new Player(j * pixelSize + pixelSize / 2, i * pixelSize + pixelSize / 2, playerSpeed, 0, pixelSize / 2, false, playerImage);
                    otherPlayer = new MultiplayerPlayer(0, 0, pixelSize / 2, otherPlayerImage);
                }
                map[i][j] = 0;
            }
        }
    }
}

var dotsObject = [];

function draw_map() {
    // body...
    walls.forEach(function (wall) {
        // statements
        wall.draw();
    });


    dots.forEach(function (dot) {
        // body...
        dot.draw();
    })


    if (!onHallway) {
        ctx.font = "15px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("SCORE: " + circle.score, 475, 60);

        ctx.font = "15px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("LIVES: " + circle.lives, 475, 120);
    }
}

function draw_margin() {
    walls.forEach(function (wall) {
        if (wall.type == "portal") {
            wall.draw();
        }
    });
}


var firstTimeCountDown = true;
var framesCountDown = 0;

var isGamePaused = false;

var requestID = undefined;

function countDown() {
    ctx.clearRect(0, 0, maxWidth, maxHeight);
    openingSong.play();
    if (framesCountDown < 60) {
        ctx.font = "30px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("3", maxWidth / 2 - 90, maxHeight / 2 - 90);
        framesCountDown += 1;
        return;
    }
    ctx.clearRect(0, 0, maxWidth, maxHeight);
    if (framesCountDown < 120) {
        ctx.font = "30px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("2", maxWidth / 2 - 90, maxHeight / 2 - 90);
        framesCountDown += 1;
        return;
    }
    ctx.clearRect(0, 0, maxWidth, maxHeight);
    if (framesCountDown < 180) {
        ctx.font = "30px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("1", maxWidth / 2 - 90, maxHeight / 2 - 90);
        framesCountDown += 1;
        return;
    }
    ctx.clearRect(0, 0, maxWidth, maxHeight);
    if (framesCountDown < 240) {
        ctx.font = "30px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("GO", maxWidth / 2 - 90, maxHeight / 2 - 90);
        framesCountDown += 1;
        return;
    } else {
        firstTimeCountDown = false;
        framesCountDown = 0;
    }
}




var openingSong = new Sound("./audio/opening_song.mp3");
var chasingSong = new Sound("./audio/siren.mp3");
var dieSong = new Sound("./audio/die.mp3");
var canPlayDotSound = true;

var frameDead = 0;
var isDead = false;

var isMultiplayer = false;

/*function animate() {
    requestID = requestAnimationFrame(animate);
    if (isDead) {
        if (frameDead < 120) {
            ctx.clearRect(0, 0, maxWidth, maxHeight);
            draw_map();
            circle.draw();
            for (let j = 0; j < ghosts.length; j++) {
                ghosts[j].draw();
            }
            dieSong.play();
            frameDead += 1;
        } else {
            frameDead = 0;
            isDead = false;
            circle.reset();
            for (let j = 0; j < ghosts.length; j++) {
                ghosts[j].reset();
            }
        }
    } else if (firstTimeCountDown) {
        countDown();
    } else if (isGamePaused) {
        ctx.clearRect(0, 0, maxWidth, maxHeight);
        ctx.font = "30px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("GAME PAUSED", maxWidth / 2 - 15, maxHeight / 2 - 15);
    } else if (gameOver) {
        ctx.clearRect(0, 0, maxWidth, maxHeight);
        ctx.font = "30px Consolas";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER", maxWidth / 2 - 15, maxHeight / 2 - 15);
        //cancelAnimationFrame(requestID);
    } else {
        ctx.clearRect(0, 0, maxWidth, maxHeight);
        draw_map();
        circle.update();
        if (!firstTimeCountDown) {
            ghosts.forEach(function (ghost) {
                ghost.update();
            });
            draw_margin();
        }
    }
}*/
var inGame = true

window.onkeydown = function (event) {
    //event.preventDefault();
    if (event.keyCode == LEFT) {
        event.preventDefault();
        circle.due = LEFT;
    }

    if (event.keyCode == RIGHT) {
        event.preventDefault();
        circle.due = RIGHT;
    }

    if (event.keyCode == UP) {
        event.preventDefault();
        circle.due = UP;
    }

    if (event.keyCode == DOWN) {
        event.preventDefault();
        circle.due = DOWN;
    }

    if (event.keyCode == PAUSE) {
        event.preventDefault();
        isGamePaused = !isGamePaused;
    }

    //return event.keyCode;
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    evt.preventDefault();
    return evt.touches || // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    evt.preventDefault();
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    evt.preventDefault();
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            circle.due = LEFT;
        } else {
            /* right swipe */
            circle.due = RIGHT;
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
            circle.due = UP;
        } else {
            /* down swipe */
            circle.due = DOWN;
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};


//sound.play();



//animate();
