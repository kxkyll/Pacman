var pacmanDirection = {
    RIGHT: 0,
    LEFT: 39,
    UP: 80,
    DOWN:120
//    RIGHT: 0,
//    LEFT: 36,
//    UP: 72,
//    DOWN:106
}

var ghostDirection = {
    VERTICAL:0,
    HORIZONTAL: 38
}


function Pacman (x,y, context){
    this.x=x;
    this.y=y;
    this.context = context;
    this.animation = new Animation ($("#pacsprite")[0],0,40,39);
}

Pacman.prototype.getX = function(){
    return this.x;
}
Pacman.prototype.getY = function(){
    return this.y;
}

Pacman.prototype.clear = function(){
    //this.context.clearRect(this.x,this.y,40,36);
    this.context.clearRect(this.x,this.y,40,40);
    this.context.fillStyle="rgb(195,195,195)";
    this.context.fillRect(this.x,this.y, 40,40);
}

Pacman.prototype.move = function(movement,path){
    this.clear();
    var step = 10;
    var newx = this.x + (movement[0] * step);
    var newy = this.y + (movement[1] * step);
    //    console.log("newx: "+newx +" newy "+newy);
    //    console.log("path: "+path[newy][newx]);
    if (!path[newy][newx]){
        //console.log ("Wrong direction");
        return;
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