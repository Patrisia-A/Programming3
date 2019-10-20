//! Requiring modules  --  START
var Grass = require("./modules/class.Grass.js");
var GrassEater = require("./modules/class.GrassEater.js");
var Gishatich = require("./modules/class.gishatich.js");
var Vorsord = require("./modules/class.vorsord.js");
var Hox = require("./modules/class.hox.js");
let random = require('./modules/random.js');
//! Requiring modules  --  END

//! Initializing global arrays  --  START
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
vorsordArr = [];
hoxArr = [];
matrix = [];
//! Initializing global arrays  --  END

// statistics start
grassHashiv = 0;
grasseaterHashiv = 0;
gishatichHashiv = 0;
vorsordHashiv = 0;
hoxHashiv = 0;
// statistics end

// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, grass, grasseater, gishatich, vorsord, hox) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grasseater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < vorsord; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < hox; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 25, 20, 15, 10, 2);
//! Creating MATRIX -- END

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grasseaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
                gishatichHashiv++
            }
            else if (matrix[y][x] == 4) {
                var vorsord = new Vorsord(x, y);
                vorsordArr.push(vorsord);
                vorsordHashiv++
            }
            else if (matrix[y][x] == 5) {
                var hox = new Hox(x, y);
                hoxArr.push(hox);
                hoxHashiv++
            }
        }
    }
}


creatingObjects();

let exanak = 0;

function game() {

    exanak++;
    if (exanak <= 10) {
        weather = "amar"
    }
    else if (exanak <= 20) {
        weather = "ashun"
    }
    else if (exanak <= 30) {
        exanak = "dzmer"
    }
    else if (exanak <= 40) {
        exanak = "garun"
    }
    else if (exanak > 40) {
        exanak = 0
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }
    if (vorsordArr[0] !== undefined) {
        for (var i in vorsordArr) {
            vorsordArr[i].eat();
        }
    }
    if (hoxArr[0] !== undefined) {
        for (var i in hoxArr) {
            hoxArr[i].mul();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        grasseaterCounter: grasseaterHashiv,
        grasseaterLiveCounter: grassEaterArr.length,
        gishatichCounter: gishatichHashiv,
        gishatichLiveCounter: gishatichArr.length,
        vorsordCounter: vorsordHashiv,
        vorsordLiveCounter: vorsordArr.length,
        hoxCounter: hoxHashiv,
        hoxLiveCounter: hoxArr.length,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)