//modules
var Grass = require("./modules/grass");
var GrassEater = require("./modules/grasseater");
var Hunter = require("./modules/hunter");
var Predator = require("./modules/predator");
var Alien = require("./modules/alien");
let random = require('./modules/random');

//global arrays
matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
alienArr = [];

weath = "spring";

//matrixgenerator
function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, hunterCount,alienCount) {
   for (let index = 0; index < matrixSize; index++) {
       matrix[index] = [];
       for (let i = 0; i < matrixSize; i++) {
           matrix[index][i] = 0;
       }
   }
   for (let index = 0; index < grassCount; index++) {
       let x = Math.floor(random(matrixSize));
       let y = Math.floor(random(matrixSize));
       matrix[y][x] = 1;
   }
   for (let index = 0; index < grassEaterCount; index++) {
       let x = Math.floor(random(matrixSize));
       let y = Math.floor(random(matrixSize));
       matrix[y][x] = 2;
   }
   for (let index = 0; index < predatorCount; index++) {
       let x = Math.floor(random(matrixSize));
       let y = Math.floor(random(matrixSize));
       matrix[y][x] = 3;
   }
   for (let index = 0; index < hunterCount; index++) {
       let x = Math.floor(random(matrixSize));
       let y = Math.floor(random(matrixSize));
       matrix[y][x] = 4;
   }
   for (let index = 0; index < alienCount; index++) {
       let x = Math.floor(random(matrixSize));
       let y = Math.floor(random(matrixSize));
       matrix[y][x] = 5;
   }
}
matrixGenerator(60, 600, 55, 15,3,1);

//server
var express = require('express');
const { log } = require("console");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

//creating objects
function creatingObjects(){
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
creatingObjects();

//game
function game(){
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

  //object to send
let sendData = {
   matrix: matrix,
   grassCounter: grassArr.length,
   grasseaterCounter: grassEaterArr.length,
   predatorCounter: predatorArr.length,
   hunterCounter: hunterArr.length,
   alienCounter: alienArr.length,
   weathername: weath
}

io.sockets.emit("data",sendData);
}

setInterval(game,1000);

//weather
function weather() {
    if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    else if (weath == "winter") {
        weath = "spring"
    }
    io.sockets.emit("weather", weath)
}
setInterval(weather, 5000);


//add new predator
function addPredator() {
    for (var i = 0; i < 5; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            let pr = new Predator(x, y);
               predatorArr.push(pr);
        }
    }
}
//add new hunter
function addHunter() {
    for (var i = 0; i < 2; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            let hunt = new Hunter(x, y);
               hunterArr.push(hunt);
        }
    }
}
//add new alien
function addAlien() {
    for (var i = 0; i < 2; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            let al = new Alien(x, y);
               alienArr.push(al);
        }
    }
}
//kill the grasseater
function kill() {
     for (let i = 0; i <= 5; i++) {
        grassEaterArr[i].die();
        console.log(grassEaterArr.length + "left");
    }
}


//connect
io.on('connection', function (socket) {
    socket.on("add predator", addPredator);
    socket.on("add hunter", addHunter);
    socket.on("add alien", addAlien);
    socket.on("kill", kill);
});

//statistics
var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.hunter = hunterArr.length;
    statistics.alien = alienArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)

