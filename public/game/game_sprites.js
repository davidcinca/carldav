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
}
level.sprites.push(tollgate);

                   

var exhibicionista = new Sprite(exhbicionistaImage, "exhibicionista", 0, 0, 64, 128, 5, 6, true);
exhibicionista.preMove= function (){
   if (exhibicionista.animation!=0){
      exhibicionista.width=128; 
      exhibicionista.sourceWidth=128;
      exhibicionista.blocking=[{x: exhibicionista.tileX, y: exhibicionista.tileY}, {x: exhibicionista.tileX+1, y: exhibicionista.tileY}];
      if(main.tileX==exhibicionista.tileX+1 && main.tileY==exhibicionista.tileY){main.tileX=main.tileX+1}
   }else{
      exhibicionista.blocking=[{x: exhibicionista.tileX, y: exhibicionista.tileY}];
   }
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
level.sprites.push(zancopanco);
