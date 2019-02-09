// Arrow key codes and spacebar
const UP = 38,
    DOWN = 40,
    RIGHT = 39,
    LEFT = 37,
    SPACEBAR = 32;  // my addtion

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
    y: 100,
    width: 100
}; // end ufo


var torpedo = {
    img: document.querySelector("#torpedo"),
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    width: 35
};// end torpedo

// set up variables for other items:
var startBtn = document.querySelector("#start"),
    fireBtn = document.querySelector("#fire");

const TIMEINTERVAL = 1000;   // timer interval in miliseconds.  1000 = 1 sec
var timeCheck = "";

var velocity = 4;  // number of px the ship moves when you press an arrow.

let photon = "audio/PhotonTorp.mp3";
let phaser = "audio/phasertype10.wav";

var bGameEnded = false;  // my game end flag
var bUfoExplode = false;  // my ufoExplodes flag

// add event listeners
startBtn.addEventListener("click", startGameHandler, false);
fireBtn.addEventListener("click", fireTorpedoHandler, false)
window.addEventListener("keydown", keydownHandler, false);



// Initialize objects on the screen
render ( );


function startGameHandler( ) {
	// Hide the intro screen, show the game screen
	introScreen.style.display = "none";
	gameScreen.style.display = "block";
	rocket.img.style.display = "block";
    ufo.img.style.display = "block";

    // set up torp start position values for end of run check.
    torpedo.startY = rocket.y;
    torpedo.startX = rocket.x;

    // set the timer to check for things like torp end of run, 
    // ufo hits, explosions etc.
    timeCheck = setInterval(checkHit, TIMEINTERVAL);  // using 500 miliseconds since that's what our css easeout time is.
    
}

function fireTorpedoHandler( ) {
	// Fire the photon torpedo!
	// CSS animation occurs whenever torpedo
	// 'left' property changes value
    torpedo.img.style.visibility = "visible";
    torpedo.x = (rocket.x - 200);
    torpedo.img.style.left = (rocket.x - 200) + "px";
    let myAudio = document.createElement("audio");
    myAudio.src = photon;
    console.log("src = " + myAudio.src);
    myAudio.volume = 0.5;
    myAudio.play();
}


function checkHit() {
    // if torp left and top fall within the ufo image, its a hit!
    var ymin = ufo.y;
    var ymax = ufo.y + 65;
    var xmin = ufo.x;
    var xmax = ufo.x + 100;

    var bHit = false;
    console.log("torp top and left " + torpedo.y + ", " + torpedo.x);
    console.log("ymin: " + ymin + "ymax:  " + ymax);
    console.log("xmin: " + xmin + "xmax:  " + xmax);
    console.log(ufo);

    // first check if we have already exploded.  If so, then clear explosion and call game end.
    if (bUfoExplode) {
        setTimeout(() => { ufo.img.style.visibility = "hidden"; }, TIMEINTERVAL);
        
        bGameEnded = true;
    }
    else {
        // not exploded yet...
        if ((torpedo.y >= ymin && torpedo.y <= ymax) && (torpedo.x >= xmin && torpedo.x <= xmax)) {
            // we have a hit.
            console.log(" hit is true");

            bUfoExplode = true;  // set flag to show we have exploded.
/*
            // reset torp and hide it.
            torpedo.y = (rocket.y + 8);
            torpedo.x = (rocket.x + 10);
            torpedo.img.style.left = (rocket.x + 10) + "px";
            torpedo.img.style.top = (rocket.y + 8) + "px";
            torpedo.img.style.visibility = "hidden";

            // switch img for ufo to exploded.
            ufo.img.style.visibility = "hidden";
            ufo.img.src = "../images/Explode.png";  // switch to explosion
            // hide image and then make visible to try to get it to show.
            // force fadein of explosion.. maybe.
            ufo.x += 1;
            ufo.img.style.left = ufo.x + "px";  // will force a css transition for the explosion..
            setTimeout(() => { ufo.img.style.visibility = "visible"; }, TIMEINTERVAL);

            bUfoExplode = true;  // set flag to show we have exploded.

           */
           // render();  
        }// end if we hit
        
    }// end else not exploded yet

// call render to update.
    render();

}// end check hit


function keydownHandler(event) {
	// handle user keyboard input

	if (event.keyCode == UP) {
		rocket.y -= velocity;
	}
	if (event.keyCode == LEFT) {
		rocket.x -= velocity;
	}
	if (event.keyCode === DOWN) {
		rocket.y += velocity;
	}
	if (event.keyCode == RIGHT) {
		rocket.x += velocity;
    }


    // show new rocket position
    rocket.img.style.left = rocket.x + "px";
    rocket.img.style.top = rocket.y + "px";


    ///render(); // show what's happend so far

    // my additions:
    // add space bar for fireing torp.
    // must be AFTER render since render will make the torp disapear!
    if (event.keyCode == SPACEBAR) {
        fireTorpedoHandler();
    }
	
}// end keydown handler



function render() {

	// position objects on the screen
	rocket.img.style.left = rocket.x + "px";
    rocket.img.style.top = rocket.y + "px";
    

    if (bUfoExplode) {
        ufo.img.src = "images/ExplodeMaybe.png";
        ufo.x -= 10;
    }
    ufo.img.style.top = ufo.y + "px";
    ufo.img.style.left = ufo.x + "px";
   

    torpedo.y = (rocket.y + 8);
    torpedo.x = (rocket.x + 10);
	torpedo.img.style.left = (rocket.x +10) + "px";
    torpedo.img.style.top = (rocket.y+8) + "px";
    torpedo.img.style.visibility = "hidden";

    if (bGameEnded) {
        // end of game, let player know
        clearInterval(timeCheck);  // clear timer
        rocket.img.style.visibility = "hidden";  // hide rocket
        ufo.img.style.visibility = "hidden";  // hide ufo

        document.getElementById("endGame").innerHTML = "Great Shot!  You Got it!";
        document.getElementById("GameOver").innerHTML = " Game Over!";
    }

 
}