// let matrix = [];
// let side = 20;
// let grassArr = [];
// let grassEaterArr = [];
// let gishatichArr =[];
// let vorsordArr =[];
// let hoxArr = [];

// function setup() {
//     matrixGenerator(30, 100, 200, 30,20,1);
//     frameRate(8);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('#acacac');
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 let grass = new Grass(x, y);
//                 grassArr.push(grass);
//             }
//             if (matrix[y][x] == 2) {
//                 let grassEater = new GrassEater(x, y);
//                 grassEaterArr.push(grassEater);
//             }
//             if (matrix[y][x] == 3) {
//                 let gishatich = new Gishatich(x, y);
//                 gishatichArr.push(gishatich);
//             }
//             if (matrix[y][x] == 4) {
//                 let vorsord = new Vorsord(x, y);
//                 vorsordArr.push(vorsord);
//             }
//             if (matrix[y][x] == 5 ){
//                 let hox = new Hox(x, y);
//                 hoxArr.push(hox);
//             }
//         }
//     }
//     function matrixGenerator(matrixSize, grass, grassEater,gishatich,vorsord,hox) {
//         for (let i = 0; i < matrixSize; i++) {
//             matrix[i] = [];
//             for (let o = 0; o < matrixSize; o++) {
//                 matrix[i][o] = 0;
//             }
//         }
//         for (let i = 0; i < grass; i++) {
//             let customX = Math.floor(random(0, matrixSize)); // 0 - 49
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 1;
//         }
//         for (let i = 0; i < grassEater; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 2;
//         }
//         for (let i = 0; i < gishatich; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 3;
//         }
//         for (let i = 0; i < vorsord; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 4;
//         }
//         for (let i = 0; i < hox; i++) {
//             let customX = Math.floor(random(0, matrixSize));
//             let customY = Math.floor(random(0, matrixSize));
//             matrix[customY][customX] = 5;
//         }
//     }
// }

// function draw() {
//     for (var y = 0; y < matrix.length; y++) {
//         for (var x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 fill("green");
//             }
//             else if (matrix[y][x] == 0) {
//                 fill("#acacac");
//             }
//             else if (matrix[y][x] == 2) {
//                 fill("orange");
//             }
//             else if (matrix[y][x] == 3) {
//                 fill("red");
//             }
//             else if (matrix[y][x] == 4) {
//                 fill("blue");
//             }
//             else if (matrix[y][x] == 5) {
//                 fill("beige");
//             }
//             rect(x * side, y * side, side, side);
//         }
//     }

//     //յուրաքանչյուր խոտ փորձում է բազմանալ
//     for (var i in grassArr) {
//         grassArr[i].mul(); //80
//     }

//     for (var i in grassEaterArr) {
//         grassEaterArr[i].eat();
//     }

//     for (var i in gishatichArr) {
//         gishatichArr[i].eat();
//     }

//     for (var i in vorsordArr) {
//         vorsordArr[i].eat();
//     }
//     for (var i in hoxArr) {
//         hoxArr[i].mul();
//     }
   
// }


function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let weatherElement = document.getElementById('weather');
    
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');

    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');

    let gishatichCountElement = document.getElementById('gishatichCount');
    let gishatichLiveCountElement = document.getElementById('gishatichLiveCount');

    let vorsordCountElement = document.getElementById('vorsordCount');
    let vorsordLiveCountElement = document.getElementById('vorsordLiveCount');

    let hoxCountElement = document.getElementById('hoxCount');
    let hoxLiveCountElement = document.getElementById('hoxLiveCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 
    socket.on("data", drawCreatures);
    function drawCreatures(data) {
        // let sendData = {
        //     matrix: matrix,
        //     grassCounter: grassHashiv,
        //     grassLiveCounter: grassArr.length,
        //     eatCounter: eatHashiv,
        //     huntCounter: huntHashiv,
        //     termCounter: termHashiv,
        //     titanCounter: titanHashiv,
        //     weather: weather
        // }

        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weatherElement.innerText = data.weather;
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        grassEaterCountElement.innerText = data.grasseaterCounter;
        grassEaterLiveCountElement.innerText = data.grasseaterLiveCounter;
        gishatichCountElement.innerText = data.gishatichCounter;
        gishatichLiveCountElement.innerText = data.gishatichLiveCounter;
        vorsordCountElement.innerText = data.vorsordCounter;
        vorsordLiveCountElement.innerText = data.vorsordLiveCounter;
        hoxCountElement.innerText = data.hoxCounter;
        hoxLiveCountElement.innerText = data.hoxLiveCounter;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == "amar") {
                        fill("green");
                    }
                    else if (data.weather == "ashun") {
                        fill("gold");
                    }
                    else if (data.weather == "dzmer") {
                        fill("white");
                    }
                    else if (data.weather == "garun") {
                        fill("darkgreen");
                    }
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 5) {
                    fill('beige');
                    rect(j * side, i * side, side, side);
                }
                else if (matrix[i][j] == 6) {
                    fill('#e54444');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}
