//"use strict";

var highscore = {
    model: {},
    view:{}
};

highscore.view.View = Backbone.View.extend({
      
    el: $("body"),
    initialize: function(){
        console.log("highscore initialize");
        //        var html = " ";
        //        $("body").html(html);
        $("#highscore").append('<h2>Highscores!</h2>');
    //        $("#navi").append('<nav id ="navigation"></nav>');
    //        $("#navigation").append('<ol id ="menu"></ol>');
    //        $("#menu").append('<li><a href="#">Add game</a></li>');
    //        $("#menu").append('<li><a href="#">List games</a></li>');
       
    },
    events: {
    //"click a:nth(0)": "add",
    //"click a:nth(1)": "render", 
    // "click #addGame": "save"
    },
    render: function(){
            console.log("highscore render");
        
        var data = {
            "list": this.model.toJSON()
            
        };
        var html = Mustache.render($("#highscoreTemplate").html(), data);
        $("#highscore").html(html);
        
    },
       
    add: function(e) {
        //console.log("addview");
        var data= null;
        var html = Mustache.render($("#addHighscoreTemplate").html(), data);
        $("#highscore").html(html);
        
    },
    
    serialize: function() {
        return {
            score: pacmanGame.man.getPoints()
        }
    },
    
    save: function() {
        console.log("save");
        var data = this.serialize();
      
        try {
            console.log("save modelissa nyt: "+this.model.toJSON());
            this.model.reset();
            this.model.add(data);
            
            console.log("lisäyksen jälkeen: "+this.model.toJSON());
            
            
        } catch (err) {
            alert(err);
            return;
        }
    }
});


highscore.model.HighScore = Backbone.Model.extend({
    defaults: {
        "score":"0000"
               
    },
    initialize: function(){
        this.save();
    } 
});

highscore.model.HighScoreList = Backbone.Collection.extend({
    url: "http://aqueous-ravine-5531.herokuapp.com/app/games/7/scores/",
    model: highscore.model.HighScore 
});

function getHighScores(){
    console.log("getHighScores");
    var highScoreCollection = new highscore.model.HighScoreList();
    highScoreCollection.fetch({
        add:true,
        success: function() {
            console.log("success: "+highScoreCollection.toJSON());
            var highScoreView = new highscore.view.View({
                model:highScoreCollection
            });
            highScoreView.save();
            highScoreView.render();
            
        }
        
        
});
}





//$(document).ready(function(){
//    var highScoreCollection = new highscore.model.HighScoreList();
//    highScoreCollection.fetch({
//        add:true,
//        success: function() {
//            //console.log("success: "+gameCollection);
//            var highScoreView = new highscore.view.View({
//                model:highScoreCollection
//            });
//        }
//    });

    
//    gameCollection.each( function( obj ){
//        console.log(obj);
//    } );
    

    
//})
//[{"id":14,"score":360,"game":{"id":7,"name":"pacman"}},{"id":15,"score":1000,"game":{"id":7,"name":"pacman"}}]