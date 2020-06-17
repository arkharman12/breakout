/*

    N220 Section 25750
    Harmanjot Singh
    Breakout
    27 April 2020

*/

// Paddle class
class Paddle {
    constructor() {
        // wdith
        this.width = 150;
        // height
        this.height = 25;
        // color
        this.color = color(255);
        // location
        this.location = createVector((width/2) - (this.width/2), height-35);
        // speed
        const speed = 8;
        // speed object
        this.speed = {
            // move to the right
            right: createVector(speed, 0),
            // move to the left
            left: createVector(speed * -1, 0)
        }
    }
    
    // display the paddle function
    display() {
        // paddle color
        fill(this.color);
        // make the paddle
        rect(this.location.x, this.location.y, this.width, this.height);
    }
    
    // move the paddle function
    move(direction) {
        // make it move left and right with defined speed
        this.location.add(this.speed[direction]);
        
        // left wall boundry
        if(this.location.x < 0) {
            this.location.x = 0;
        } else if(this.location.x + this.width > width) { // right wall boundry
            this.location.x = width - this.width;  
        }
    }
}