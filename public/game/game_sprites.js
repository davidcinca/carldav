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
           yonki.talking=false;
           texts=eliminateIdArray("yonki_1", texts);
           textBoxes=eliminateIdArray("yonki_1", textBoxes);
	}
};

level.sprites.push(yonki);

var tollgate = new Sprite(tollgateImage, "tollgate", 0, 0, 64, 384, 20, 2);
tollgate.heightCorrection=0;
tollgate.animation=0;
tollgate.blocking= [{x:tollgate.tileX, y: tollgate.tileY},{x:tollgate.tileX, y: tollgate.tileY+1}, {x:tollgate.tileX, y: tollgate.tileY+2}, 
                   {x:tollgate.tileX, y: tollgate.tileY+3}, {x:tollgate.tileX, y: tollgate.tileY+4}, {x:tollgate.tileX, y: tollgate.tileY+5} ];

tollgate.preMove=function(){
   if(tollgate.animation==2){
         tollgate.blocking= [{x:tollgate.tileX, y: tollgate.tileY},{x:tollgate.tileX, y: tollgate.tileY+1},
                                                 {x:tollgate.tileX, y: tollgate.tileY+2}, {x:tollgate.tileX, y: tollgate.tileY+3}, 
                                                 {x:tollgate.tileX, y: tollgate.tileY+4}];
    }else{
         tollgate.blocking= [{x:tollgate.tileX, y: tollgate.tileY},{x:tollgate.tileX, y: tollgate.tileY+1}, 
                             {x:tollgate.tileX, y: tollgate.tileY+2}, {x:tollgate.tileX, y: tollgate.tileY+3},
                             {x:tollgate.tileX, y: tollgate.tileY+4}, {x:tollgate.tileX, y: tollgate.tileY+5} ];
    }
    if(tollgate.leverage){
       tollgate.open();
    }
}
tollgate.leverage=false;
tollgate.sequence=0;
tollgate.open=function(){
    tollgate.sequence++;
    if(tollgate.sequence==8){
     tollgate.animation=1
    }
    if(tollgate.sequence==24){
      tollgate.open=function(){};
      tollgate.animation=2;
      zancopanco.falling=true;
    }
};
level.sprites.push(tollgate);

                   

var exhibicionista = new Sprite(exhbicionistaImage, "exhibicionista", 0, 0, 64, 128, 5, 6, true);
exhibicionista.preMove= function (){
   if (exhibicionista.state>1){
      exhibicionista.width=128; 
      exhibicionista.sourceWidth=128;
   }else{
      exhibicionista.blocking=[{x: exhibicionista.tileX, y: exhibicionista.tileY}];
   }
   if(exhibicionista.tileY==8){exhibicionista.path=[{x: exhibicionista.tileX, y: 7}, {x: exhibicionista.tileX, y: 6}, 
                                                    {x: exhibicionista.tileX, y: 5}, {x: exhibicionista.tileX, y: 4},
                                                    {x: exhibicionista.tileX, y: 3}, {x: exhibicionista.tileX, y: 2}];
                               exhibicionista.state=3;}
   if(exhibicionista.tileY==2){exhibicionista.path=[{x: exhibicionista.tileX, y: 3}, {x: exhibicionista.tileX, y: 4}, 
                                                    {x: exhibicionista.tileX, y: 5}, {x: exhibicionista.tileX, y: 6},
                                                    {x: exhibicionista.tileX, y: 7}, {x: exhibicionista.tileX, y: 8}];
                               exhibicionista.state=2;}
};

exhibicionista.onCollision=function () {
                 exhibicionista.state=2;
                 exhibicionista.path=[{x: exhibicionista.tileX, y: exhibicionista.tileY+1}, 
                                      {x: exhibicionista.tileX, y: exhibicionista.tileY+2}];
                 exhibicionista.onCollision= function (){};
                 exhibicionista.blocking= [];
};

level.sprites.push(exhibicionista);

var lobo = new Sprite(loboImage, "lobo", 0, 0, 64, 64, 7, 2, true);
level.sprites.push(lobo);

var ser_de_ganimedes = new Sprite(ser_de_ganimedesImage,"ser_de_ganimedes", 0, 0, 64, 64, 9, 3, true);
level.sprites.push(ser_de_ganimedes);

var macroFreud = new Sprite(macroFreudImage, "macro_Freud", 0, 0, 128, 256, 10, 5, true);
level.sprites.push(macroFreud);

var buhocosmico = new Sprite(buhocosmicoImage, "buho_cosmico", 0,0, 64, 64, 2,2, true);
level.sprites.push(buhocosmico);

var borracho = new Sprite(borrachoImage, "borracho", 0,0, 128, 64, 2,3, true);
level.sprites.push(borracho);

var conejo = new Sprite(conejoImage, "conejo", 0,0, 64, 128, 10, 4, true);
level.sprites.push(conejo);

var gordoDesagradable = new Sprite(gordoDesagradableImage, "gordo_desagradable", 0, 0, 64, 128, 15, 3, true);
level.sprites.push(gordoDesagradable);

var grimble= new Sprite(grimbleImage, "grimble", 0, 0, 64, 64, 16, 4, true);
level.sprites.push(grimble);

var mujerdelacalle = new Sprite(mujerdelacalleImage, "mujer_de_la_calle", 0, 0, 64, 128, 13, 2, true);
level.sprites.push(mujerdelacalle);

var robertjohnson = new Sprite(robertjohnsonImage, "Rober_Johnson", 0, 0, 64, 128, 12, 3, true);
level.sprites.push(robertjohnson);

var sigmoundFreud = new Sprite(sigmoundFreudImage, "Sigmound_Freud", 0, 0, 64, 128, 17, 7, true);
level.sprites.push(sigmoundFreud);

var zancopanco = new Sprite(zancopancoImage, "zanco_panco", 0, 0, 128, 128, 18, 2, true);

zancopanco.onCollision=function(){
    this.animation=1;
    tollgate.leverage= true;
};
zancopanco.preMove=function(){
    if(main.vx!=0 || main.vy!=0){
       zancopanco.animation=0;
    }
    this.animate(this.falling);
};
zancopanco.falling=false;
zancopanco.sequence=0;
zancopanco.animate=function(falling){
    this.sequence++;
    if(this.sequence==32){
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
      this.animation=0;
      this.state=1;
      this.sequence=0;
    }
};
level.sprites.push(zancopanco);
