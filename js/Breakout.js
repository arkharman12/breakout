/*

    N220 Section 25750
    Harmanjot Singh
    Breakout
    27 April 2020

*/

// object to store the controls
const controls = {
    playerScore: 0,
    paddle: null,
    ball: null,
    blocks: null,
    gameState: null
}

// setup function      
function setup() {
    // create the canvas
    createCanvas(800, 600);
    // store the colors
    let colors = createColors();
    // set game state to playing
    controls.gameState = "playing";
    // create the paddle
    controls.paddle = new Paddle();
    // create the ball
    controls.ball = new Ball(controls.paddle);
    // create blocks with random colors
    controls.blocks = createBlocks(colors);
}

// draw function
function draw() {
    // if the game state is set to playing
    if (controls.gameState == "playing") {
        // make the background black
        background(0);

        // call the ball bounce edge function
        controls.ball.bounceOffEdge();
        // call the ball bounce paddle function
        controls.ball.bounceOffPaddle();

        // call the ball update function
        controls.ball.update();

        // if left key is pressed, then move the paddle to the left
        if (keyIsDown(LEFT_ARROW)) {
            controls.paddle.move("left");
        } else if (keyIsDown(RIGHT_ARROW)) { // otherwise move it to the right
            controls.paddle.move("right");
        }

        // for every single block in the game
        for (let i = controls.blocks.length - 1; i >= 0; i--) {
            // blocks array
            const block = controls.blocks[i];
            // if ball hit a block
            if (block.isHitting(controls.ball)) {
                // reverse it
                controls.ball.reverse("y");
                // insert
                controls.blocks.splice(i, 1);
                // increase the user score
                controls.playerScore += block.points;
            } else {
                // update the blocks in the game
                block.display();
            }
        }

        // call the paddle display function
        controls.paddle.display();
        // call the ball display function
        controls.ball.display();

        // text size
        textSize(32);
        // white color for scoreboard
        fill(255);
        // update the user scoreboard
        text(`Score: ${controls.playerScore}`, width - 145, 35);

        // if paddle misses the ball
        if (controls.ball.belowBottom()) {
            // change the game state to Lose
            controls.gameState = "Lose";
        }

        // if there are no more blocks
        if (controls.blocks.length == 0) {
            // change the game state to win
            controls.gameState = "Win";
        }
        } else { // decide if user lost or won
            // text size
            textSize(48);
            // if user loses, display Lose with red color, otherwise display Win with blue color
            controls.gameState == "Lose" ? fill(255, 0, 0) : fill(0, 0, 255);
            // lose or win state text and position
            text(`You ${controls.gameState}!`, width/2 - 100, height/2);
        }
}

// create random colors for blocks
function createColors() {
    // declare an colors array
    const colors = [];
    // push the red color to the array
    colors.push(color(255, 0, 0));
    // push the yellow color to the array
    colors.push(color(255, 255, 0));
    // push the orange color to the array
    colors.push(color(255, 165, 0));
    // push the green color to the array
    colors.push(color(0, 168, 107));
    
    // return the colors for later use
    return colors;
}

// create the blocks, pass in the colors
function createBlocks(colors) {
    // declare an blocks array
    const blocks = [];
    // number of rows
    const rows = 5;
    // number of columns
    const columns = 9;
    // block width
    const blockWidth = width / columns;
    // execute this loop for 5 times for 5 block rows
    for (let row = 0; row < rows; row++) {
        // execute this loop for 9 times for each block row, total 45 times
        for (let i = 0; i < columns; i++) {
            // create new block each time
            block = new Block(createVector(blockWidth * i, 25 * row + 50), blockWidth, 25, colors[floor(random(0, colors.length))]);
            // push the block to the array
            blocks.push(block);
        }
    }
    // return the blocks for other uses
    return blocks;
}

