function Animation (image, row, width, height){
    //console.log("row: "+row +" width: " +width +" heigth: " +height );
    this.image = image;
    this.frameWidth = width;
    this.frameHeight = height;
    this.currentX = 0;
    this.currentY = row;
}

Animation.prototype.setDirection = function (row){
    this.currentY = row;
}

Animation.prototype.next = function (){
    //console.log("currentX: "+this.currentX);
    this.currentX += this.frameWidth;
    //console.log("next currentX: "+this.currentX);
    if (this.currentX < this.image.width){ // Everything OK, not yet out of image 
        return;
    }
    
    this.currentX = 0; // Beginning of picture
}

Animation.prototype.draw = function (context, positionXcanvas, positionYcanvas){
    context.drawImage(this.image, this.currentX, this.currentY,
        this.frameWidth, this.frameHeight, positionXcanvas, positionYcanvas,
        this.frameWidth, this.frameHeight);
}