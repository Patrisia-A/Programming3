let matrix = [];
let side = 20;
let grassArr = [];
let grassEaterArr = [];
let gishatichArr =[];
let vorsordArr =[];
let hoxArr = [];

function setup() {
    matrixGenerator(30, 100, 200, 30,20,1);
    frameRate(8);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            if (matrix[y][x] == 3) {
                let gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
            }
            if (matrix[y][x] == 4) {
                let vorsord = new Vorsord(x, y);
                vorsordArr.push(vorsord);
            }
            if (matrix[y][x] == 5 ){
                let hox = new Hox(x, y);
                hoxArr.push(hox);
            }
        }
    }
    function matrixGenerator(matrixSize, grass, grassEater,gishatich,vorsord,hox) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = [];
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grass; i++) {
            let customX = Math.floor(random(0, matrixSize)); // 0 - 49
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 1;
        }
        for (let i = 0; i < grassEater; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 2;
        }
        for (let i = 0; i < gishatich; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 3;
        }
        for (let i = 0; i < vorsord; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 4;
        }
        for (let i = 0; i < hox; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 5;
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("orange");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("beige");
            }
            rect(x * side, y * side, side, side);
        }
    }

    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in grassArr) {
        grassArr[i].mul(); //80
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }

    for (var i in vorsordArr) {
        vorsordArr[i].eat();
    }
    for (var i in hoxArr) {
        hoxArr[i].mul();
    }
   
}
