var LiveForm = require("./LiveForm");
var random = require("./random.js");


module.exports = class Vorsord extends LiveForm {
    constructor(x, y) {
        super(x,y);
        this.energy1 = 5;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    eat() {
        let emptyCells = this.chooseCell(2);
        let emptyCells0 = this.chooseCell(3);
        let utel = emptyCells.concat(emptyCells0)
        let newCell = random(utel);

        if (newCell) {
            this.energy1++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in gishatichArr) {
                if (gishatichArr[i].x == x && gishatichArr[i].y == y) {
                    gishatichArr.splice(i, 1)
                }
                
            }
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
                
            }



            this.x = x;
            this.y = y;


        } else {
            this.move()
        }
    }
    move() {
        this.energy1--;

        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let emptyCells2 = this.chooseCell(5);
        let qayl = emptyCells.concat(emptyCells1.concat(emptyCells2));
        let newCell = random(qayl);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }

    }
}