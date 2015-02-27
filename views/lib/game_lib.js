/**
 * @author davidcinca
 */

var Mouse_point={x: "init", y: "init"};

var gameState = 1;

function toggleProcess(){
  switch(gameState) {
    case 1:
        move();
        break;
    case 2:
        talk();
        break;
    default:move();
  }
}

function dijkstra_path(pi, matrix, pf){

		var matrix_path=[];
		var p_matrix_path=[];
		for (var i=0; i<matrix.length; i++){
			line=[];
			for (var j=0; j<matrix[0].length; j++){
				line.push(matrix[i][j]);
			}
			matrix_path.push(line);
		}	
		
		var finded = false;
		var added = 0;
		var points = [];

		matrix_path[pi.y][pi.x]={x: pi.x, y:pi.y, previous_x:pi.x, previous_y: pi.y};
		p_matrix_path=matrix_path;
		
		while(!finded){
			added=0;
			for (var i=0; i<matrix_path.length; i++){
				for (var j=0; j<matrix_path[0].length; j++){
					if(matrix_path[i][j].x==pf.x && matrix_path[i][j].y==pf.y){
						finded = true;
					}
				}
		    }
		    
		    points=[];
		    for (var i=0; i<matrix_path.length; i++){
				for (var j=0; j<matrix_path[0].length; j++){
					if(matrix_path[i][j].x || matrix_path[i][j].x==0){
						points.push({x: matrix_path[i][j].x+1, y: matrix_path[i][j].y, previous_x: matrix_path[i][j].x, previous_y: matrix_path[i][j].y});	
                        points.push({x: matrix_path[i][j].x-1, y: matrix_path[i][j].y, previous_x: matrix_path[i][j].x, previous_y: matrix_path[i][j].y});	
                        points.push({x: matrix_path[i][j].x, y: matrix_path[i][j].y+1, previous_x: matrix_path[i][j].x, previous_y: matrix_path[i][j].y});	
                        points.push({x: matrix_path[i][j].x, y: matrix_path[i][j].y-1, previous_x: matrix_path[i][j].x, previous_y: matrix_path[i][j].y});
			       }
				}
			}
			
			for(var j=0; j<points.length; j++){
				if(matrix_path[0].length > points[j].x && points[j].x >= 0){
					if(matrix_path.length > points[j].y && points[j].y >= 0){
						if(matrix_path[points[j].y][points[j].x]==0){
							matrix_path[points[j].y][points[j].x]=points[j];	
							added++;								
					    }
					}
				}
			}
			if(added==0 && !finded){return [];}
		}
		
		points=[];
		finded = false;
		var point={x: pf.x, y: pf.y};
		while(!finded){
		    for (var i=0; i<matrix_path.length; i++){
				for (var j=0; j<matrix_path[0].length; j++){
					if(matrix_path[i][j].x==point.x && matrix_path[i][j].y==point.y){
						points.push({x: matrix_path[i][j].x, y: matrix_path[i][j].y});
						point={x: matrix_path[i][j].previous_x, y: matrix_path[i][j].previous_y};
						if(point.x==pi.x && point.y==pi.y){
							finded=true;
							points.push(point);
						}
					}
				}
			}
			
		}
		return points.reverse();
}



//defines the mouseHandler
function mousedownHandler(){
	mouseX = Math.trunc((event.pageX- canvas.offsetLeft + camera.x)/map.tilewidth);
	mouseY = Math.trunc((event.pageY - canvas.offsetTop + camera.y)/map.tileheight);
	Mouse_point={x: mouseX, y: mouseY}; 
}

function move(){
	for (var i = 0; i < level.sprites.length; i++){
		level.sprites[i].preMove();
		if(level.sprites[i].vx==0 && level.sprites[i].vy==0){
			level.sprites[i].x=level.sprites[i].tileX*map.tilewidth;
	        level.sprites[i].y=level.sprites[i].tileY*map.tileheight-level.sprites[i].heightCorrection;		     
	    }
	    if(level.sprites[i].x%map.tilewidth==0){
	    	level.sprites[i].tileX=level.sprites[i].x/map.tilewidth;
	    }
	    if(level.sprites[i].y%map.tileheight==0){
	    	level.sprites[i].tileY=level.sprites[i].y/map.tileheight+level.sprites[i].heightCorrection/spriteHeight;
	    }
	    
	    if(level.sprites[i].path.length>0){
	    	if(level.sprites[i].path[0].x==level.sprites[i].tileX && level.sprites[i].path[0].y==level.sprites[i].tileY){
	    		level.sprites[i].path.shift();
	    	}
	    }
  	    if(level.sprites[i].path.length>0){
                level.sprites[i].vx=(level.sprites[i].path[0].x-level.sprites[i].tileX)*game.vFactor;
  	    	level.sprites[i].vy=(level.sprites[i].path[0].y-level.sprites[i].tileY)*game.vFactor;
	    }else{
	    	level.sprites[i].vx=0;
	    	level.sprites[i].vy=0;
	    }	
	}
	
	for(var i = 0; i < level.sprites.length; i++){
		if(level.sprites[i].vx!=0 || level.sprites[i].vy!=0){
			level.sprites[i].animation=(level.sprites[i].animation+level.sprites[i].animationSpeed)%level.sprites[i].numberAnimations;
		}
		
		level.sprites[i].x=level.sprites[i].x+level.sprites[i].vx;
		level.sprites[i].y=level.sprites[i].y+level.sprites[i].vy;
	}
		
	for (var i = 0; i < level.sprites.length; i++){
		level.sprites[i].postMove();
	}   
}


//sets the gameWorld
var gameWorld ={
    x: 0,
    y: 0,
    width: map.tilewidth*map.width,
    height: map.tileheight*map.height
};


//renders all the level.sprites 
function render(){
   drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
   drawingSurface.save();
   drawingSurface.translate(-camera.x, -camera.y);

   drawingSurface.translate(camera.x,0);
   drawingSurface.drawImage(level.background, 0, 0);
   drawingSurface.translate(-camera.x,0);
   mapRender();

   level.sprites=sortArrayByObject("tileY", level.sprites, "main");
   spriteRender(); 
   textRender();
   
   drawingSurface.restore();
}

function block(){
   var blockArea=[];
   for(var i=0; i<map.layers.length; i++){
   	if(map.layers[i].blocking){
   		line=[];
   		var k=0;
   		for(var j=0;j<map.height*map.width; j++){
   			if(map.layers[i].data[j]==0){
   				line.push(0);
   			}else{
   		        line.push(map.layers[i].onCollision);
   		    }
   		    k++;
   		    if(k==map.width){
   		    	blockArea.push(line);
   		    	k=0;
   		    	line=[];
   		    }
   		    
   		}
   		
    }  
   }
   
   for (var i = 0; i < level.sprites.length; i++){
   	if(level.sprites[i].blocking){
          for (var j=0; j<level.sprites[i].blocking.length; j++){
          	blockArea[level.sprites[i].blocking[j].y][level.sprites[i].blocking[j].x]=level.sprites[i].onCollision;
          }
   	}
   }   
   
   return blockArea;
}

function imageTileSet(image, tilewidth, tileheight){
  return {width: image.width/tilewidth, height: image.height/tileheight};
};

function countSquares(number, squares){
  return {x:number%squares.width, y: Math.floor(number/squares.width)};
}


function mapRender(){
 var tileSourceSquares = imageTileSet(tileSet, level.map.tilesets[0].tilewidth ,level.map.tilesets[0].tileheight);
 for(var i=0; i<level.map.layers.length; i++){
    for(var j=0;j<level.map.height*level.map.width; j++){
      if(level.map.layers[i].visible){  
        if(level.map.layers[i].data[j]!=0){
           drawingSurface.drawImage(level.tile_sheet, 
             countSquares(level.map.layers[i].data[j]-1,tileSourceSquares).x*level.map.tilesets[0].tilewidth,
             countSquares(level.map.layers[i].data[j]-1,tileSourceSquares).y*level.map.tilesets[0].tileheight,
             level.map.tilesets[0].tilewidth, 
             level.map.tilesets[0].tileheight, 
             level.map.tilewidth*(j%map.width), 
             level.map.tilewidth*Math.floor(j/map.width), 
             level.map.tilewidth, 
             level.map.tileheight                          
           );
        }
      }
    }
 }
}

function spriteRender(){
 for(var i = 0; i < level.sprites.length; i++){
     drawingSurface.drawImage(
          level.sprites[i].image,
          level.sprites[i].getSourceX(), level.sprites[i].getSourceY(),
          level.sprites[i].sourceWidth, level.sprites[i].sourceHeight,
          Math.floor(level.sprites[i].x), Math.floor(level.sprites[i].y),
          level.sprites[i].width, level.sprites[i].height
      );
 }
}

var texts=[];
var textBoxes=[];

function textRender(){
 drawingSurface.fillStyle = 'rgba(225,225,225,0.75)';;
 for(var i=0; i< textBoxes.length; i++){
    drawingSurface.fillRect(textBoxes[i].x,textBoxes[i].y,textBoxes[i].width,textBoxes[i].height);
 }
 drawingSurface.fillStyle = '#000';
 for(var i=0; i< texts.length; i++){
    drawingSurface.font="15px Comic Sans MS";
    drawingSurface.fillText(texts[i].text, texts[i].x, texts[i].y);
 }
}

function moveCamera(){
   //moves camera
   camera.x = Math.floor(main.x + main.width - (camera.width / 2));
   camera.y = Math.floor(main.y + main.height - (camera.height / 2));   
   if(camera.x < gameWorld.x) { camera.x = gameWorld.x; }
   if(camera.y < gameWorld.y) { camera.y = gameWorld.y; }
   if(camera.x+camera.width > gameWorld.x+gameWorld.width){ camera.x = gameWorld.width-camera.width;}
   if(camera.y+camera.height > gameWorld.y+gameWorld.height){ camera.y = gameWorld.height-camera.height;}
}

function eliminateArrayObject(id, object, array){
   var j= NaN;
   var ar = [];
   var ar2= [];
   for(var i=0; i<array.length; i++){
      if(array[i][object] || array[i][object]== 0){
        if(array[i][object]==id){
          j=i;  
        }
      }   
   }
   if(j || j==0){
      ar=array.slice(0,j);
      ar2=array.slice(j+1, array.length);
   }
   return ar.concat(ar2); 
}

function sortArrayByObject(object, array, exception){
   this.exception= null || exception;
   var arr = [{tileY: -1}];
   var toPut= 0;
   for (var i=0; i<array.length; i++){
       toPut= arr.length;
       for(var j=0; j<arr.length; j++){
         if(array[i][object]>arr[j][object]){
           toPut=j+1;
         }
       }
       arr=addArrayElement(array[i], toPut, arr);   
   }
   arr.shift();
   return arr;
}

function addArrayElement(element, position, array){
  return array.slice(0,position).concat(element).concat(array.slice(position, array.length));
}
