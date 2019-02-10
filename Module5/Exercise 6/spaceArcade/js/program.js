"use strict";


// Arrow key codes and spacebar
const UP = 38,
    DOWN = 40,
    RIGHT = 39,
    LEFT = 37,
    UFO_UP = 87,   // w
    UFO_DOWN = 90,  // z
    SPACEBAR = 32;  // my addtion for another way to fire.


// rocket object
var rocket = {
    img: document.querySelector("#rocket"),
    x: 490,
    y: 390,
    width: 100
};


var ufo = {
    img: document.querySelector("#ufo"),
    x: 30,
    y: 250,
    width: 100
}; // end ufo


var torpedo = {
    img: document.querySelector("#torpedo"),
    x: 0,
    y: 0,
    startX: 0,  // Start locations for later implementations to allow better animations
    startY: 0,
    width: 35
};// end torpedo

// set up variables for other items:
const START_BTN = document.querySelector("#start"),
    FIRE_BTN = document.querySelector("#fire");

const TORP_TIMEINTERVAL = 800;      // timer interval in miliseconds.  1000 = 1 sec
const CHECK_EXPLODE_TIMEINTERVAL = 800;  // timer interval to check for ufo explosion event.
const EXPLODE_TIMEINTERVAL = 1000; // timer for how long to show explosion.

let timeCheck = "";   // var to use to clear our interval timmer.
let bTorpFired = false;  // flag for if we just fired a torp. used to avoid stomping on ourselves.


let rocketVelocity = 4;  // number of px the ship moves when you press an arrow.
let ufoVelocity = 4;

let photon = "audio/PhotonTorp.mp3";
let phaser = "audio/phasertype10.wav";
const EXPLODE = "audio/Explosion.mp3";


let bGameEnded = false;  // my game end flag
let bUfoExplode = false;  // my ufoExplodes flag
let bExplosionAudio = false;  // flag for if we have sounded the explosion

// add event listeners
START_BTN.addEventListener("click", startGameHandler, false);
FIRE_BTN.addEventListener("click", fireTorpedoHandler, false)
window.addEventListener("keydown", keydownHandler, false);



// Initialize objects on the screen
// NOTE.  I personally don't like this just hanging out here.  we could
// set up a load event with an init function call and put it there.
render();


//----------------------------------------------------------------------------------------
// startGameHandler:   Called by startbutton handler
//                  
//  Hides the intro screen, shows the game screen.  sets torp start values (for 
//  later animation possibilities) and sets the timer to check for if the ufo had
//  exploded so it can set end of game and call render to end the game.
//-----------------------------------------------------------------------------------------
function startGameHandler() {
    "use strict";
    // Hide the intro screen, show the game screen
    introScreen.style.display = "none";
    gameScreen.style.display = "block";
    rocket.img.style.display = "block";
    ufo.img.style.display = "block";

    // set up torp start position values for end of run check.
    torpedo.startY = rocket.y;
    torpedo.startX = rocket.x;

    // set the timer to check for things like torp end of run, ufo hits, explosions etc.
    // If we don't do this and force a render, then the torp will persist on the screen until 
    // the player moves the rocket and forces the render.
    timeCheck = setInterval(checkExplode, CHECK_EXPLODE_TIMEINTERVAL);  // using same interval as used to display torp movement to check if it exploded.

}// end start Game Handler.


//----------------------------------------------------------------------------------------
// fireTorpedoHandler:   Called by fire button press event or by spacebar hit
//                  
//  If we didn't just fire a torp and are in our timeout loop then it sets the torp fired
//  flag to true.  Sets the torps x and left values to + TORP_RANGE, plays audio then 
//  waits for the timer interval before checking for a hit.  This gives the page time to
//  do the .css animation bit.  After the time out it calls checkHit();
//  
//-----------------------------------------------------------------------------------------
function fireTorpedoHandler() {
    "use strict";

    if (bTorpFired) {
        // we just handled one.. time not up yet
        // do nothing!
    }
    else {

        bTorpFired = true;  // set our flag so we don't stomp ourselves.

        // Fire the photon torpedo!
        // CSS animation occurs whenever torpedo
        // 'left' property changes value

        console.log("rocket left:  " + rocket.x + "  rocket top:  " + rocket.y);
        console.log("torp left:  " + torpedo.x + "  torp top:  " + torpedo.y);

        // now fire torp
        torpedo.img.style.visibility = "visible";
        torpedo.x = (rocket.x - 200);
        torpedo.img.style.left = (rocket.x - 200) + "px";

        // set up audio
        let myAudio = document.createElement("audio");
        myAudio.src = photon;
        console.log("src = " + myAudio.src);
        myAudio.volume = 0.5;
        myAudio.play();

        // NOTE: setTimeout does NOT stop execution of lines after it.  Rather it delays the execution of the
        // function given to it.  So this Forces the call to checkhit to wait so that hopefully the torp will 
        // be shown flying toward it's target.
        setTimeout(checkHit, TORP_TIMEINTERVAL);
    }// end else

}// end fire torp handler



//---------------------------------------------------------------
// checkHit:  Called by fireTorpedoHandler:
//
//  Checks if we got a hit on the ufo.  If so, sets the ufo explode flag
//  so render will show explosion.  Sets torp fired flag to false to clear it.
//------------------------------------------------------------------
function checkHit() {
    "use strict";
    // if torp left and top fall within the ufo image, its a hit!
    let ymin = ufo.y;
    let ymax = ufo.y + 65;
    let xmin = ufo.x;
    let xmax = ufo.x + 100;


    console.log("torp top and left " + torpedo.y + ", " + torpedo.x);
    console.log("ymin: " + ymin + "ymax:  " + ymax);
    console.log("xmin: " + xmin + "xmax:  " + xmax);
    console.log(ufo);

    if (!bUfoExplode) {
        // not exploded yet. Check for hit...
        if ((torpedo.y >= ymin && torpedo.y <= ymax) && (torpedo.x >= xmin && torpedo.x <= xmax)) {
            // we have a hit.
            console.log(" hit is true");

            bUfoExplode = true;  // set flag to show we have exploded.
        }// end if we hit

    }// end if not exploded yet

    // reset fired torp flag
    bTorpFired = false;

    // call render to update.
    render();

}// end check hit



//----------------------------------------------------------------------------------------
// checkExplode:   Called by timer.  if the ufo exploded, then we set game over flag
//                  and call render to end the game.
//-----------------------------------------------------------------------------------------
function checkExplode() {
    "use strict";

    console.log("in checkExplode.  Explode = " + bUfoExplode);

    if (bUfoExplode) {

        render();// make sure explosion is appreciated...
        console.log("in checkExplode.  Setting delay for hidding ufo explosion.");
     
        // wait so player can see
        wait(EXPLODE_TIMEINTERVAL);

        // now hide ufo since it's been blown up!
        ufo.img.style.visibility = "hidden";
        console.log('in checkExplode.  past time delay now.');
        bGameEnded = true;
        render();
    }
}// end check explode


//----------------------------------------------------------------------------------------
// wait(delayTime):  implemented as an "arrow function" 
//
//  Called by checkExplode
//  delayTime:  in milliseconds.
//
//  Forces cpu to do nothing but check time until specified delayTime has passed.
//
//-----------------------------------------------------------------------------------------
//function wait(milliSecDelay) {
let wait = (milliSecDelay) => {
    "use strict";

    let startTime = new Date();
    let currentTime = null;

    // do loop until time is up.
    do {
        currentTime = new Date();
    }
    while ( (currentTime - startTime) < milliSecDelay);
} // end wait



//----------------------------------------------------------------------------------------
// keydownHandler:   Called by key press event
//                  
//  Checks for which key was hit and moves rocket or ufo accordingly.  
//  In addition, if the game over flag is false and the spacebar was hit, it fires a torp.  
//  (this is in addition to the fire button)
//-----------------------------------------------------------------------------------------
function keydownHandler(event) {
    "use strict";
    // handle user keyboard input

    // moving rocket with arrow keys...
    if (event.keyCode === UP) {
        rocket.y -= rocketVelocity;
    }
    if (event.keyCode === LEFT) {
        rocket.x -= rocketVelocity;
    }
    if (event.keyCode === DOWN) {
        rocket.y += rocketVelocity;
    }
    if (event.keyCode === RIGHT) {
        rocket.x += rocketVelocity;
    }


    // moveing ufo up and down with w and s
    if (event.keyCode === UFO_UP) {
        ufo.y -= ufoVelocity;
    }
    if (event.keyCode === UFO_DOWN) {
        ufo.y += ufoVelocity;
    }

    render();   // updates position of ships and torp.

    // my additions:
    // add space bar for fireing torp if game not over.
    if (event.keyCode == SPACEBAR && !bGameEnded) {
        fireTorpedoHandler();
    }

}// end keydown handler


//----------------------------------------------------------------------------------------
// render:   Called by.... lots! 
//                  
//  Updates rocket image and ufo image positions.  If ufo exploded flag is true, it swaps out the
//  standard ufo image for the explosion image before showing it.
//  Also updates torp's start position based on rocket position and hides it but ONLY if not currently
//  in a fire torp sequence. (bTorpFired == false).
//  If game ended flag is set, then it hides the rocket, ufo image ( exploded usually), disables and 
//  hides the firebutton, and displays congrats message and game over message.
//-----------------------------------------------------------------------------------------
function render() {
    "use strict";

    // position objects on the screen
    rocket.img.style.left = rocket.x + "px";
    rocket.img.style.top = rocket.y + "px";


    if (bUfoExplode) {
        ufo.img.src = "images/ExplodeMaybe.png";

        if (!bExplosionAudio) {
            // if we have yet to sound the explosion, do so now.

            // set up audio
            let myAudio = document.createElement("audio");
            myAudio.src = EXPLODE;
            console.log("src = " + myAudio.src);
            myAudio.volume = 0.5;
            myAudio.play();

            bExplosionAudio = true;
        }// end if need to sound explosion

    }// end if ufoExplode

    ufo.img.style.top = ufo.y + "px";
    ufo.img.style.left = ufo.x + "px";
    ufo.img.style.visibility = "visible"; // make sure the ufo shows up or explodes.

    // if not in fireing loop, set torpedo start and actual positions to the ships launch tube.
    if (!bTorpFired) {
        torpedo.y = (rocket.y + 8);
        torpedo.x = (rocket.x + 10);
        torpedo.startX = torpedo.x;
        torpedo.startY = torpedo.y;

        torpedo.img.style.left = (rocket.x + 10) + "px";
        torpedo.img.style.top = (rocket.y + 8) + "px";
        torpedo.img.style.visibility = "hidden";
    }// end if not in fire torp sequence

    if (bGameEnded) {
        // end of game, let player know
        clearInterval(timeCheck);  // clear timer
        rocket.img.style.visibility = "hidden";  // hide rocket
        ufo.img.style.visibility = "hidden";  // hide ufo
        FIRE_BTN.disabled = true;   // hide and disable fire button
        FIRE_BTN.hidden = true;

        document.getElementById("endGame").innerHTML = "Great Shot!  You Got it!";
        document.getElementById("GameOver").innerHTML = " Game Over!";
    }


}// end render