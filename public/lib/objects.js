
//defines sprite object
function Sprite (img, id, sourceX, sourceY, sourceWidth, sourceHeight, tileX, tileY, blocking){
   this.id=id; 

   this.image = img;
   this.sourceX= 0 || sourceX;
   this.sourceY= 0 || sourceY;
   this.sourceWidth= sourceWidth || spriteWidth;
   this.sourceHeight= sourceHeight || spriteHeight;
   

   this.tileX = 0 || tileX;
   this.tileY=0 || tileY;
   this.x = 0;
   this.y = 0;
   this.width = this.sourceWidth;
   this.height = this.sourceHeight;
   this.heightCorrection = this.height-64;   

   this.stopped=true;

   this.vx=0;
   this.vy=0;
   this.path=[];

   this.blocking=false || blocking;
   this.onclick= function(){};
   this.onCollision= function(){};

   if(blocking==true){
     this.blocking=[];
     var tiles=Math.trunc(this.width/spriteWidth);
     for(var i=0; i<tiles; i++){this.blocking.push({x: this.tileX+i, y: this.tileY});}
   }   

   this.collision=false;

   this.state = 0;
   this.animation = 0;
   this.animationSpeed= 0.25;

   this.preMove = function(){};
   this.postMove = function(){};


   this.getSourceX = function(){return this.sourceX+Math.trunc(this.animation)*this.sourceWidth;};
   this.getSourceY = function(){return this.sourceY+this.state*this.sourceHeight;};
}

function Level(map, tile_sheet, background, sprites){
   this.map = map;
   this.tile_sheet= tile_sheet;
   this.background= background;
   this.sprites= sprites || []; 
}
