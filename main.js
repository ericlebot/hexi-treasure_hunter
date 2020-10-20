let assets = ["sounds/chimes.wav"];

let game = hexi(512, 512, setup, assets, load);

game.fps = 60;
game.border = "1px black dashed";

let dungeon, player, treasure, enemies, chimes, exit,
    healthBar, message, gameScene, gameOverScene;

function play () {

    game.move(player);
    game.contain(player, game.stage);

}

function setup () {

    //Create the `chimes` sound object
    chimes = game.sound("sounds/chimes.wav");

    //Create the `gameScene` group
    gameScene = game.group();

    //Create the `exit` door sprite
    exit = game.rectangle(48, 48, "green");
    exit.x = 8;
    exit.y = 8;
    gameScene.addChild(exit);

    //Create the `player` sprite
    player = game.rectangle(32, 32, "blue");
    player.x = 68;
    player.y = game.canvas.height / 2 - player.halfHeight;
    gameScene.addChild(player);

    //Create the `treasure` sprite
    treasure = game.rectangle(16, 16, "gold");
    game.stage.putCenter(treasure, 220, 0);
    treasure.pickedUp = false;
    gameScene.addChild(treasure);

    //Make the enemies
    let numberOfEnemies = 6,
        spacing = 48,
        xOffset = 150,
        speed = 2,
        direction = 1;

    //An array to store all the enemies
    enemies = [];

    //Make as many enemies as there are `numberOfEnemies`
    for (let i = 0; i < numberOfEnemies; i++) {

        //Each enemy is a red rectangle
        let enemy = game.rectangle(32, 32, "red");

        //Space each enemey horizontally according to the `spacing` value.
        //`xOffset` determines the point from the left of the screen
        //at which the first enemy should be added.
        let x = spacing * i + xOffset;

        //Give the enemy a random y position
        let y = game.randomInt(0, game.canvas.height - enemy.height);

        //Set the enemy's direction
        enemy.x = x;
        enemy.y = y;

        //Set the enemy's vertical velocity. `direction` will be either `1` or
        //`-1`. `1` means the enemy will move down and `-1` means the enemy will
        //move up. Multiplying `direction` by `speed` determines the enemy's
        //vertical direction
        enemy.vy = speed * direction;

        //Reverse the direction for the next enemy
        direction *= -1;

        //Push the enemy into the `enemies` array
        enemies.push(enemy);

        //Add the enemy to the `gameScene`
        gameScene.addChild(enemy);
    }

    //Create the health bar
    let outerBar = game.rectangle(128, 16, "black"),
        innerBar = game.rectangle(128, 16, "yellowGreen");

    //Group the inner and outer bars
    healthBar = game.group(outerBar, innerBar);

    //Set the `innerBar` as a property of the `healthBar`
    healthBar.inner = innerBar;

    //Position the health bar
    healthBar.x = game.canvas.width - 148;
    healthBar.y = 16;

    //Add the health bar to the `gameScene`
    gameScene.addChild(healthBar);

    //Add some text for the game over message
    message = game.text("Game Over!", "64px Futura", "black", 20, 20);
    message.x = 120;
    message.y = game.canvas.height / 2 - 64;

    //Create a `gameOverScene` group
    gameOverScene = game.group(message);
    gameOverScene.visible = false;

    //Assign the player's keyboard controllers
    let leftArrow = game.keyboard(37),
        upArrow = game.keyboard(38),
        rightArrow = game.keyboard(39),
        downArrow = game.keyboard(40);

    //Left arrow key `press` method
    leftArrow.press = () => {
        //Change the player's velocity when the key is pressed
        player.vx = -5;
        player.vy = 0;
    };

    //Left arrow key `release` method
    leftArrow.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the player isn't moving vertically:
        //Stop the player
        if (!rightArrow.isDown && player.vy === 0) {
            player.vx = 0;
        }
    };

    //The up arrow
    upArrow.press = () => {
        player.vy = -5;
        player.vx = 0;
    };
    upArrow.release = () => {
        if (!downArrow.isDown && player.vx === 0) {
            player.vy = 0;
        }
    };

    //The right arrow
    rightArrow.press = () => {
        player.vx = 5;
        player.vy = 0;
    };
    rightArrow.release = () => {
        if (!leftArrow.isDown && player.vy === 0) {
            player.vx = 0;
        }
    };

    //The down arrow
    downArrow.press = () => {
        player.vy = 5;
        player.vx = 0;
    };
    downArrow.release = () => {
        if (!upArrow.isDown && player.vx === 0) {
            player.vy = 0;
        }
    };

    //set the game state to `play`
    game.state = play;
}

function load () {



}

game.start();