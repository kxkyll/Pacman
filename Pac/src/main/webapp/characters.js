var pacmanDirection = {
    RIGHT: 0,
    LEFT: 37,
    UP: 74,
    DOWN:112
//    RIGHT: 0,
//    LEFT: 36,
//    UP: 72,
//    DOWN:106
}

var ghostDirection = {
    UP:0,
    DOWN:1,
    LEFT:2,
    RIGHT:3
}

var ghostOrientation = {
    VERTICAL:0,
    HORIZONTAL: 38
}

function Pacman (x,y, context){
    this.x=x;
    this.y=y;
    this.context = context;
    this.animation = new Animation ($("#pacsprite")[0],0,37,37);
}

Pacman.prototype.getX = function(){
    return this.x;
}
Pacman.prototype.getY = function(){
    return this.y;
}

Pacman.prototype.clear = function(){
    //this.context.clearRect(this.x,this.y,40,36);
    this.context.clearRect(this.x,this.y,37,37);
    this.context.fillStyle="rgb(195,195,195)";
    this.context.fillRect(this.x,this.y, 38,38);
}

Pacman.prototype.move = function(movement,path,foods){
    this.clear();
    var step = 10;
    var newx = this.x + (movement[0] * step);
    var newy = this.y + (movement[1] * step);
    //var foodsleft =new Array();
    //foodsleft = foods;
    //    console.log("newx: "+newx +" newy "+newy);
    //    console.log("path: "+path[newy][newx]);
    if (!path[newy][newx]){
        //console.log ("Wrong direction");
        return foods;
    }
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
    if (movement[0] == 0 && movement[1] == 0){ // pacman has not moved
        //console.log("pacman not moving");    
    }else{
        //console.log("pacman has moved, go eat");
        foods = this.eat(foods);
    }
    return foods;
    
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
    if (dist < 35) {
        console.log("COLLISION");
        return true;
    }
    return false;
}

Pacman.prototype.eat = function (foods) {
    var remove = null;
    for (var i = 0; i< foods.length;i++){
        var x = Math.abs((this.x+20) - foods[i].x);
        var y = Math.abs((this.y+20) - foods[i].y);       
        var dist = Math.sqrt(x*x+y*y);       
        if (dist <= 10) {
            remove = i;
        }            
    }
    if (remove != null){
        foods.splice(remove,1);
    }
    
    
    return foods;
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
    this.speed = 5;
    this.targetX = 0;
    this.targetY = 0;
    this.direction = ghostDirection.UP;

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

Ghost.prototype.setSpeed = function(speed){
    this.speed = speed;
}

Ghost.prototype.setTarget = function(target){
    this.targetX = target[0];
    this.targetY = target[1];
}

Ghost.prototype.ramble = function(path){
    var step = 5;
    var random = Math.floor(Math.random()*11);
    //console.log("random " +random)
    var newx = null;
    var newy = null;
    
    if (random === 0|| random  == 4){ //up
        //console.log("nolla "+this.y);
        newy = this.y - step;
        //console.log("path: "+path[newy][this.x]);
        var u = 0;
        while (u <= random){
            if (path[newy][this.x]){ //is ok to go up
            
                this.clear();
                this.y = newy;
                //                console.log("uusi y ok " +this.y);
                this.draw(this.context);
                
            }
            u++;
            newy = this.y -step;
        }
        return;
    }
    if (random === 1 || random == 9){ //down
        newy = this.y + step;
        //console.log("path: "+path[newy][this.x]);
        var d = 0;
        while (d <= random){
            if (path[newy][this.x]){ //is ok to go down

                this.clear();
                this.y = newy;
                //              console.log("uusi y ok " +this.y);
                this.draw(this.context);   
            
            }
            d++;
            newy = this.y + step;
        }
        return;
    }
        
    if (random === 2|| random ==5 || random == 6 || random == 10){ //right
        newx = this.x + step;
        //console.log("path: "+path[this.y][newx]);
        var r =0;
        while (r <= random){
            if (path[this.y][newx]){ //is ok to go right
           
                this.clear();
                this.x = newx;
                //            console.log("uusi x ok " +this.x);
                this.draw(this.context);   
            }
            r++;
            newx = this.x + step;
        }
        return;
    }
    if (random === 3 || random == 7 || random == 8){ //left
        newx = this.x - step;
        //console.log("path: "+path[this.y][newx]);
        var l = 0;
        while (l <= random){
            if (path[this.y][newx]){ //is ok to go left
               
                this.clear();
                this.x = newx;
                //              console.log("uusi x ok " +this.x);
                this.draw(this.context);   
                    
            }
            l++;
            newx = this.x - step;
        }
        return;
    }
   
        
}
    
Ghost.prototype.move = function (){
    this.clear();
    var step = 8;
    if (this.x < 560) {
        this.x += step;
        this.animation.setDirection(ghostOrientation.HORIZONTAL);
    }else if (this.y < 390){
        this.y += step;
        this.animation.setDirection(ghostOrientation.VERTICAL);
    }else {
        this.x = 40;
        this.y = 40;
    }
    
}

Ghost.prototype.navi = function (navi){
    var newx = this.x + this.speed;
    var newy;
    var directionOK = false;
    if (this.direction == ghostDirection.UP){ 
        console.log("current up");
        newy = this.y - this.speed;
        if (navi[newy][this.x].up){ //is ok to go up
            console.log("continue up");
            directionOK = true;
            this.clear();
            console.log("y: "+this.y);
            this.y = newy;
            console.log("newy: "+this.y);
        }
    }
    if (this.direction == ghostDirection.DOWN){ 
        console.log("current down");
        newy = this.y + this.speed;
        if (navi[newy][this.x].down){ //is ok to go down
            console.log("continue");
            directionOK = true;
            this.clear();
            console.log("y: "+this.y);
            this.y = newy;
            console.log("newy: "+this.y);
           
        }
    }    
    if (this.direction == ghostDirection.LEFT){ 
        console.log("current left");
        newx = this.x - this.speed;
        if (navi[this.y][newx].left){ //is ok to go left
            console.log("continue");
            directionOK = true;
            this.clear();
            console.log("x: "+this.x);
            this.x = newx;
            console.log("newx: "+this.x);
        } 
    }
    
    if (this.direction == ghostDirection.RIGHT){ 
        console.log("current right");
        newx = this.x + this.speed;
        if (navi[this.y][newx].right){ //is ok to go right
            console.log("continue");
            directionOK = true;
            this.clear();
            console.log("x: "+this.x);
            this.x = newx;
            console.log("newx: "+this.x);
        }
 
    } 
    if (directionOK == false){ // current direction hit's the wall       
        console.log("change current: " +this.direction);
        var newDirection = Math.floor(Math.random()*4);
        console.log(+this.direction + " another one "+newDirection);
        while (true){
            newDirection = Math.floor(Math.random()*4);
            console.log(+this.direction + " another one "+newDirection);
            if (this.direction != newDirection){
                break;
            }
                
        }
        console.log("ulkona");
        this.direction = newDirection;
    }       
    console.log("huh");
    
    if (this.direction == ghostDirection.UP || this.direction == ghostDirection.DOWN ){
        console.log("vertical");
        this.animation.setDirection(ghostOrientation.VERTICAL);
    }
    if (this.direction == ghostDirection.LEFT || this.direction == ghostDirection.RIGHT ){
        console.log("horizontal")
        this.animation.setDirection(ghostOrientation.HORIZONTAL);
    }
    console.log("piirtämään");
    this.draw(this.context);
}

Ghost.prototype.moveAround = function (path){
    var newx = null;
    var newy = null;
    
    if (this.direction == ghostDirection.UP){ 
       
        newy = this.y - this.speed;
        
        if (path[newy][this.x]){ //is ok to go up
            this.clear();
            this.y = newy;
        } else {
            this.direction = ghostDirection.RIGHT;
            //this.direction = Math.floor(Math.random()*4);
            return;
        }
    }
    if (this.direction == ghostDirection.DOWN){ 
       
        newy = this.y + this.speed;
        
        if (path[newy][this.x]){ //is ok to go down
            this.clear();
            this.y = newy;
        } else {
            this.direction = ghostDirection.LEFT;
            //this.direction = Math.floor(Math.random()*4);
            return;
        }
    }
    
    if (this.direction == ghostDirection.LEFT){ 
       
        newx = this.x - this.speed;
        
        if (path[this.y][newx]){ //is ok to go left
            this.clear();
            this.x = newx;
        } else {
            this.direction = ghostDirection.UP;
            //this.direction = Math.floor(Math.random()*4);
            return;
        }
    }
    
    if (this.direction == ghostDirection.RIGHT){ 
       
        newx = this.x + this.speed;
        
        if (path[this.y][newx]){ //is ok to go right
            this.clear();
            this.x = newx;
        } else {
            this.direction = ghostDirection.DOWN;
            //this.direction = Math.floor(Math.random()*4);
            return;
        }
    }
    
    if (this.direction == ghostDirection.UP || this.direction == ghostDirection.DOWN ){
        this.animation.setDirection(ghostOrientation.VERTICAL);
    }
    if (this.direction == ghostDirection.LEFT || this.direction == ghostDirection.RIGHT ){
        this.animation.setDirection(ghostOrientation.HORIZONTAL);
    }
}


Ghost.prototype.hunt = function (pacman){
    var newTarget = new Array();
    if (this.x == targetX && this.y == targetY) {
        newTarget[0] = pacman.getX();
        newTarget[1] = pacman.getY();
        this.setTarget(newTarget);
        return;
    }
        
        
}