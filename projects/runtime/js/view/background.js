var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
       
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'midnightBlue');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            for (var i = 0;i <= 1000; i++) { //loops them stars
            var circle = draw.circle(1,'white','LightGray',2); //a variable that stores the info on making a star
            circle.x = canvasWidth*Math.random();//circle.x/y sets the star in a random location by multiplying it by a tandom decimal between .1 and .99
            circle.y = groundY*Math.random();
            background.addChild(circle); // adds the circles to the backgroud

            }
            var moon = draw.bitmap('img/moon.png'); //created a variabl called moon Draw.bitmap draws the image
            moon.x = canvasWidth - 1800; //moon.x/y is sets where the moon is 
            moon.y = groundY - 400;
            moon.scaleX = 0.7; // scale.x/y controle the size of da moon 
            moon.scaleY = 0.7;
            background.addChild(moon); //adds a child who gives us the moon
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<15;i++) {
                var buildingHeight =  100 +Math.random() * 400  ;
                var building = draw.rect(105 + Math.random() * 50,buildingHeight,'LightGray','Black',1); // creats a variable called building 
                building.x = 150*i; //set the x of the building 200 pixals from the next building 
                building.y = groundY-buildingHeight; //sets the y of the uilding off groundY - building height 
                background.addChild(building); //adds buildings to the background 
                buildings.push(building); // push each building to the buuilding array
                
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/trees.png'); // assigns the image of tree to the tree variable 
        tree.x = 1200; //sets x position of tree
        tree.y = canvasHeight - 850; // sets y position of tree
        tree.scaleX = .4;
        tree.scaleY = .4;
        background.addChild(tree); //has a child hold our tree
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1;

            if(tree.x < -200) {
            tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - 0.5 ; //moves the buildings to the left
                if (buildings[i].x < -150) { //creates an if statement thats activated when buildings' x position is equal to zero
                    buildings[i].x = canvasWidth + 200; //when a building moves off the left of the screen it moves it back to the right side 
                }
             }
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
