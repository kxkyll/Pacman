var path = new Array();


function drawField (context){
        //set fill colour
        context.fillStyle="rgb(25,25,112)";
        
        //uppder border
        context.fillRect(0,0,640,40);
        
        //lower border
        context.fillRect(0,440,640,40);
        
        //right border
        context.fillRect(600,0,40,480);
        
        //left border
        context.fillRect(0,0,40,480);
        
        //upper left corner
        context.fillRect(80,80,40,80);
        context.fillRect(80,80,120,40);
        
        //lower left corner
        context.fillRect(80,200,40,200);
        context.fillRect(80,360,80,40);

        //upper mid
        context.fillRect(240,80,80,40);
        context.fillRect(240,80,40,160);
        context.fillRect(160,200,120,40);

        //ghost cage
        //context.fillRect(320,160,160,40);
        //context.fillRect(320,160,40,160);
        context.fillRect(320,200,40,120);
        context.fillRect(440,200,40,120);
        context.fillRect(320,280,160,40);
        
        //lower mid
        context.fillRect(200,360,160,40);
        
        //even lower mid
        context.fillRect(160,280,120,40);
        

        //upper right corner
        context.fillRect(360,80,200,40);
        context.fillRect(520,80,40,160);
        
        //lower right corner
        context.fillRect(400,360,120,40);
        context.fillRect(520,280,40,120);
                
}


