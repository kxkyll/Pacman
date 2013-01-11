function Node (){
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
}
function createNavi(){
    //create array
    var fieldNavi = new Array(2);
    //make array two dimensional
    for (var k = 0; k < 481; k++) {
        fieldNavi[k] = new Array(640);
    }
    //init array 
    for (var i = 0; i < 481; i++) {
        for (var j = 0; j < 641; j++) {
            fieldNavi[i][j] = new Node();
        }
    }
    
    
    // row 1
    for (var x1 = 45; x1 < 561; x1++){
        fieldNavi[80][x1].left = true;
    }
    
    for (var x1 = 40; x1 < 561; x1++){
        fieldNavi[80][x1].right = true;
    }
    
    fieldNavi[40][40].down = true;
    
    //    
    //    // row 2
    //    fieldNavi[80][40] = true;
    //    fieldNavi[80][200] = true;
    //    fieldNavi[80][320] = true;
    //    fieldNavi[80][560] = true;
    //    
    //    //row 3
    //    fieldNavi[120][40] = true;
    //    
    //    for (var x31 = 120; x31 < 201; x31++){
    //        fieldNavi[120][x31] = true;
    //    }
    //    for (var x32 = 280; x32 < 481; x32++){
    //        fieldNavi[120][x32] = true;
    //    }
    //    
    //    fieldNavi[120][560] = true;
    //    
    //    //row 3,5
    //    for (var x35 = 120; x35 < 201; x35++){
    //        fieldNavi[130][x35] = true;
    //        fieldNavi[140][x35] = true;
    //        fieldNavi[150][x35] = true;
    //    }
    //    for (var x352 = 280; x352 < 481; x352++){
    //        fieldNavi[130][x352] = true;
    //        fieldNavi[140][x352] = true;
    //        fieldNavi[150][x352] = true;
    //    }
    //    
    //    
    //    //row 4
    //    for (var x4 = 40; x4 < 201; x4++){
    //        fieldNavi[160][x4] = true;
    //    }
    //    for (var x42 = 280; x42 < 481; x42++){
    //        fieldNavi[160][x42] = true;
    //    }
    //    
    //    fieldNavi[160][560] = true;
    //    
    //    //row 5
    //    fieldNavi[200][40] = true;
    //    fieldNavi[200][120] = true;
    //    fieldNavi[200][280] = true;
    //    for (var x5 = 360; x5 < 401; x5++){
    //        fieldNavi[200][x5] = true;
    //    }
    //    
    //    fieldNavi[200][480] = true;
    //    fieldNavi[200][560] = true;
    //    
    //    //row 6
    //    fieldNavi[240][40] = true;
    //    for (var x6 = 120; x6 < 281; x6++){
    //        fieldNavi[240][x6] = true;
    //    }
    //    for (var x62 = 360; x62 < 401; x62++){
    //        fieldNavi[240][x62] = true;
    //    }
    //    for (var x63 = 480; x63 < 561; x63++){
    //        fieldNavi[240][x63] = true;
    //    }
    //    
    //    //row 7
    //    fieldNavi[280][40] = true;
    //    fieldNavi[280][120] = true;
    //    fieldNavi[280][280] = true;
    //    fieldNavi[280][480] = true;
    //    fieldNavi[280][560] = true;
    //    
    //    //row 8
    //    fieldNavi[320][40] = true;
    //    
    //    for (var x8 = 120; x8 < 481; x8++){
    //        fieldNavi[320][x8] = true;
    //    }
    //    fieldNavi[320][560] = true;
    //    
    //    //row 9
    //    fieldNavi[360][40] = true;
    //    fieldNavi[360][160] = true;
    //    fieldNavi[360][360] = true;
    //    fieldNavi[360][560] = true;
    //    
    //    //row 10
    //    
    //    for (var x10 = 40; x10 < 561; x10++){
    //        fieldNavi[400][x10] = true;
    //    }
    //    
    //    //vertical row 1
    //    for (var y1 = 40; y1 < 401; y1++){
    //        fieldNavi[y1][40] = true;
    //    }
    //    
    //    //vertical row 2
    //    
    //    //vertical row 3
    //    for (var y3 = 120; y3 < 321; y3++){
    //        fieldNavi[y3][120] = true;
    //    }
    //    
    //    //vertical row 4
    //    for (var y4 = 120; y4 < 161; y4++){
    //        fieldNavi[y4][160] = true;
    //    }
    //    
    //    for (var y42 = 320; y42 < 401; y42++){
    //        fieldNavi[y42][160] = true;
    //    }
    //    
    //    //vertical row 5
    //    for (var y5 = 40; y5 < 161; y5++){
    //        fieldNavi[y5][200] = true;
    //    }
    //    
    //    //vertical row 6
    //    
    //    //vertical row 7
    //    for (var y7 = 120; y7 < 321; y7++){
    //        fieldNavi[y7][280] = true;
    //    }
    //    
    //    //vertical row 8
    //    for (var y8 = 40; y8 < 161; y8++){
    //        fieldNavi[y8][320] = true;
    //    }
    //    
    //    //vertical row 9
    //    for (var y9 = 120; y9 < 241; y9++){
    //        fieldNavi[y9][360] = true;
    //    }
    //    
    //    
    //    for (var y92 = 320; y92 < 401; y92++){
    //        fieldNavi[y92][360] = true;
    //    }
    //    //vertical row between 9 and 10
    //    
    //    for (var y9 = 120; y9 < 241; y9++){
    //        fieldNavi[y9][370] = true;
    //    }
    //    for (var y9 = 120; y9 < 241; y9++){
    //        fieldNavi[y9][380] = true;
    //    }
    //    for (var y9 = 120; y9 < 241; y9++){
    //        fieldNavi[y9][390] = true;
    //    }
    //    
    //    
    //    
    //    //vertical row 10
    //    for (var y10 = 120; y10 < 241; y10++){
    //        fieldNavi[y10][400] = true;
    //    }
    //    
    //    //vertical row 11
    //    for (var y11 = 120; y11 < 161; y11++){
    //        fieldNavi[y11][440] = true;
    //    }
    //    
    //    //vertical row 12
    //    for (var y12 = 120; y12 < 321; y12++){
    //        fieldNavi[y12][480] = true;
    //    }
    //    
    //    //vertical row 13
    //    
    //    //vertical row 14
    //    for (var y2 = 40; y2 < 401; y2++){
    //        fieldNavi[y2][560] = true;
    //    }
    //    
    
            
    return fieldNavi;
}

function createPath(){
    //create array
    var fieldPath = new Array(2);
    //make array two dimensional
    for (var k = 0; k < 481; k++) {
        fieldPath[k] = new Array(640);
    }
    //init array with false
    for (var i = 0; i < 481; i++) {
        for (var j = 0; j < 641; j++) {
            fieldPath[i][j] = false;
        }
    }
    
    //mark the possible pathways with true
    // todo: try to get this nicer by using context.getImageData to figure out the
    // path by reading the color from the canvas 
    // -> requires server to be started due to security constraints
    
    // row 1
    for (var x1 = 40; x1 < 561; x1++){
        fieldPath[40][x1] = true;
    }
    
    // row 2
    fieldPath[80][40] = true;
    fieldPath[80][200] = true;
    fieldPath[80][320] = true;
    fieldPath[80][560] = true;
    
    //row 3
    fieldPath[120][40] = true;
    
    for (var x31 = 120; x31 < 201; x31++){
        fieldPath[120][x31] = true;
    }
    for (var x32 = 280; x32 < 481; x32++){
        fieldPath[120][x32] = true;
    }
    
    fieldPath[120][560] = true;
    
    //row 3,5
    for (var x35 = 120; x35 < 201; x35++){
        fieldPath[130][x35] = true;
        fieldPath[140][x35] = true;
        fieldPath[150][x35] = true;
    }
    for (var x352 = 280; x352 < 481; x352++){
        fieldPath[130][x352] = true;
        fieldPath[140][x352] = true;
        fieldPath[150][x352] = true;
    }
    
    
    //row 4
    for (var x4 = 40; x4 < 201; x4++){
        fieldPath[160][x4] = true;
    }
    for (var x42 = 280; x42 < 481; x42++){
        fieldPath[160][x42] = true;
    }
    
    fieldPath[160][560] = true;
    
    //row 5
    fieldPath[200][40] = true;
    fieldPath[200][120] = true;
    fieldPath[200][280] = true;
    for (var x5 = 360; x5 < 401; x5++){
        fieldPath[200][x5] = true;
    }
    
    fieldPath[200][480] = true;
    fieldPath[200][560] = true;
    
    //row 6
    fieldPath[240][40] = true;
    for (var x6 = 120; x6 < 281; x6++){
        fieldPath[240][x6] = true;
    }
    for (var x62 = 360; x62 < 401; x62++){
        fieldPath[240][x62] = true;
    }
    for (var x63 = 480; x63 < 561; x63++){
        fieldPath[240][x63] = true;
    }
    
    //row 7
    fieldPath[280][40] = true;
    fieldPath[280][120] = true;
    fieldPath[280][280] = true;
    fieldPath[280][480] = true;
    fieldPath[280][560] = true;
    
    //row 8
    fieldPath[320][40] = true;
    
    for (var x8 = 120; x8 < 481; x8++){
        fieldPath[320][x8] = true;
    }
    fieldPath[320][560] = true;
    
    //row 9
    fieldPath[360][40] = true;
    fieldPath[360][160] = true;
    fieldPath[360][360] = true;
    fieldPath[360][560] = true;
    
    //row 10
    
    for (var x10 = 40; x10 < 561; x10++){
        fieldPath[400][x10] = true;
    }
    
    //vertical row 1
    for (var y1 = 40; y1 < 401; y1++){
        fieldPath[y1][40] = true;
    }
    
    //vertical row 2
    
    //vertical row 3
    for (var y3 = 120; y3 < 321; y3++){
        fieldPath[y3][120] = true;
    }
    
    //vertical row 4
    for (var y4 = 120; y4 < 161; y4++){
        fieldPath[y4][160] = true;
    }
    
    for (var y42 = 320; y42 < 401; y42++){
        fieldPath[y42][160] = true;
    }
    
    //vertical row 5
    for (var y5 = 40; y5 < 161; y5++){
        fieldPath[y5][200] = true;
    }
    
    //vertical row 6
    
    //vertical row 7
    for (var y7 = 120; y7 < 321; y7++){
        fieldPath[y7][280] = true;
    }
    
    //vertical row 8
    for (var y8 = 40; y8 < 161; y8++){
        fieldPath[y8][320] = true;
    }
    
    //vertical row 9
    for (var y9 = 120; y9 < 241; y9++){
        fieldPath[y9][360] = true;
    }
    
    
    for (var y92 = 320; y92 < 401; y92++){
        fieldPath[y92][360] = true;
    }
    //vertical row between 9 and 10
    
    for (var y93 = 120; y9 < 241; y9++){
        fieldPath[y9][370] = true;
    }
    for (var y94 = 120; y9 < 241; y9++){
        fieldPath[y9][380] = true;
    }
    for (var y95 = 120; y9 < 241; y9++){
        fieldPath[y9][390] = true;
    }
    
    
    
    //vertical row 10
    for (var y10 = 120; y10 < 241; y10++){
        fieldPath[y10][400] = true;
    }
    
    //vertical row 11
    for (var y11 = 120; y11 < 161; y11++){
        fieldPath[y11][440] = true;
    }
    
    //vertical row 12
    for (var y12 = 120; y12 < 321; y12++){
        fieldPath[y12][480] = true;
    }
    
    //vertical row 13
    
    //vertical row 14
    for (var y2 = 40; y2 < 401; y2++){
        fieldPath[y2][560] = true;
    }
    
    
            
    return fieldPath;
}
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


