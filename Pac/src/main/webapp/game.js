"use strict";
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(callback, element){
        window.setTimeout(callback, 1000 / 60); //1000/60
    };
})();



var pacmanGame ={
    ctx: null,
    man: null,
    readGhost: null,
    blueGhost:null,
    orangeGhost:null,
    pinkGhost:null,
    deadGhost:null,
    food:null,
    foodTable:null,
    path:null,
    navi:null,
    gameOver: null,
    
    init: function(){
        //console.log("init");
        pacmanGame.ctx = $("#pacman")[0].getContext("2d");
        pacmanGame.man = new Pacman (200, 40, pacmanGame.ctx); 
        
        pacmanGame.readGhost = new Ghost (400, 200, pacmanGame.ctx, $("#ghostsprite")[0]);
        //pacmanGame.blueGhost = new Ghost (360, 200, pacmanGame.ctx, $("#ghostspriteInky")[0]);
        pacmanGame.blueGhost = new Ghost (120, 40, pacmanGame.ctx, $("#ghostspriteInky")[0]);
        pacmanGame.orangeGhost = new Ghost (360, 240, pacmanGame.ctx, $("#ghostspriteOrange")[0]);
        pacmanGame.pinkGhost = new Ghost (400, 240, pacmanGame.ctx, $("#ghostspritePink")[0]);
        pacmanGame.deadGhost = new Ghost (200, 40, pacmanGame.ctx, $("#ghostspriteDead")[0]);
        
        pacmanGame.path = createPath();
        pacmanGame.navi = createNavi();

        pacmanGame.draw();


    },
    draw: function(){
        pacmanGame.ctx.clearRect(0,0,640,480);

        pacmanGame.ctx.fillStyle="rgb(195,195,195)";
        // fillRect parameters x,y, width, height
        pacmanGame.ctx.fillRect(0,0, 640,480);
        //pacmanGame.field.draw();
        drawField(pacmanGame.ctx);
        
    pacmanGame.foodTable = createFood(pacmanGame.path,pacmanGame.ctx);

        
    //pacmanGame.path = createPath();
        
        
    //        pacmanGame.man.animate();
    //        pacmanGame.man.draw(pacmanGame.ctx);
    //        pacmanGame.ghost.animate(); 
    //        pacmanGame.ghost.draw(pacmanGame.ctx);
        
    },
    render: function(){
        //pacmanGame.food.draw();
        drawFoods(pacmanGame.foodTable,pacmanGame.ctx);
        pacmanGame.man.animate();
        pacmanGame.man.draw(pacmanGame.ctx);
        pacmanGame.readGhost.animate(); 
        
        pacmanGame.blueGhost.animate(); 
        pacmanGame.blueGhost.draw(pacmanGame.ctx);
        pacmanGame.orangeGhost.animate(); 
        pacmanGame.orangeGhost.draw(pacmanGame.ctx);
        pacmanGame.pinkGhost.animate(); 
        pacmanGame.pinkGhost.draw(pacmanGame.ctx);
        
        pacmanGame.readGhost.draw(pacmanGame.ctx);


    },
    run: function(){
        //console.log("run");
        if (pacmanGame.gameOver){
            pacmanGame.end();
        }
        //pacmanGame.blueGhost.ramble(pacmanGame.path);
        //pacmanGame.blueGhost.navi(pacmanGame.navi);
        pacmanGame.man.move(keyhandler.getMovement(), pacmanGame.path);
        
        if (pacmanGame.man.collision(pacmanGame.readGhost)){
            pacmanGame.gameOver = true;
            pacmanGame.end();
        }
        //testi
        pacmanGame.foodTable=pacmanGame.man.eat(pacmanGame.foodTable);
        if (pacmanGame.foodTable.length == 0){
            pacmanGame.gameOver = true;
            pacmanGame.end();
        }
        console.log("foods left: " +pacmanGame.foodTable.length);    
        pacmanGame.readGhost.moveAround(pacmanGame.path);
        //pacmanGame.greenGhost.ramble(pacmanGame.path);
        pacmanGame.render();
    //pacmanGame.whiteGhost.ramble(pacmanGame.path);
    //pacmanGame.draw();
    //requestAnimFrame(pacmanGame.run());
        
    },
    end: function(){
       
        
        //pacmanGame.readGhost.draw(pacmanGame.ctx);
        //pacmanGame.man.draw(pacmanGame.ctx);
        pacmanGame.ctx.font="40pt Calibri";
        pacmanGame.ctx.fillStyle="rgb(255,0,0)";
        pacmanGame.ctx.fillText("Game over",200,315);  
        if (pacmanGame.foodTable.length == 0){
            pacmanGame.ctx.fillText("Pac-man is a champ",150,355);  
        }
    }
};

$(document).ready(function(){
    console.log("document ready");
    pacmanGame.init();
    pacmanGame.run();
    $(document).keyup(function(eventInfo) {
        //console.log("keyup "+eventInfo.which);
        keyhandler.keyup(eventInfo.which);
    });
        
    $(document).keydown(function(eventInfo) {
        //console.log("keydown "+eventInfo.which);
        keyhandler.keydown(eventInfo.which);
    });
    
    setInterval(function() {
        if (!pacmanGame.gameOver){
            pacmanGame.run();
        }
        
        
    }, 200) //1000/20
    
    
})
