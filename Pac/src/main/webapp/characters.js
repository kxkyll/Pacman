function Pacman (x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.colour = "rgb(255,255,0)";
//console.log("pacman luotu");
}

Pacman.prototype.getX = function(){
    return this.x;
}
Pacman.prototype.getY = function(){
    return this.y;
}
Pacman.prototype.getR = function(){
    return this.r;
}
//Pacman.prototype.setX = function(x){
//    this.x = x;
//}
//Pacman.prototype.setY = function(y){
//    this.y = y;
//}

Pacman.prototype.move = function(xAndy){
    var step = 10;
    var x=xAndy[0];   
    var y=xAndy[1];
    console.log("x: "+x);
    console.log("y: "+y);
    if (x === 0 && y === -1){ //up
        console.log("up");
        this.y -= step;
        return;
    }
    if (x === 0 && y === 1){ //down
        console.log("down");
        this.y += step;
        return;
    }
    if (x === -1 && y === 0){ //left
        console.log("left");
        this.x -= step; 
        return;
    }
    if (x === 1 && y === 0){ //right
        console.log("right");
        this.x += step;
        return;
    }
    
    
    
}



Pacman.prototype.changeColour = function(colour){
    this.colour = colour;
}

Pacman.prototype.draw = function(context){
    //console.log("pacmania piirtämässä");    
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2* Math.PI, false);
    context.fillStyle=this.colour;
    context.fill();
    //context.lineWidth =2;
    //context.strokeStyle = '#003300';
    context.stroke();

}


