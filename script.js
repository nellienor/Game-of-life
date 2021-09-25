function setup() {

    let socket = io();

    let side = 10;

    let matrix = [];


    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let hunterCountElement = document.getElementById('hunterCount');
    let alienCountElement = document.getElementById('alienCount');

    socket.on("data", drawCreatures);

    socket.on("weather", function (data1) {
        weath = data1;
    })
    weath = "spring";

    function drawCreatures(data) {

        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grasseaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        hunterCountElement.innerText = data.hunterCounter;
        alienCountElement.innerText = data.alienCounter;

        createCanvas(matrix[0].length * side, matrix.length * side);
        background('#D3D3D3');
        noStroke()
        
        
            for (let y = 0; y < matrix.length; y++) {
                const element = matrix[y];
                for (let x = 0; x < element.length; x++) {
                  
                    if (matrix[y][x] == 1) {
                        if(weath == "summer") {
                            fill('#3C8A41');
                        }else if (weath == "autumn") {
                            fill("#012A04");
                        }else if (weath == "winter") {
                            fill("#EEF7EF");
                        }else if (weath == "spring") {
                            fill("#29BB3A");
                        }
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
                        fill('#D3D3D3');
                        rect(x * side, y * side, side, side,side/4)
                    }
                
                }
            }
        }
    }

   /* canva.addEventListener('mousedown', function(e) {
        // Get the target
        const target = e.target;
    
        // Get the bounding rectangle of target
        const rect = target.getBoundingClientRect();
    
        // Mouse position
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log(x+","+y);
    });
  

   /* var pos = document.getElementById('position');
    function printMousePos(event) {
        pos.innerText =
          "clientX: " + event.clientX +
          " - clientY: " + event.clientY;
      }
      
      document.addEventListener("click", printMousePos);*/