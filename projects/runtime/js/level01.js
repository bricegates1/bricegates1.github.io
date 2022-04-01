var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "spike", "x": 400, "y": groundY -20 },
                { "type": "spike", "x": 600, "y": groundY - 20},
                { "type": "spike", "x": 900, "y": groundY - 20 },

                { "type": "enemy", "x": 1000, "y": groundY  - 20 },
                { "type": "enemy", "x": 700, "y": groundY - 50},
                { "type": "enemy", "x": 1500, "y": groundY - 20},
                
                { "type": "reward", "x": 2000, "y": groundY - 20},
                { "type": "reward", "x": 2400, "y": groundY - 20},
                { "type": "reward", "x": 2600, "y": groundY - 20},
                
                {"type": "dynamite", "x": 1600, "y": groundY - 10}
            ]
        };

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawblade ( x, y) { 
        var hitZoneSize = 15; //sets the size of the hitzone 25 pixles
var damageFromObstacle = 10; // damage from the obsticals 
var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates hitzone 
        
        sawBladeHitZone.x = x; //x position of the hitzone
        sawBladeHitZone.y = y; //y position of the hitzone 
        game.addGameItem(sawBladeHitZone); // adds the hitzone to the game
        var obstacleImage = draw.bitmap('img/spike.png'); //drawing our sawblade drawing 
        sawBladeHitZone.addChild(obstacleImage); //adds the image to the hitzone
        obstacleImage.x = -15; // moves the image's x position 25 to the left
        obstacleImage.y= -15; // moves the obstical image 25 up to center it on the hitbox
        obstacleImage.scaleX = 2;
        obstacleImage.scaleY = 2;
        
        };
           
        function createEnemy (x, y){
            var enemy = game.createGameItem('enemy',25); //creates the game item and stores it in variable enemy
            var enemyImage = draw.bitmap('img/soulEater.png');  //creates rectangle and stores as red square
            enemyImage.x = -55; 
            enemyImage.y = -55;
            enemy.addChild(enemyImage); //adds the red square to the enemy
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy); //adds enemy to the game
            enemy.velocityX = -1; //moves the volocity one pixle to the left 
            
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10)
               
                
            };
            enemy.onProjectileCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10)
                game.increaseScore(100);
                enemy.fadeout();
            };
        }
        function createReward (x, y){
            var reward = game.createGameItem('reward',25); //creates the game item and stores it in variable reward
            var blueSquare = draw.rect(50,50,'blue'); //creates rectangle and stores as blue square
            blueSquare.x = -25; 
            blueSquare.y = -25;
            reward.addChild(blueSquare); //adds the blue square to the reward
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward); //adds reward to the game
            reward.velocityX = -1; //moves the volocity one pixle to the left 
            reward.rotationalVelocity = 5;
            
            reward.onPlayerCollision = function() {
                console.log('The reward has hit Halle');
                game.changeIntegrity(-10)
               
                
            };
            reward.onProjectileCollision = function() {
                console.log('The reward has hit Halle');
                game.changeIntegrity(-10)
                game.increaseScore(100);
                reward.fadeout();
            };
        }
        
            function createMyObstacle(x,y) {
                var hitZoneSize = 25; //sets the size of the hitzone 25 pixles
                var damageFromObstacle = 10; // damage from the obsticals 
                var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates hitzone 
                        
                        sawBladeHitZone.x = x; //x position of the hitzone
                        sawBladeHitZone.y = y; //y position of the hitzone 
                        game.addGameItem(sawBladeHitZone); // adds the hitzone to the game
                        var obstacleImage = draw.bitmap('img/dynemite.png'); //drawing our sawblade drawing 
                        sawBladeHitZone.addChild(obstacleImage); //adds the image to the hitzone
                        obstacleImage.x = -50; // moves the image's x position 25 to the left
                        obstacleImage.y= -40; // moves the obstical image 25 up to center it on the hitbox
                
                     
        };          
        
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];
            if(gameItem.type === "spike"){
                createSawblade(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "dynamite"){
                createMyObstacle(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "reward"){
                createReward(gameItem.x, gameItem.y)
            }
        }

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
