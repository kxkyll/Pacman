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
    //food:null,
    foodTable:null,
    path:null,
    navi:null,
    gameOver: true,
    paused:true,
    
    
    init: function(){
        //console.log("init");
        pacmanGame.ctx = $("#pacman")[0].getContext("2d");
        pacmanGame.man = new Pacman (200, 40, pacmanGame.ctx); 
        
        pacmanGame.readGhost = new Ghost (400, 200, pacmanGame.ctx, $("#ghostsprite")[0]);
        pacmanGame.blueGhost = new Ghost (360, 200, pacmanGame.ctx, $("#ghostspriteInky")[0]);
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

        pacmanGame.ctx.fillRect(0,0, 640,480);

        drawField(pacmanGame.ctx);
        
        pacmanGame.foodTable = createFood(pacmanGame.path,pacmanGame.ctx);
            
    },
    render: function(){

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
        
        pacmanGame.ctx.fillStyle="rgb(25,25,112)";
        pacmanGame.ctx.fillRect(0,440,640,40);
        
        pacmanGame.ctx.font="15pt Calibri";
        pacmanGame.ctx.fillStyle="rgb(255,255,255)";
        pacmanGame.ctx.fillText("Score: " +pacmanGame.man.getPoints() ,240,460);  
        if (!pacmanGame.paused){
            pacmanGame.ctx.fillText("Mouseclick to pause ",360,460);  
        }

    },
    run: function(){

        if (pacmanGame.gameOver){
            pacmanGame.end();
        }
        pacmanGame.blueGhost.ramble(pacmanGame.path);

        pacmanGame.foodTable= pacmanGame.man.move(keyhandler.getMovement(), pacmanGame.path, pacmanGame.foodTable);
        
        if (pacmanGame.man.collision(pacmanGame.readGhost)){
            pacmanGame.gameOver = true;
            pacmanGame.end();
        }
        //disabled for easier testing
        //        if (pacmanGame.man.collision(pacmanGame.blueGhost)){
        //            pacmanGame.gameOver = true;
        //            pacmanGame.end();
        //        }
        //        if (pacmanGame.man.collision(pacmanGame.orangeGhost)){
        //            pacmanGame.gameOver = true;
        //            pacmanGame.end();
        //        }
        //        if (pacmanGame.man.collision(pacmanGame.pinkGhost)){
        //            pacmanGame.gameOver = true;
        //            pacmanGame.end();
        //        }
       

        if (pacmanGame.foodTable.length == 0){
            pacmanGame.render();
            pacmanGame.gameOver = true;
            getHighScores();
            highScoreView.save();
            
            pacmanGame.end();
        }
        
        pacmanGame.readGhost.moveAround(pacmanGame.path);
        pacmanGame.pinkGhost.ramble(pacmanGame.path);
        pacmanGame.render();
        pacmanGame.orangeGhost.ramble(pacmanGame.path);
        
    },
    end: function(){
              
        pacmanGame.ctx.font="40pt Calibri";
        pacmanGame.ctx.fillStyle="rgb(255,0,0)";
        pacmanGame.ctx.fillText("Game over",200,315);  
        if (pacmanGame.foodTable.length == 0){
            pacmanGame.ctx.fillText("Pac-man is a champ",120,355);  
            
        }
        pacmanGame.ctx.font="20pt Calibri";
        pacmanGame.ctx.fillText("Mouseclick for a new game",160,30);  
        
        pacmanGame.ctx.fillStyle="rgb(25,25,112)";
        pacmanGame.ctx.fillRect(360,440,640,40);
        getHighScores();
    }
};

$(document).ready(function(){
    //console.log("document ready");
    
    pacmanGame.init();
    pacmanGame.render();
    pacmanGame.ctx.fillStyle="rgb(255,255,255)";
    pacmanGame.ctx.font="20pt Calibri";
    pacmanGame.ctx.fillText("Mouseclick to start a new game",160,30);  
    //pacmanGame.run();
    $(document).mouseup(function(eventInfo) {
        console.log("mouseclick");
        if (pacmanGame.gameOver){
            console.log("gameOver");
            pacmanGame.gameOver=false;
            pacmanGame.paused=false;
            pacmanGame.init();
            pacmanGame.run();
            return;
        }
        if (!pacmanGame.paused){
            pacmanGame.paused= true;
            
            pacmanGame.ctx.fillStyle="rgb(25,25,112)";
            pacmanGame.ctx.fillRect(360,440,640,40);
            
            pacmanGame.ctx.font="15pt Calibri";
            pacmanGame.ctx.fillStyle="rgb(255,255,255)";
            pacmanGame.ctx.fillText("Game paused" ,240,30);  
            pacmanGame.ctx.fillText("Mouseclick to continue ",360,460);          
        } else {
            pacmanGame.paused= false;
            pacmanGame.ctx.fillStyle="rgb(25,25,112)";
            pacmanGame.ctx.fillRect(0,0,640,40);
            pacmanGame.run();
        }
        
    });
    $(document).keyup(function(eventInfo) {
    
        keyhandler.keyup(eventInfo.which);
    });
        
    $(document).keydown(function(eventInfo) {
    
        keyhandler.keydown(eventInfo.which);
    });
    
    setInterval(function() {
        if (!pacmanGame.gameOver && !pacmanGame.paused){
            pacmanGame.run();
        }
        
        
    }, 200) //1000/20
    
    
})
