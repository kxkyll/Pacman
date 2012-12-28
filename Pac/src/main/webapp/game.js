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
    gameOver: null,
    
    init: function(){
        console.log("init");
        pacmanGame.ctx = $("#pacman")[0].getContext("2d");
        pacmanGame.ctx.fillStyle="rgb(105,105,105)";
        pacmanGame.ctx.fillRect(0,0, 640,480);
        pacmanGame.man = new Pacman (120, 100, 20);
        pacmanGame.man.draw(pacmanGame.ctx);
    //pacmanGame.run();
    },
    
    run: function(){
        console.log("run");
        pacmanGame.man.move(keyhandler.getMovement());
        pacmanGame.man.draw(pacmanGame.ctx);
        requestAnimFrame(pacmanGame.run());
    //setTimeout(pacmanGame.run(),1000);
    }
};

$(document).ready(function(){
    console.log("document ready");
    pacmanGame.init();
    $(document).keyup(function(eventInfo) {
        console.log("keyup "+eventInfo.which);
        keyhandler.keyup(eventInfo.which);
    //        pacmanGame.man.move(keyhandler.getMovement());
    //        pacmanGame.man.draw(pacmanGame.ctx);
    });
        
    $(document).keydown(function(eventInfo) {
        console.log("keydown "+eventInfo.which);
        keyhandler.keydown(eventInfo.which);
    });
    pacmanGame.run();
})
