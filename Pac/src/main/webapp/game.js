$(document).ready(function(){
    console.log("document ready");
    var context = $("#pacman")[0].getContext("2d");
    context.fillStyle="rgb(105,105,105)";
    context.fillRect(0,0, 640,480);
    var pac = new Pacman (10, 50, 40);
    pac.draw(context);
})