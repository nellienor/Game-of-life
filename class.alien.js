class Alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 60;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        let arr = [];

        for (let index = 0; index < this.directions.length; index++) {
            let x = this.directions[index][0];
            let y = this.directions[index][1];

            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == char) {
                    arr.push(this.directions[index])
                }
            }

        }

        return arr;
    }
    getNewDirections(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < alienArr.length; index++) {
            if (alienArr[index].x == this.x && alienArr[index].y == this.y) {
                alienArr.splice(index, 1)
            }
        }
    }
    kill() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(3));
        if (newCell) {
            this.energy += 40;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < predatorArr.length; index++) {
                if (predatorArr[index].x == x && predatorArr[index].y == y) {
                    predatorArr.splice(index, 1);
                    let f = new GrassEater(x, y);
                    grassEaterArr.push(f);
                }
            }
    
            if(this.energy >65){
                this.move()
            }
        }
        else { this.move() }
    }
    
   
    
    move(){
        this.energy--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (newCell && this.energy < 0){
            this.die();
        }
        if (this.energy < 0){
            this.die();
        }

    }
}

