"use strict";


function Sammakko (x,y,leveys,korkeus, vari){
    this.x=x;
    this.y=y;
    this.leveys=leveys;
    this.korkeus=korkeus;
    this.vari = vari;
}

Sammakko.prototype.annaX = function(){
    return this.x;
}

Sammakko.prototype.annaY = function(){
    return this.y;
}
Sammakko.prototype.annaL = function(){
    return this.leveys;
}

Sammakko.prototype.annaK = function(){
    return this.korkeus;
}


Sammakko.prototype.vaihdaVari = function(vari){
    this.vari = vari;
}

Sammakko.prototype.piirra = function(konteksti){
    konteksti.fillStyle=this.vari;
    konteksti.fillRect(this.x, this.y, this.leveys, this.korkeus);
//    var jansmakko = canvas.rect(this.x, this.y, this.leveys, this.korkeus);
//    jansmakko.attr("fill",this.vari);
//    return jansmakko;
}

Sammakko.prototype.poista = function(konteksti){
    konteksti.clearRect(this.x, this.y, this.leveys, this.korkeus);

//    jansmakko.remove();

}

Sammakko.prototype.siirra = function(xJay){
    var x=xJay[0];   
    var y=xJay[1];
    if (x === 0 && y === -1){ //up
        this.y -= 10;/*this.korkeus;*/
        if (this.y <= 50){ //perillä
            this.y = 50;
            //sammakkoPeli.tulos = 1;
        }
        //console.log("y: "+this.y);
        return;
    }
    if (x === 0 && y === 1){ //down
        this.y += 10;/*this.korkeus;*/
        return;
    }
    if (x === -1 && y === 0){ //left
        this.x -= 10; /*this.leveys;*/
        return;
    }
    if (x === 1 && y === 0){ //right
        this.x += 10;/*this.leveys;*/
        return;
    }
    
    
    
}


Sammakko.prototype.loikkaa = function(konteksti){
    console.log("sammakko loikkaa");
    //this.poista(konteksti);
    this.siirra(keyhandler.getMovement());
    console.log(keyhandler.getMovement());
    this.piirra(konteksti);
}
function Auto (x,y,leveys,korkeus, vari){
    this.x=x;
    this.y=y;
    this.leveys=leveys;
    this.korkeus=korkeus;
    this.vari = vari;
}
Auto.prototype.annaX = function(){
    return this.x;
}

Auto.prototype.annaY = function(){
    return this.y;
}
Auto.prototype.annaL = function(){
    return this.leveys;
}

Auto.prototype.annaK = function(){
    return this.korkeus;
}


Auto.prototype.piirra = function(konteksti){
    konteksti.fillStyle=this.vari;
    konteksti.fillRect(this.x, this.y, this.leveys, this.korkeus);
//    var uusiAuto = canvas.rect(this.x, this.y, this.leveys, this.korkeus);
//    uusiAuto.attr("fill",this.vari);
}
Auto.prototype.pyyhi = function(konteksti){
    konteksti.clearRect(this.x, this.y, this.leveys, this.korkeus);
}

Auto.prototype.siirra = function(){
    this.x -= 1;
    if (this.x <= 50){
        return 1;
    }
    
}
Auto.prototype.aja = function(konteksti){
    console.log("aja");
    //this.pyyhi();
    var yli = this.siirra();
    if (yli == 1){
        return 1;
    }
    this.piirra(konteksti);
}

function Autot (konteksti){
    this.konteksti = konteksti;
    this.autoLista = new Array();
}

Autot.prototype.piirra = function(){
    for (var i in this.autoLista){
        this.autoLista[i].piirra(this.konteksti);
    }
}


Autot.prototype.lisaa = function(auto){
    this.autoLista.push(auto);
}
Autot.prototype.poistaEka = function(){
    this.autoLista.shift();
}
Autot.prototype.siirra = function(){
  var yli = 0;
    for (var i in this.autoLista){
        //console.log(this.autoLista[i]);
        var a = this.autoLista[i];
        yli = a.aja(this.konteksti);
    }
    if (yli == 1) {
        this.poistaEka();
    }
    
}
Autot.prototype.tarkistaKolarit = function(sammakko){
   
    for (var i in this.autoLista){
        if (this.autoLista[i].annaX()+this.autoLista[i].annaL <=sammakko.annaX()){
            return 0;
        }
        if (this.autoLista[i].annaX() >= sammakko.annaX()+sammakko.annaL()){
            return 0;
        }
        if(this.autoLista[i].annaY()+this.autoLista[i].annaK()<=sammakko.annaK()){
            return 0;
        }
        if(this.autoLista[i].annaY()>=sammakko.annaY()+sammakko.annaK()){
            return 0;
        }
         
    }
    return 1;
    
}

var autoMallit = [
[470, 105, 80, 50, "rgb(119,136,153)"],
[470, 165, 80, 50, "rgb(119,136,153)"],
[470, 225, 80, 50, "rgb(119,136,153)"],
[470, 285, 80, 50, "rgb(119,136,153)"]
];

function luoAutot(autoLista){
    //for (var i in autoMallit){
    var rivi = autoMallit[Math.floor((Math.random()*3)+1)];
    var uusiAuto = new Auto(rivi[0],rivi[1],rivi[2],rivi[3],rivi[4]);
    autoLista.lisaa(uusiAuto);
// } 
       
}

function muutaAutokantaa(autoLista){
    
    if (Math.floor((Math.random()*100)+1)<5){
        
        var indeksi = Math.floor((Math.random()*3)+1);  
        var rivi = autoMallit[indeksi];
        autoLista.lisaa(new Auto(rivi[0],rivi[1],rivi[2],rivi[3],rivi[4]));
    }
    
}
function autojenSijainti(autoLista, sammakko){
    //var kolari = 1;
    var kolari = 0;
    for (var i in autoLista){
         console.log(autoLista[i]);
         
//         if (autoLista[i].annaX()+autoLista[i].annaL() <= sammakko.annaX()){
//             kolari = 0;
//         }
//         if (autoLista[i].annaX() >= sammakko.annaX() + sammakko.annaL()){
//             kolari = 0;
//         }
//         if (autoLista[i].annaY()+autoLista[i].annaK() <= sammakko.annaY()){
//             kolari = 0;
//         }
//         if (autoLista[i].annaY() >= sammakko.annaY() + sammakko.annaK()){
//             kolari = 0;
//         }
         
    }
    if (kolari == 1){
        //sammakkoPeli.tulos = -1;
    }
    
}


//function piirraHahmot (canvas, sammakko){
//    //console.log("piirraHahmot");
//    requestAnimFrame(piirraHahmot(canvas,sammakko));
//    var piirretty = sammakko.piirra(canvas);
//    
//    muutaSammakkoa(sammakko);
//    piirretty.remove();
//    var piirretty = sammakko.piirra(canvas);
////render();
//    
//}

//function muutaSammakkoa(sammakko){
//    var indeksi = Math.floor((Math.random()*3)+1); 
//    var varit =["rgb(75,103,168)","rgb(168,75,168)","rgb(239,246,22)","rgb(22,239,246)"];
//    sammakko.vaihdaVari(varit[indeksi]);
//}
//
//function piirraPohja(konteksti){
//    //autobaana
//    konteksti.fillStyle="rgb(105,105,105)";
//    konteksti.fillRect(50,50, 500,350);
//    
//    //yläpalkki
//    konteksti.fillStyle="rgb(190,190,190)";
//    konteksti.fillRect(50,50, 500,50);
//    //alapalkki
//    konteksti.fillStyle="rgb(190,190,190)";
//    konteksti.fillRect(50,350, 500,50);
    
//Och samma med Raphael
//    var autobaana = canvas.rect(50,50, 500,350);
//    autobaana.attr("fill","rgb(105,105,105)");
//        
//    //alert("hetkinen...");
//    var alapalkki = canvas.rect(50,350, 500,50);
//    alapalkki.attr("fill","rgb(190,190,190)");
//    //alert("ja vielä hetki");
//    var ylapalkki = canvas.rect(50,50, 500,50);
//    ylapalkki.attr("fill","rgb(190,190,190)");
       
//}


//$(document).ready(function(){
//    console.log("dokkari valmis");
//    //    var canvas = Raphael(10, 10, 600, 400);
//    var konteksti = $("#alusta")[0].getContext("2d");
//    piirraPohja(konteksti);
//    
//    $(document).keyup(function(eventInfo) {
//        keyhandler.keyup(eventInfo.which);
//    });
//        
//    $(document).keydown(function(eventInfo) {
//        keyhandler.keydown(eventInfo.which);
//    });
//    var sammakko = new Sammakko (100, 350, 50, 50, "rgb(85,107,47)")
//    piirraHahmot(canvas, sammakko);
//
//})
