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
                { "type": "sawblade", "x": 400, "y": groundY -50 },
                { "type": "sawblade", "x": 600, "y": groundY - 50},
                { "type": "sawblade", "x": 900, "y": groundY - 50 },

                { "type": "enemy", "x": 1000, "y": groundY  - 50 },
                { "type": "enemy", "x": 700, "y": groundY - 50},
                { "type": "enemy", "x": 1500, "y": groundY - 50},
                
                { "type": "reward", "x": 1500, "y": groundY - 50},
                { "type": "reward", "x": 1500, "y": groundY - 50},
                { "type": "reward", "x": 1500, "y": groundY - 50}

            ]
        };

        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawblade ( x, y) { 
        var hitZoneSize = 25; //sets the size of the hitzone 25 pixles
var damageFromObstacle = 10; // damage from the obsticals 
var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // creates hitzone 
        
        sawBladeHitZone.x = x; //x position of the hitzone
        sawBladeHitZone.y = y; //y position of the hitzone 
        game.addGameItem(sawBladeHitZone); // adds the hitzone to the game
        var obstacleImage = draw.bitmap('img/sawblade.png'); //drawing our sawblade drawing 
        sawBladeHitZone.addChild(obstacleImage); //adds the image to the hitzone
        obstacleImage.x = -25; // moves the image's x position 25 to the left
        obstacleImage.y= -25; // moves the obstical image 25 up to center it on the hitbox
        }
           
        function createEnemy (x, y){
            var enemy = game.createGameItem('enemy',25); //creates the game item and stores it in variable enemy
            var redSquare = draw.rect(50,50,'red'); //creates rectangle and stores as red square
            redSquare.x = -25; 
            redSquare.y = -25;
            enemy.addChild(redSquare); //adds the red square to the enemy
            enemy.x = 400;
            enemy.y = groundY-50;
            game.addGameItem(enemy); //adds enemy to the game
            enemy.velocityX = -1; //moves the volocity one pixle to the left 
            enemy.rotationalVelocity = 5;
            
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
            reward.x = 400;
            reward.y = groundY-50;
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
        
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i];
            if(gameItem.type === "sawblade"){
                createSawblade(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "enemy"){
                createEnemy(gameItem.x, gameItem.y)
            }
            if(gameItem.type === "reward"){
                createEnemy(gameItem.x, gameItem.y)
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
