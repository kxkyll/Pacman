function Food (x,y,context){
    this.x=x;
    this.y=y;
    this.r=5;
    this.context=context;
}

Food.prototype.draw = function(){
    this.context.fillStyle="white";
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.r, 0, 2* Math.PI, false);
    //this.context.fillStyle=this.colour;
    this.context.fill();
//    this.context.lineWidth =2;
//    this.context.strokeStyle = '#003300';
//    this.context.stroke();
}

createFood = function(path,context){
    var foods = new Array();
    var foodCount = 0;
    for (var i = 0; i < 481; i+=40) {
        
        for (var j = 0; j < 641; j+=40) {
            if (path[i][j] == true){
                //console.log("ruokaa: "+i +" "+j);
                foods[foodCount] = new Food(j+20,i+20,context);
                foods[foodCount].draw();            
                foodCount++;
            }
        }
    }
    return foods;
}
drawFoods = function(foods,context){
    for (f in foods){
        foods[f].draw();            
    }
        
}