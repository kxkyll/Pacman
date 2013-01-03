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
    greenGhost:null,
    whiteGhost:null,
    deadGhost:null,
    path: null,
    gameOver: null,
    
    init: function(){
        //console.log("init");
        pacmanGame.ctx = $("#pacman")[0].getContext("2d");
        pacmanGame.man = new Pacman (40, 40, pacmanGame.ctx);
        pacmanGame.readGhost = new Ghost (400, 200, pacmanGame.ctx, $("#ghostsprite")[0]);
        pacmanGame.blueGhost = new Ghost (360, 200, pacmanGame.ctx, $("#ghostspriteBlue")[0]);
        pacmanGame.greenGhost = new Ghost (360, 240, pacmanGame.ctx, $("#ghostspriteGreen")[0]);
        pacmanGame.whiteGhost = new Ghost (400, 240, pacmanGame.ctx, $("#ghostspriteWhite")[0]);
        pacmanGame.deadGhost = new Ghost (200, 40, pacmanGame.ctx, $("#ghostspriteDead")[0]);
        //pacmanGame.field = new Field(pacmanGame.ctx);
        pacmanGame.draw();
    },
    draw: function(){
        pacmanGame.ctx.clearRect(0,0,640,480);

        pacmanGame.ctx.fillStyle="rgb(195,195,195)";
        // fillRect parameters x,y, width, height
        pacmanGame.ctx.fillRect(0,0, 640,480);
        //pacmanGame.field.draw();
        drawField(pacmanGame.ctx);
        pacmanGame.path = createPath();
        
//        //uppder border
//        pacmanGame.ctx.fillStyle="rgb(25,25,112)";
//        pacmanGame.ctx.fillRect(0,0, 640,40);
//        
//        //lower border
//        //pacmanGame.ctx.fillStyle="rgb(25,25,112)";
//        pacmanGame.ctx.fillRect(0,440, 640,480);
//        
//        //right border
//        //pacmanGame.ctx.fillStyle="rgb(25,25,112)";
//        pacmanGame.ctx.fillRect(600,0, 600,480);
//        
//        //left border
//        //pacmanGame.ctx.fillStyle="rgb(25,25,112)";
//        pacmanGame.ctx.fillRect(0,0,40,480);
//        
//        //upper left corner
//        pacmanGame.ctx.fillRect(80,80,40,80);
//        pacmanGame.ctx.fillRect(80,80,120,40);
//        
//        //lower right corner
//        pacmanGame.ctx.fillRect(400,360,120,40);
//        pacmanGame.ctx.fillRect(520,320,40,80);
//        
        
    //        pacmanGame.man.animate();
    //        pacmanGame.man.draw(pacmanGame.ctx);
    //        pacmanGame.ghost.animate(); 
    //        pacmanGame.ghost.draw(pacmanGame.ctx);
        
    },
    render: function(){
        pacmanGame.man.animate();
        pacmanGame.man.draw(pacmanGame.ctx);
        pacmanGame.readGhost.animate(); 
        pacmanGame.readGhost.draw(pacmanGame.ctx);
        pacmanGame.blueGhost.animate(); 
        pacmanGame.blueGhost.draw(pacmanGame.ctx);
        pacmanGame.greenGhost.animate(); 
        pacmanGame.greenGhost.draw(pacmanGame.ctx);
        pacmanGame.whiteGhost.animate(); 
        pacmanGame.whiteGhost.draw(pacmanGame.ctx);



    },
    run: function(){
        //console.log("run");
        if (pacmanGame.gameOver){
            pacmanGame.end();
        }
        
        pacmanGame.man.move(keyhandler.getMovement(), pacmanGame.path);
        
        if (pacmanGame.man.collision(pacmanGame.readGhost)){
            pacmanGame.gameOver = true;
            pacmanGame.end();
        }
            
        pacmanGame.readGhost.move();
        pacmanGame.render();
    //pacmanGame.draw();
    //requestAnimFrame(pacmanGame.run());
        
    },
    end: function(){
        
        pacmanGame.ctx.font="40pt Calibri";
        pacmanGame.ctx.fillStyle="rgb(255,0,0)";
        pacmanGame.ctx.fillText("Game over",200,315);  
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
