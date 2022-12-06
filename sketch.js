const canvasSketch = require('canvas-sketch');
const p5 = require('p5');

new p5()


var maxCount = 1500; // max count of the cirlces
var currentCount = 1;
var x = [];
var y = [];
var r = [];




const settings = {

  pixelsPerInch: 300,
   // Tell canvas-sketch we're using p5.js
   p5: true,
   // Turn on a render loop (it's off by default in canvas-sketch)

   duration: 3,
    animate: true,
    // We can specify dimensions if we want a fixed size on the first render
    dimensions:[512, 512],
    // orientation: 'landscape',
    bleed: 1 / 8,
    // attributes: {
    // antialias: true
    // }
  

}







canvasSketch(() => {

  strokeWeight(0.5);
  background(255, 10);
  // first circle
  x[0] = width / 2;
  y[0] = height/2;
  r[0] = 10;



  return ({  width, height }) => {

    clear();

    // create a random set of parameters
    var newR = random(1, 7);
    var newX = random(newR, width - newR);
    var newY = random(newR, height - newR);
  
    var closestDist = Number.MAX_VALUE;
    var closestIndex = 0;
    // which circle is the closest?
    for (var i = 0; i < currentCount; i++) {
      var newDist = dist(newX, newY, x[i], y[i]);
      if (newDist < closestDist) {
        closestDist = newDist;
        closestIndex = i;
      }
    }
  
    // show original position of the circle and a line to the new position
    // fill(230);
    // ellipse(newX, newY, newR * 2, newR * 2);
     line(newX, newY, x[closestIndex], y[closestIndex]);
  
    // aline it to the closest circle outline
    var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);
  
    x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
    y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
    r[currentCount] = newR;
    currentCount++;
  
    // draw them
    for (var i = 0; i < currentCount; i++) {
      fill(50);
      ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
    }
  
    if (currentCount >= maxCount) 
    currentCount = 1;

  }

  }, settings);



