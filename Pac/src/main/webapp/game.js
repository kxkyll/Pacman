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
    ghost: null,
    field: null,
    gameOver: null,
    
    init: function(){
        //console.log("init");
        pacmanGame.ctx = $("#pacman")[0].getContext("2d");
        pacmanGame.man = new Pacman (120, 200, pacmanGame.ctx);
        pacmanGame.ghost = new Ghost (200, 150, pacmanGame.ctx);
        //pacmanGame.field = new Field(pacmanGame.ctx);
        pacmanGame.draw();
    },
    draw: function(){
        pacmanGame.ctx.clearRect(0,0,640,480);

        pacmanGame.ctx.fillStyle="rgb(195,195,195)";
        // fillRect parameters x,y, width, height
        pacmanGame.ctx.fillRect(0,0, 640,480);
        //pacmanGame.field.draw();
        
        //uppder border
        pacmanGame.ctx.fillStyle="rgb(25,25,112)";
        pacmanGame.ctx.fillRect(0,0, 640,40);
        
        //lower border
        //pacmanGame.ctx.fillStyle="rgb(25,25,112)";
        pacmanGame.ctx.fillRect(0,440, 640,480);
        
        //right border
        //pacmanGame.ctx.fillStyle="rgb(25,25,112)";
        pacmanGame.ctx.fillRect(600,0, 600,480);
        
        //left border
        //pacmanGame.ctx.fillStyle="rgb(25,25,112)";
        pacmanGame.ctx.fillRect(0,0,40,480);
        
        //upper left corner
        pacmanGame.ctx.fillRect(80,80,40,100);
        pacmanGame.ctx.fillRect(80,80,120,40);
        
        //lower right corner
        pacmanGame.ctx.fillRect(390,350,120,40);
        pacmanGame.ctx.fillRect(510,290,40,100);
        
        
    //        pacmanGame.man.animate();
    //        pacmanGame.man.draw(pacmanGame.ctx);
    //        pacmanGame.ghost.animate(); 
    //        pacmanGame.ghost.draw(pacmanGame.ctx);
        
    },
    render: function(){
        pacmanGame.man.animate();
        pacmanGame.man.draw(pacmanGame.ctx);
        pacmanGame.ghost.animate(); 
        pacmanGame.ghost.draw(pacmanGame.ctx);
        
    },
    run: function(){
        //console.log("run");
        if (pacmanGame.gameOver){
            pacmanGame.end();
        }
        pacmanGame.man.move(keyhandler.getMovement());
        if (pacmanGame.man.collision(pacmanGame.ghost)){
            pacmanGame.gameOver = true;
            pacmanGame.end();
        }
            
        pacmanGame.ghost.move();
        pacmanGame.render();
    //pacmanGame.draw();
    //requestAnimFrame(pacmanGame.run());
        
    },
    end: function(){
        
        pacmanGame.ctx.font="40pt Calibri";
        pacmanGame.ctx.fillStyle="rgb(255,0,0)";
        pacmanGame.ctx.fillText("Game over",200,280);  
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
