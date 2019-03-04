// JavaScript source code


// the two signs we will do are the do not enter and the stop light sign.

let canvasDontEnter = document.getElementById('signOne');
let canvasStopLight = document.getElementById('signTwo');
let noCanvasDiv = document.getElementById("NoCanvas");


// Draw DO NOT ENTER sign..
if (canvasDontEnter.getContext) {
    var ctx = canvasDontEnter.getContext('2d');

    // draw the main circle / dot
    // set up the color to be red.
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();

    // move to center edgeish and draw a white horizontal line
    // currently the center is 75,75 and the leftmost edge is therefore 25,75
    ctx.beginPath();
    ctx.moveTo(35, 75);
    ctx.lineWidth = 13; // we will see if this is wide enough;
    ctx.strokeStyle = 'white';
    ctx.lineTo(115, 75);
    ctx.stroke();

    // draw Do Not text
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.fillText("DO NOT", 40, 60);

    // draw Enter text
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.fillText("ENTER", 45, 105);
  
 }
else {
    // canvas-unsupported code here
    noCanvasDiv.innerHTML = "Alas, no canvas support for the do not enter sign.";

}// end canvasDontEnter


// Draw Stop Light Sign
if (canvasStopLight.getContext) {
    var ctx = canvasStopLight.getContext('2d');

    // rotation is always about the "origin"
    // so to make this work, set the origin to the center of our rectangle
    // then rotate 45 degrees and then draw our rectangle but offset so the
    // origin will be the center of the rectangle....

    ctx.save();  // save context so we can come back to it after the rotation etc is done.

    // draw space is 250 by 250 so center is 125, 125

    // transformation and rotation and transform back so coords make sense.
    ctx.translate(125, 125);
    ctx.rotate(45 * Math.PI / 180);  // rotate 45 degrees.
    ctx.translate(-125, -125);

    // draw a black square with rounded edges so its center would be at 125, 125
    ctx.beginPath();
    ctx.fillStyle = 'black';
    filledRoundedRect(ctx, 75, 75, 100, 100, 9);
 

    // draw a slightly smaller yellow square with round edges inside it.
    ctx.beginPath();
    ctx.fillStyle = "gold";
    filledRoundedRect(ctx, 78, 78, 94, 94, 7);


    ctx.restore(); // bring everything back to normal
      

    // draw a black rectangle or thick line down the middle. 
    // Remember we have restored our context so the middle IS 125,125..
    ctx.beginPath();
    ctx.fillStyle = 'black';
    filledRoundedRect(ctx, 110, 80, 30, 90, 0);  // using 0 radius so no rounded corners.


    // draw circles in the black rectangle with red, yellow and green fill.

    // Red circle on top:
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(125, 95, 10, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();


    // Yellow circle in the middle:
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.arc(125, 125, 10, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();


    // Green circle on the bottom:
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(125, 155, 10, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();  
    
}
else 
{
    // canvas-unsupported code here
    noCanvasDiv.innerHTML = "Alas, no canvas support for the stop light sign.";

}// end canvasStopLight


// utility function for a rounded cornered rectangle.
// radius = radius of rounded corners.
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
}

// utility function for a filled in rounded cornered rectangle.
// radius = radius of rounded corners.
function filledRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.fill();
}