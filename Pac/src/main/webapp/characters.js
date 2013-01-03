var pacmanDirection = {
    RIGHT: 0,
    LEFT: 36,
    UP: 72,
    DOWN:106
}

var ghostDirection = {
    VERTICAL:0,
    HORIZONTAL: 36
}


function Pacman (x,y, context){
    this.x=x;
    this.y=y;
    this.context = context;
    this.animation = new Animation ($("#pacsprite")[0],0,40,36);
}

Pacman.prototype.getX = function(){
    return this.x;
}
Pacman.prototype.getY = function(){
    return this.y;
}

Pacman.prototype.clear = function(){
    this.context.clearRect(this.x,this.y,40,36);
    this.context.fillStyle="rgb(195,195,195)";
    this.context.fillRect(this.x,this.y, 40,36);
}

Pacman.prototype.move = function(movement,path){
    this.clear();
    var step = 10;
    var newx = this.x + (movement[0] * step);
    var newy = this.y + (movement[1] * step);
    console.log("newx: "+newx +" newy "+newy);
    console.log("path: "+path[newy][newx]);
    if (!path[newy][newx]){
        console.log ("ei voi mennä");
        return;
    }
//    //    if (!path[x][y]){
//    //        console.log("ei voi mennä");
//    //        //illegal direction
//    //        return;
//    //    }
//    
    this.x += (movement[0] * step);
    this.y += (movement[1] * step);
    
    if (movement[1] == -1){ // up
        //console.log("up");
        this.animation.setDirection(pacmanDirection.UP);
    } 
    
    if (movement[1] == 1){ // down
        //console.log("down");
        this.animation.setDirection(pacmanDirection.DOWN);
    }

    if (movement[0] == -1){ // left
        //console.log("left");
        this.animation.setDirection(pacmanDirection.LEFT);
    }
    
    if (movement[0] == 1){ // right
        //console.log("right");
        this.animation.setDirection(pacmanDirection.RIGHT);
    }
    
}

Pacman.prototype.collision = function (ghost) {
    //    console.log("pac x: "+ this.x +" pac y: " +this.y);
    //    console.log("ghost x: "+ ghost.x +" ghost y: " +ghost.y);
    var x = Math.abs(this.x - ghost.x);
    //    console.log("x: "+x);
    var y = Math.abs(this.y - ghost.y);
    //    console.log("y: "+y);
    var dist = Math.sqrt(x*x+y*y);
    //    console.log("dist: "+dist);
    if (dist < 25) {
        console.log("COLLISION");
        return true;
    }
    return false;
}

Pacman.prototype.animate = function(){
    this.animation.next();
}


Pacman.prototype.changeColour = function(colour){
    this.colour = colour;
}

Pacman.prototype.draw = function(context){  
    this.animation.draw(context, this.x, this.y);
}

function Ghost (x,y, context, sprite){
    this.x=x;
    this.y=y;
    this.context = context;
    //this.animation = new Animation ($("#ghostsprite")[0],0,40,36);
    this.animation = new Animation (sprite,0,40,36);

}

Ghost.prototype.clear = function(){
    this.context.clearRect(this.x,this.y,40,36);
    this.context.fillStyle="rgb(195,195,195)";
    this.context.fillRect(this.x,this.y, 40,36);
}

Ghost.prototype.draw = function(context) {
    this.animation.draw(context, this.x, this.y);
}

Ghost.prototype.animate = function(){
    this.animation.next();
}
Ghost.prototype.move = function (){
    this.clear();
    var step = 8;
    if (this.x < 560) {
        this.x += step;
        this.animation.setDirection(ghostDirection.HORIZONTAL);
    }else if (this.y < 390){
        this.y += step;
        this.animation.setDirection(ghostDirection.VERTICAL);
    }else {
        this.x = 40;
        this.y = 40;
    }
    
}

//function Field (context){
//    this.context = context;
//    this.image = '<img src="img/omaghost.png">';
//    this.x = 0;
//    this.y = 0;
//    
//}
////Ei piirrä -> Uncaucht type error
//Field.prototype.draw = function (){
//   
//    this.context.drawImage(this.image, this.x, this.y);
//}