var LivingCreature = require("./livingCreature");
var random = require("./random");

module.exports = class Grass extends LivingCreature {
 
    mul() {
        this.life++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if (newCell && this.life > 10) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.life = 0;
        }
    }
}

