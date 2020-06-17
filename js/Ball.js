/*

    N220 Section 25750
    Harmanjot Singh
    Breakout
    27 April 2020

*/

// Ball class
class Ball {
    // pass in the paddle
    constructor(paddle) {
        // radius
        this.radius = 15;
        // size
        this.size = this.radius * 2;
        // location of ball
        this.location = createVector(paddle.location.x + (paddle.width / 2), (paddle.location.y - this.radius - 5));
        // color of ball
        this.color = color(255);
        // velocity of ball
        this.velocity = createVector(6, -6);
        // paddle
        this.paddle = paddle;
    }
    
    // ball bounce off the paddle function
    bounceOffPaddle() {
      // if the ball is within the width of the paddle then make it bounce
      if (this.location.x + this.radius >= this.paddle.location.x &&
        this.location.x - this.radius <= this.paddle.location.x + this.paddle.width) {  
            // change the direction of the ball        
            if (this.location.y + this.radius > this.paddle.location.y) {
              this.reverse("y");
              this.location.y = this.paddle.location.y - this.radius - 1;
            }
        }
    }
    
    // ball bounce off the blocks and walls function
    bounceOffEdge() {
        // right wall
        if (this.location.x + this.radius >= width) {
            this.reverse("x");
        } else if(this.location.x - this.radius <= 0) { // left wall
            this.reverse("x");
        } else if(this.location.y - this.radius <= 0) { // top wall
            this.reverse("y");
        }
    }
    
    // ball display function
    display() {
        // ball color
        fill(this.color);
        // make it move
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }
    
    // update display function
    update() {
        this.location.add(this.velocity);
    }
    
    // reverse the direction of the ball function
    reverse(coord) {
        this.velocity[coord] *= -1;
    }
    
    // ball misses the paddle function
    belowBottom() {
        return this.location.y - this.radius > height;
    }
}