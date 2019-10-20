var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Hox extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.kyanq= 2
    }
    getNewCoordinates() {
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
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }
    mul() {
    this.kyanq++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.kyanq>=8) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;

            let hox = new Hox(x, y);
            hoxArr.push(hox);

            this.kyanq= 5;
        }
    }
}