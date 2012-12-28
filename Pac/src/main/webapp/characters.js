function Pacman (x,y,r){
    this.x=x;
    this.y=y;
    this.r=r;
    this.colour = "rgb(255,255,0)";
    console.log("pacman luotu");
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

Pacman.prototype.changeColour = function(colour){
    this.colour = colour;
}

Pacman.prototype.draw = function(context){
    console.log("pacmania piirtämässä");    
    context.beginPath();
    
    context.arc(this.x, this.y, this.r, 0, 2* Math.PI, false);
    context.fillStyle=this.colour;
    context.fill();
    context.lineWidth =2;
    context.strokeStyle = '#003300';
    context.stroke();

}


