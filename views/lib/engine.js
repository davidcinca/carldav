/**
 * @author davidcinca
 */

var canvas = document.getElementById('myCanvas');
var drawingSurface = canvas.getContext('2d');

if(canvas.style.width>gameWorld.width){canvas.style.width=gameWorld.width;}
if(canvas.style.height>gameWorld.height){canvas.style.height=gameWorld.height;}

//defines the camera for scrolling
var camera = {
     x: 0,
     y: 0,
     width: canvas.width,
     height: canvas.height
};

//centers the camera in the middle of the stage
camera.x = (gameWorld.x+gameWorld.width/2) - gameWorld.width/2;
camera.y = (gameWorld.y+gameWorld.height/2) - gameWorld.height/2;

var map;

update();

function update() {
 setTimeout(function() {
        requestAnimationFrame(update);
        updateLevel();
        toggleProcess();
        moveCamera();
        render();
   }, 100/24 );
 }

canvas.addEventListener("mousedown", mousedownHandler, false);


