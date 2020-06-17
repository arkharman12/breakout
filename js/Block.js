/*

    N220 Section 25750
    Harmanjot Singh
    Breakout
    27 April 2020

*/

// Block class
class Block {
    // pass in the parameters
    constructor(location, width, height, color) {
        // location
        this.location = location;
        // width
        this.width = width;
        // height
        this.height = height;
        // colors
        this.color = color;
        // points
        this.points = 1;
    }
    
    // display the blocks function
    display() {
        // random color
        fill(this.color);
        // block
        rect(this.location.x, this.location.y, this.width, this.height);
    }
    
    // ball colliding with the block function
    isHitting(ball) {
      // if ball collides with a block
      if(ball.location.y - ball.radius <= this.location.y + this.height &&
        ball.location.y + ball.radius >= this.location.y &&
        ball.location.x + ball.radius >= this.location.x &&
        ball.location.x - ball.radius <= this.location.x + this.width) {
            return true;
        }
    }
}