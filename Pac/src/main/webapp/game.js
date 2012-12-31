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
    gameOver: null,
    
    init: function(){
        //console.log("init");
        pacmanGame.ctx = $("#pacman")[0].getContext("2d");
        pacmanGame.man = new Pacman (120, 100, 20);
        pacmanGame.ghost = new Ghost (200,150);
    },
    draw: function(){
        pacmanGame.ctx.clearRect(0,0,640,480);

        pacmanGame.ctx.fillStyle="rgb(195,195,195)";
        pacmanGame.ctx.fillRect(0,0, 640,480);
        pacmanGame.man.animate();
        pacmanGame.man.draw(pacmanGame.ctx);
        pacmanGame.ghost.animate(); 
        pacmanGame.ghost.draw(pacmanGame.ctx);
        
    },
    
    run: function(){
        //console.log("run");
        pacmanGame.man.move(keyhandler.getMovement());
        pacmanGame.draw();
        //requestAnimFrame(pacmanGame.run());
        
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
        pacmanGame.run();
        
    }, 200)
    
    
})
