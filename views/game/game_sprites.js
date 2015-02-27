/**
 * @author davidcinca
 */

spriteWidth=64;
spriteHeight=64;


function updateLevel(){
   
}

var game = { vFactor:4 }; 

var main= new Sprite(mainImage, "main", 0, 0, 64, 128, 1, 2);
level.sprites.push(main);

main.preMove = function() {
	if(Mouse_point.x!="init" || Mouse_point.y!="init"){
		if(block()[Mouse_point.y][Mouse_point.x]==0){
	        main.path=dijkstra_path({x: main.tileX, y: main.tileY}, block(),{x: Mouse_point.x, y: Mouse_point.y});
		}
	    Mouse_point.x="init";
	    Mouse_point.y="init";
	}
};

main.postMove = function(){
	if(main.vx==0 && main.vy==0){
		if(block()[main.tileY+1][main.tileX]){block()[main.tileY+1][main.tileX]();}
		if(block()[main.tileY-1][main.tileX]){block()[main.tileY-1][main.tileX]();}
		if(block()[main.tileY][main.tileX+1]){block()[main.tileY][main.tileX+1]();}
		if(block()[main.tileY][main.tileX-1]){block()[main.tileY][main.tileX-1]();}
	}
	if(main.vx>0){
           main.state=1;
        }
        if(main.vx<0){
           main.state=3;
        }
        if(main.vy>0){
           main.state=0;
        }
        if(main.vy<0){
           main.state=2;
        }
};

var yonki = new Sprite(yonkiImage, "yonki", 0, 0, 64, 128, 2, 7, true);
yonki.talking=false;
yonki.colliding=false;
yonki.onCollision = function(){
	if(!yonki.talking){
          var t={id: "yonki_1", text: "Tienes algo?", x: yonki.x+2, y: yonki.y-5};
          var b={id: "yonki_1", x: yonki.x, y: yonki.y-18, width: 98, height: 15};
          texts.push(t);
          textBoxes.push(b);
    }
    yonki.talking=true;
};

yonki.preMove = function(){
	if(main.vx!=0 || main.vy!=0){
           this.talking=false;
           texts=eliminateArrayObject("yonki_1","id" ,texts);
           textBoxes=eliminateArrayObject("yonki_1", "id", textBoxes);
	}
        simpleAnimation(this, 3, 40);
};

level.sprites.push(yonki);

function TollgateSprite(id, tileX){
  Sprite.call(this, tollgateImage, id, 0 , 0, 64, 384, tileX, 2)
  this.heightCorrection=0;
  this.animation=0;
  this.blocking= [{x:this.tileX, y: this.tileY},{x:this.tileX, y: this.tileY+1}, {x:this.tileX, y: this.tileY+2}, 
                   {x:this.tileX, y: this.tileY+3}, {x:this.tileX, y: this.tileY+4}, {x:this.tileX, y: this.tileY+5} ];

  this.preMove=function(){
   if(this.animation==2){
         this.blocking= [{x:this.tileX, y: this.tileY},{x:this.tileX, y: this.tileY+1},
                                                 {x:this.tileX, y: this.tileY+2}, {x:this.tileX, y: this.tileY+3}, 
                                                 {x:this.tileX, y: this.tileY+4}];
    }else{
         this.blocking= [{x:this.tileX, y: this.tileY},{x:this.tileX, y: this.tileY+1}, 
                             {x:this.tileX, y: this.tileY+2}, {x:this.tileX, y: this.tileY+3},
                             {x:this.tileX, y: this.tileY+4}, {x:this.tileX, y: this.tileY+5} ];
    }
    if(this.leverage){
       this.open();
    }
  }
  this.leverage=false;
  this.sequence=0;
  this.openned=false;
  this.open=function(){
    this.sequence++;
    if(this.sequence==8){
     this.animation=1
    }
    if(this.sequence==24){
      this.open=function(){};
      this.animation=2;
      this.openned=true;
    }
  };
};

var tollgate1 = new TollgateSprite("tollgate", 20);
var tollgate2 = new TollgateSprite("tollgate2", 30);
var tollgate3 = new TollgateSprite("tollgate3", 40);


level.sprites.push(tollgate1, tollgate2, tollgate3);
     
var exhibicionista = new Sprite(exhbicionistaImage, "exhibicionista", 0, 0, 64, 128, 5, 6, true);
exhibicionista.preMove= function (){
   if (this.state>1){
      this.width=128; 
      this.sourceWidth=128;
   }else{
      this.blocking=[{x: this.tileX, y: this.tileY}];
   }
   if(this.tileY==8){this.path=[{x: this.tileX, y: 7}, {x: this.tileX, y: 6}, 
                                                    {x: this.tileX, y: 5}, {x: this.tileX, y: 4},
                                                    {x: this.tileX, y: 3}, {x: this.tileX, y: 2}];
                               this.state=3;
                               this.numberAnimations=3;
                    }
   if(this.tileY==2){this.path=[{x: this.tileX, y: 3}, {x: this.tileX, y: 4}, 
                                                    {x: this.tileX, y: 5}, {x: this.tileX, y: 6},
                                                    {x: this.tileX, y: 7}, {x: this.tileX, y: 8}];
                               this.state=2;
                               this.numberAnimations=3;
                     }
};

exhibicionista.onCollision=function () {
                 exhibicionista.state=2;
                 exhibicionista.numberAnimations=3;
                 exhibicionista.path=[{x: exhibicionista.tileX, y: exhibicionista.tileY+1}, 
                                      {x: exhibicionista.tileX, y: exhibicionista.tileY+2}];
                 exhibicionista.onCollision= function (){};
                 exhibicionista.blocking= [];
};

level.sprites.push(exhibicionista);

var lobo = new Sprite(loboImage, "lobo", 0, 0, 64, 64, 24, 2, true);
level.sprites.push(lobo);

var ser_de_ganimedes = new Sprite(ser_de_ganimedesImage,"ser_de_ganimedes", 0, 0, 64, 64, 25, 6, true);
level.sprites.push(ser_de_ganimedes);




var buhocosmico = new Sprite(buhocosmicoImage, "buho_cosmico", 0,0, 64, 64, 49,2, true);
level.sprites.push(buhocosmico);

var borracho = new Sprite(borrachoImage, "borracho", 0,0, 128, 64, 2,3, true);
borracho.preMove=function(){simpleAnimation(this, 4, 32);};
level.sprites.push(borracho);

var conejo = new Sprite(conejoImage, "conejo", 0,0, 64, 128, 10, 4, true);
conejo.preMove=function(){simpleAnimation(this, 5, 50);};
level.sprites.push(conejo);

var gordoDesagradable = new Sprite(gordoDesagradableImage, "gordo_desagradable", 0, 0, 64, 128, 29, 2, true);
gordoDesagradable.preMove=function(){simpleAnimation(this, 5, 20)};
level.sprites.push(gordoDesagradable);

var grimble= new Sprite(grimbleImage, "grimble", 0, 0, 64, 64, 16, 4, true);
grimble.preMove=function(){simpleAnimation(this, 4, 4);};
level.sprites.push(grimble);

var mujerdelacalle = new Sprite(mujerdelacalleImage, "mujer_de_la_calle", 0, 0, 64, 128, 13, 2, true);
level.sprites.push(mujerdelacalle);
mujerdelacalle.preMove=function(){simpleAnimation(this, 3, 12);};

var robertjohnson = new Sprite(robertjohnsonImage, "Rober_Johnson", 0, 0, 64, 128, 12, 7, true);
robertjohnson.preMove=function(){simpleAnimation(this, 3, 12);};
level.sprites.push(robertjohnson);

var sigmoundFreud = new Sprite(sigmoundFreudImage, "Sigmound_Freud", 0, 0, 64, 128, 17, 7, true);
sigmoundFreud.preMove=function(){simpleAnimation(this, 5, 16);};

var macroFreud = new Sprite(macroFreudImage, "macro_Freud", 0, 0, 128, 256, 17, 7, true);

macroFreud.preMove=function(){
  if(macroFreud.path.length==0 && macroFreud.exists){
    macroFreud.path=dijkstra_path({x: macroFreud.tileX, y: macroFreud.tileY}, block(), {x: main.tileX-2, y: main.tileY});
  }
  if(macroFreud.vx>0){
    macroFreud.state=1;
    macroFreud.numberAnimations=2;
  }
  if(macroFreud.vx<0){
    macroFreud.state=3;
    macroFreud.numberAnimations=2;
  }
  if(macroFreud.vy>0){
    macroFreud.state=0;
    macroFreud.numberAnimations=3;
  }
  if(macroFreud.vy<0){
    macroFreud.state=2;
    macroFreud.numberAnimations=3;
  }
};

macroFreud.exists=false;
   
sigmoundFreud.onCollision=function(){
  level.sprites=eliminateArrayObject("Sigmound_Freud", "id", level.sprites);
  macroFreud.path=dijkstra_path({x: macroFreud.tileX, y: macroFreud.tileY}, block(), {x: main.tileX-1, y: main.tileY});
  level.sprites.push(macroFreud);
  macroFreud.exists=true;
};

level.sprites.push(sigmoundFreud);

var zancopanco = new Sprite(zancopancoImage, "zanco_panco", 0, 0, 128, 128, 18, 2, true);

zancopanco.onCollision=function(){
    this.animation=1;
    tollgate1.leverage= true;
};
zancopanco.preMove=function(){
    if(tollgate1.openned){
       this.falling=true;
    }
    this.animate(this.falling);
};
zancopanco.falling=false;
zancopanco.animate=function(falling){
    this.sequence++;
    if(this.sequence==32 && this.state==0 || this.sequence==4 && this.state==1){
      if(this.animation==0){
        this.animation=1;
      }else{
        if(this.state==1){
           this.animate=function(falling){};
        }else{
           this.animation=0;
        }
      }
      this.sequence=0;
    }
    if(this.falling){
      this.falling=false;
      if(this.state==0){
         this.animation=0;
         this.sequence=0;
      }
      this.state=1;
    }
};
level.sprites.push(zancopanco);
