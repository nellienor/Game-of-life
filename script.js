let matrix = [];
let side = 10;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let hunterArr = [];
let alienArr = [];



function setup() {
    matrixGenerator(50, 1500, 50, 15,3,1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#BFBFBF');
    frameRate(5);
    noStroke()

    function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, hunterCount,alienCount) {
        for (let index = 0; index < matrixSize; index++) {
            matrix[index] = [];
            for (let i = 0; i < matrixSize; i++) {
                matrix[index][i] = 0;
            }
        }
        for (let index = 0; index < grassCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 1;
        }
        for (let index = 0; index < grassEaterCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 2;
        }
        for (let index = 0; index < predatorCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 3;
        }
        for (let index = 0; index < hunterCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 4;
        }
        for (let index = 0; index < alienCount; index++) {
            let x = Math.floor(random(0, matrixSize));
            let y = Math.floor(random(0, matrixSize));
            matrix[y][x] = 5;
        }
    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                let hunter = new Hunter(x, y);
                hunterArr.push(hunter);
            }
            else if (matrix[y][x] == 5) {
                let alien = new Alien(x, y);
                alienArr.push(alien);
            }
        }
    }

}

function draw() {

    for (let y = 0; y < matrix.length; y++) {
        const element = matrix[y];
        for (let x = 0; x < element.length; x++) {

            if (matrix[y][x] == 1) {
                fill('#3C8A41');
                rect(x * side, y * side, side, side,side/4)
            }
            else if (matrix[y][x] == 2) {
                fill('#E1B200');
                rect(x * side, y * side, side, side,side/4)
                
            }
            else if (matrix[y][x] == 3) {
                fill('#7E6400');
                rect(x * side, y * side, side, side,side/4)
            }
            else if (matrix[y][x] == 4) {
                fill('#B74D11');
                ellipse(x * side, y * side, side+4, side+4)
              
            }
            else if (matrix[y][x] == 5) {
                fill('#15438E');
                ellipse(x * side, y * side, side+8, side+5)
              
            }
            else {
                fill('#BFBFBF');
                rect(x * side, y * side, side, side,side/4)
            }
           
        }
    }
    for (let index = 0; index < grassArr.length; index++) {
        grassArr[index].mul();
    }
    for (let index = 0; index < grassEaterArr.length; index++) {
        grassEaterArr[index].eat();
    }
    for (let index = 0; index < predatorArr.length; index++) {
        predatorArr[index].eat();
    }
    for (let index = 0; index <  hunterArr.length; index++) {
        hunterArr[index].kill();
    }
    for (let index = 0; index <  alienArr.length; index++) {
        alienArr[index].kill();
    }
}