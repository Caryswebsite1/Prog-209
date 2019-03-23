//"use strict";

/* **********************************************************************************
 * ************ The Goblin King *****************************************************
 * **********************************************************************************
 * ** Author:  Cary K. Gibson *******************************************************
 * ** Date: Feb 1, 2019 *************************************************************
 * ********************************************************************************** */


// Design Note:
// This game is designed such that the player can take or drop items in any order they 
// wish.  The playerInput variable is a string which can be checked for the item via
// indexOf. 

// JavaScript source code



/* ***********************************************************************************
 * *************************** declarations section **********************************
 * ********************************************************************************** */

// Note: these are all global data variables and because there are so many, I have not
// done my standard "G_" for their name prefix.

// NOTE: for arrays.  [ [], [] ] is an array whose first index only goes to 1 (0, 1) and the second index 
// can go as far as desired.  ie a 2 by infinite array.  a [[], [], []] creates a 3 by infinite and so on.
// a [ [ [], [] ] ] creates a 1 by 2 by infinte...  similarly [ [ [], [] ], [ [], [] ] ] creates a 2 by 2 by infinte.

// create map
const map = [[], [], [], [], [], [], [], [], []];  // 9 by infinite array so we can have a lighted and unlighted map area discription and sound

map[0][0] = "A glowing gateway blocks the path to the north.";
map[0][1] = "A glowing gateway blocks the path to the north.";
map[0][2] = "audio/Tibeton_Cymbol_for_gate.mp3";

map[1][0] = "An Ice Cave.  The icicles glitter like diamonds in the lantern light.  Rainbows rays of colors shine all around you.";
map[1][1] = "It's Very Cold.  And you hear something moving...";
map[1][2] = "audio/wind01.mp3";

map[2][0] = "The Cave of Gems!  You found it!  Large glowing gems stud the walls and ceiling, iluminating the area in a mystical light.";
map[2][1] = "The Cave of Gems!  You found it!  Large glowing gems stud the walls and ceiling, iluminating the area in a mystical light.";
map[2][2] = "audio/CrytalCaveMagic.mp3";

map[3][0] = "The walls and ceiling are covered in a strange jelly like substance.";
map[3][1] = "Something squishes under your feet in the dark.";
map[3][2] = "audio/water-drops-daniel_simon.mp3";

map[4][0] = "Your stomach does flip flops. You feel dizzy. There is a faint blueish haze all around. There are tunnels in each direction";
map[4][1] = "Your stomach does flip flops. You feel dizzy. There is a faint blueish haze all around. There are tunnels in each direction";
map[4][2] = "audio/Bats_in_Cave.mp3";

map[5][0] = "A large body of water stretches away from you, the waves lapping against the shore.";
map[5][1] = "You think you hear the lapping of waves?  How can that be?";
map[5][2] = "audio/oceano2.mp3";

map[6][0] = "The glow from the hot lava illuminates the area.  Through the sweat dripping in your eyes you see what appears to be salt deposits scattered around.";
map[6][1] = "The glow from the hot lava illuminates the area.  Through the sweat dripping in your eyes you see what appears to be salt deposits scattered around.";
map[6][2] = "audio/lava4.mp3";

map[7][0] = "The roar of water fills your ears.  Spray fills the air.";
map[7][1] = "A constant roar fills your ears.  Your face is getting wet from something.";
map[7][2] = "audio/large_waterfall_1-daniel_simon.mp3";

map[8][0] = "The shallow river flows north.";
map[8][1] = "You hear what you think is the sound of moving water.";
map[8][2] = "audio/Babbling_Brook.mp3";



/* *********************************************************************
 * ************************Audio Set up ********************************
 * *********************************************************************
 */

// Set up audio via an array of sounds, 1 per map location.(see map[x][2])
// access example: myAudio.setAttribute("src", MyPlayList[3]);

// set up an array for additional overlay sounds as well.. 

// additional sounds:
let OtherSounds = [];
OtherSounds[0] = "audio/Africa.mp3";  // main opening game song
OtherSounds[1] = "audio/forest_fire.mp3"; // to overlay with lava in lava cave
OtherSounds[2] = "audio/gravelwalk.mp3"; // main area transition sound
OtherSounds[3] = "audio/FallingToDeath.mp3";  // you fall to your death
OtherSounds[4] = "audio/Monster_Footsteps.mp3"; // for monster attack and or follow
OtherSounds[5] = "audio/Blade_Combat.mp3";  // player attacks monster with sword
OtherSounds[6] = "audio/MonsterFarAway.mp3";  // monster is far away
OtherSounds[7] = "audio/MonsterInSameRoom.mp3";  // monster is in YOUR cave room!!
OtherSounds[8] = "audio/Drowning.mp3";  // You Drown
OtherSounds[9] = "audio/MonsterTearFlesh.mp3";  // monster is eatting you.
OtherSounds[10] = "audio/EarthQuake.mp3";  // Earthquake!
OtherSounds[11] = "audio/HotSizzling.mp3";  // Earthquake!


// Our main audio object:
let mainAudio = document.createElement("audio");
mainAudio.setAttribute("type", "audio/mpeg");
mainAudio.volume = 0.3;
mainAudio.currentTime = 0;   // sets it to start at beginning of sound track.

// overlay audio object:
let overlayAudio = document.createElement("audio");
overlayAudio.setAttribute("type", "audio/mpeg");
overlayAudio.volume = 0.4; // a bit higher than background.
overlayAudio.currentTime = 0;   // sets it to start at beginning of sound track.

// create additional audio resource for fight.
let fightAudio = document.createElement("audio");
fightAudio.setAttribute("type", "audio/mpeg");
fightAudio.volume = 0.4; // a bit higher than background.
fightAudio.currentTime = 0;   // sets it to start at beginning of sound track.
fightAudio.setAttribute("src", OtherSounds[5]); // only one sound this will usually use.

// booleans to make sure we don't do wrong sounds on these screens.
let bIntroScreen = true;
let bHelpScreen = false;

/* **************************** End Audio Setup **************************************************** */


// set start location and previous location:
let mapLocation = 0;
let previousMapLocation = 0;

// setup the images array
const locationImages = [];

locationImages[0] = "url(images/MagicalGatewayCave.jpg)";
locationImages[1] = "url(images/iceCave.jpeg)";
locationImages[2] = "url(images/Amethyst.jpg)";
locationImages[3] = "url(images/JellyMonsterCaveCropped.jpg)";
locationImages[4] = "url(images/mazeCave.jpg)";
locationImages[5] = "url(images/SkullWaterCaveMod.jpg)";
locationImages[6] = "url(images/LavaCave.jpeg)";
locationImages[7] = "url(images/WaterfallCaveCropped373H.jpg)";
locationImages[8] = "url(images/caveRiver.jpg)";



// Other Images:  TheDark, Exit and monsters
const TheDark = "url(images/TheDark.png)";
const TheExit = "url(images/WaterfallExit.jpg)";
const MonsterInDark = "url(images/MonsterInTheDark.jpg)";
const SeaMonster = "url(images/SeaMonster.jpg)";
const Drowned = "url(images/drowned.jpg)";
const Skull = "url(images/Skull.jpg)";


// set boundary - blocked ways messages
// multi dim array for different error messages from a location depending on direction attempted. 
// first index is map location, second is attempted direction:  0 = N, 1 = east, 2 = south, 3 = west
const blockedPathMessages = [[], [], [], [], [], [], [], [], []]; //  9 multi dim array for different error messages from a location depending on direction attempted. 


blockedPathMessages[0][0] = "The glowing gate seems locked. It won't open.";  // Gate north
blockedPathMessages[0][2] = "A thick jelly like substance blocks your way.";  // Gate north
blockedPathMessages[0][3] = "The solid rock cave wall blocks your way.";  // west
blockedPathMessages[1][0] = "Thick ice blocks the way.";  // north
blockedPathMessages[2][0] = "The gem studded sold rock wall blocks your way.";  // north
blockedPathMessages[2][1] = "The gem studded sold rock wall blocks your way.";  // east
blockedPathMessages[3][0] = "The thick jelly like substance blocks your way."; // north
blockedPathMessages[3][1] = "The thick jelly like substance blocks your way."; // east
blockedPathMessages[3][3] = "The solid rock cave wall blocks your way.";      // west
blockedPathMessages[4][3] = "A thick jelly like substance blocks your way."; // west.
blockedPathMessages[5][1] = "The solid rock cave wall blocks your way."; // east
blockedPathMessages[6][2] = "Hot lava pours from the wall and covers the floor blocking the way."; // south
blockedPathMessages[6][3] = "Hot lava pours from the wall and covers the floor blocking the way."; // west
blockedPathMessages[7][1] = "The cliff is too high.  You can't go that way. Too bad you don't have a rope with a grappling hook!";  // East without a rope.
blockedPathMessages[7][2] = "The solid rock cave wall blocks your way.";  // south
blockedPathMessages[8][1] = "The solid rock cave wall blocks your way."; // east
blockedPathMessages[8][2] = "The solid rock cave wall blocks your way."; // south
blockedPathMessages[8][3] = "The cliff is too high.  You can't go that way. Too bad you don't have a rope with a grappling hook!";  // west without rope and grapling hook.

// create an array for the items that are in the world at the start and set their locations
// note: this itemsInWorld array will shrink as the player takes the items or grow as they drop the items.
let itemsInWorld = [];

// note: location index == item index.  value == map index
let itemLocations = [];

// backpack!
let backpack = [];

// players input string
let playersInput = "";

// game message for what's going on
let gameMessage = "";

// game action array and current action:
let actionsIKnow = ["north", "east", "south", "west", "take", "use", "drop", "ronaustin"];
let action = "";

// another item array to hold all the items the game understands
// this is Not the same as the itemsInWorld because the glowing gem is not available until it is mined.
const itemsIKnow = ["salt", "rope", "grappling hook", "plate armor", "sword", "lantern", "pick axe", "glowing gem", "fish", "item9"];
let currentItem = "";  // the current item being actioned

/* ***********************************************************************
 * *****************  Actual Moving Objects *************************************
 * *********************************************************************** */
let MonsterInTheDark = {// must kill to get pick axe.
    hitpoints: 50,
    location: 1,
    bAlive: true
};

let Player = {
    hitpoints: 10,
    location: 8,
    bAlive: true,
    deathReason: "",
    armor: false,
    swordSkill: 0
};

/* ***************** End Moving Objects ******************************************* */

// FLAGS for items and monsters
let bLanternInUse = false;  // lamp must be on to be able to see anything...
let bJellyMonsterAlive = true;  // must kill to get grappling hook
let endGameReason = "";  // loaded with reason for end game so correct messages can be shown.??
let bGateOpen = false;  // is the exit gate open?


/* *********************************************************************
 *  html page items
 *  ********************************************************************* */

// the image element for the display of the image on the page:
let screenImage = document.getElementById("screenImage");

// magic haze
let magicHaze = document.getElementById("theMagicHaze");

// the input and output fields too.
let input = document.querySelector("#input");
let output = document.querySelector("#output");  // used for main discriptions
let output2 = document.querySelector("#output2");  // used for action results in a separate color..

// set up the play, save, load  and newGame buttons
let playButton = document.getElementById("playGame");
playButton.style.cursor = "pointer";
playButton.addEventListener("click", playGame, false);

// HelpMe  button:
let helpButton = document.getElementById("helpMe");
helpButton.style.cursor = "pointer";
helpButton.addEventListener("click", helpMeHandler, false);

let saveButton = document.getElementById("saveGame");
saveButton.style.cursor = "pointer";
saveButton.addEventListener("click", saveGame, false);

let loadButton = document.getElementById("loadGame");
loadButton.style.cursor = "pointer";
loadButton.addEventListener("click", loadGame, false);

let newGameButton = document.getElementById("newGame");
newGameButton.style.cursor = "pointer";
newGameButton.addEventListener("click", newGame, false);


// intro screen Play Intro button:
let PlayIntroButton = document.getElementById("PlayIntro");
PlayIntroButton.style.cursor = "pointer";
PlayIntroButton.addEventListener("click", runIntroduction, false);


// intro screen Adventure button:
let AdventureButton = document.getElementById("Adventure");
AdventureButton.style.cursor = "pointer";
AdventureButton.addEventListener("click", startAdventureHandler, false);

// resume Game  button:  // on help screen
let resumeButton = document.getElementById("resumeGame");
resumeButton.style.cursor = "pointer";
resumeButton.addEventListener("click", resumeGameHandler, false);




/* ****************************************************************************************
 * *************************  Functions Section *******************************************
 * **************************************************************************************** */

// NOTES:  on load, only the intro screen will be visible. When user hits the startAdventure button,
// then the main game screen will be shown and active.

// GLOBAL ACTIONS:
//-----------------------------------------------------
window.addEventListener("load", init);  // force call to init function on load of page
window.addEventListener("keydown", keydownHandler, false);  // to listen for the return key



//-----------------------------------------------------
// Init:  calls for initial display of map
//        button event handlers already set up in declarations.
//-----------------------------------------------------
function init() {
    "use strict";
    // init main game state variables.  we can also call init from newGame button handler
    // and it will reset the world.


    // Reset FLAGS for items and monsters
    bLanternInUse = false;  // lamp must be on to be able to see anything...
    bJellyMonsterAlive = true;  // must kill to get grappling hook
    MonsterInTheDark.bAlive = true; // must kill to get pick axe. // must kill to get pick axe.
    endGameReason = "";  // game not ended
    bGateOpen = false;  // is the exit gate open?
    Player.armor = false;   // no armor yet.
    Player.hitpoints = 10;  // no carryover from last game!
    Player.swordSkill = 0;

    // make sure input box is visable and operational
    input.hidden = false;
    input.disabled = false;


    // make sure buttons are visable and operational
    playButton.disabled = false;
    playButton.hidden = false;
    saveButton.disabled = false;
    saveButton.hidden = false;
    loadButton.disabled = false;
    newGameButton.disabled = false;


    // make sure adventure button not arround until intro is done..
    //AdventureButton.disabled = true;
    //AdventureButton.hidden = true;

    // make sure play intro button is visible.
    PlayIntroButton.disabled = false;
    PlayIntroButton.hidden = false;

    // set start location:
    mapLocation = 7;
    previousMapLocation = 7;

    // create an array for the items that are in the world at the start and set their locations
    // note: this itemsInWorld array will shrink as the player takes the items or grow as they drop the items.
    itemsInWorld = ["salt", "rope", "grappling hook", "plate armor", "sword", "pick axe", "fish"];

    // note: location index == item index.  value == map index
    itemLocations = [6, 0, 3, 8, 4, 1, 5];

    // backpack!
    backpack = ["lantern"];

    playersInput = "";
    gameMessage = "";

    input.innerHTML = "";
    input.value = "";
    output.innerHTML = "";
    output.value = "";
    output2.innerHTML = "";
    output2.value = "";


    bIntroScreen = true;
    bHelpScreen = false;

    // now that everything is set, display everything.
    renderGame();

} // end function init


//----------------------------------------------------------------------------------------
// runIntroduction:   Called by init
//                  
//  runs the animated story for the introduction.
//-----------------------------------------------------------------------------------------
function runIntroduction() {
    "use strict";
    // NOTE: you can't count on anything being set correctly before this runs even with a reset call.... not sure why but it seems a 1 run show this way.
    //resetIntro();

    bIntroScreen = true;

    // hide intro button now.
    PlayIntroButton.disabled = true;
    PlayIntroButton.hidden = true;

    // hide start adventure button too:  This because I have not found a way to stop an animation in progress.. sigh.
    AdventureButton.disabled = true;
    AdventureButton.hidden = true;

    // set intro sound.
    overlayAudio.setAttribute("src", OtherSounds[0]);
    overlayAudio.play();

    let myTL2 = new TimelineMax();
    // run timeline
    myTL2.delay(10.0)
        .to("#IntroStartPicture", 0.1, { display: "none", ease: Power0.easeNone })  // remove starting picture
        .to("#IntroPicture1", 0.1, { display: "initial", scale: 0.0001, ease: Power0.easeNone })
        .to("#IntroPicture1", 2.0, { opacity: 1, scale: 1, ease: Power0.easeNone })  // bring up crystal picture to start

        .to("#LegendText1", 8.0, { top: -250, ease: Power0.easeNone }) // scroll text
        .to("#LegendText2", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text

        .to("#IntroPicture2", 0.1, { display: "initial", scale: 0.0001, ease: Power0.easeNone }) // set up initial river picture
        .to("#IntroPicture2", 0.1, { scale: 1, ease: Power0.easeNone })  // scale up but still not shown.
        .to("#LegendText4", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#LegendText5", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#LegendText6", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#IntroPicture1", 3.0, { opacity: 0, ease: Power0.easeNone }, "-= 3.0") // fade out first image
        .to("#IntroPicture2", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade in second image
        .to("#LegendText7", 8.0, { top: -250, ease: Power0.easeNone }, "-= 1.5") // scroll text over fadin
        .to("#LegendText8", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#LegendText9", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#LegendText10", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#IntroPicture1", 0.1, { backgroundImage: "url('images/RiverCut.jpg')", ease: Power0.easeNone }) // switch to travel river.
        .to("#LegendText11", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#IntroPicture2", 3.0, { opacity: 0, ease: Power0.easeNone }, "-= 3.0") // fade out country river image
        .to("#IntroPicture1", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade in rivercut image
        .to("#LegendText12", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#IntroPicture2", 0.1, { backgroundImage: "url('images/RiverSunset.jpg')", ease: Power0.easeNone }) // switch to sunset
        .to("#LegendText13", 8.0, { top: -250, ease: Power0.easeNone }) // scroll text
        .to("#IntroPicture1", 3.0, { opacity: 0, ease: Power0.easeNone }, "-= 3.0") // fade out river cut image
        .to("#IntroPicture2", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade in sunset image
        .to("#LegendText14", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#IntroPicture1", 0.1, { backgroundImage: "url('images/OutsideWaterfall.jpg')", ease: Power0.easeNone }) // switch to mountain stream
        .to("#IntroPicture2", 3.0, { opacity: 0, ease: Power0.easeNone }) // fade out sunset image
        .to("#IntroPicture1", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade in moutain stream image
        .to("#IntroPicture2", 0.1, { backgroundImage: "url('images/mountainStream.jpg')", ease: Power0.easeNone }) // switch to waterfa;;
        .to("#IntroPicture1", 3.0, { opacity: 0, ease: Power0.easeNone }) // fade out mountain stream image
        .to("#IntroPicture2", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade in waterfall image
        .to("#IntroPicture1", 0.1, { backgroundImage: "url('images/FaceInClif.jpg')", ease: Power0.easeNone }) // switch to face cliff
        .to("#IntroPicture2", 3.0, { opacity: 0, ease: Power0.easeNone }) // fade out waterfall image
        .to("#IntroPicture1", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade in face in cliff image
        .to("#LegendText15", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#IntroPicture2", 0.1, { backgroundImage: "url('images/TopOfTheWorld.jpg')", ease: Power0.easeNone }) // switch to top of the world
        .to("#IntroPicture1", 3.0, { opacity: 0, ease: Power0.easeNone }) // fade out face in clif image
        .to("#IntroPicture2", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade in top of the world image
        .to("#LegendText16", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#IntroPicture1", 0.1, { backgroundImage: "url('images/CrackedEarth.jpg')", ease: Power0.easeNone }) // switch to CrackedEarth
        .to("#IntroPicture2", 3.0, { opacity: 0, ease: Power0.easeNone }) // fade out top of world image
        .to("#IntroPicture1", 3.0, { opacity: 1, ease: Power0.easeNone }, "-= 1.0") // fade crackedEarth image
        .to("#LegendText17", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text
        .to("#LegendText18", 8.0, { top: -250, ease: Power0.easeNone }, "-= 3.0") // scroll text


        // need to have new audio here..

        .call(() => {
            overlayAudio.pause();
            overlayAudio.setAttribute("src", OtherSounds[10]);
            overlayAudio.currentTime = 0;
            overlayAudio.loop = true;
            overlayAudio.volume = 0.7;
            overlayAudio.play();
        }, [], this, "-=0.0")


        // start the shaking and expansion..
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: -5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: 5, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: -5, left: 10, ease: Power0.easeNone })
        .to("#IntroPicture1", 0.2, { top: 5, left: -5, ease: Power0.easeNone })

        // plung to darkness
        .to("#IntroPicture1", 2.0, { opacity: 0, scale: 120, ease: Power0.easeNone }, "-= 1.0")
        .call(function () {
            overlayAudio.pause();
            overlayAudio.setAttribute("src", OtherSounds[3]);
            overlayAudio.currentTime = 0;
            overlayAudio.loop = false;
            overlayAudio.volume = 0.5;
            overlayAudio.play();
        }, [], this, "-=2.0")

        .to("#LegendText19", 8.0, { top: -250, ease: Power0.easeNone }, "-=1.0") // scroll final text

        // So, here is the problem: it seems this timeline tween thing sticks around, intact, AFTER the function ends.  
        // In fact, if the animation has not ended, it will continue after the function returns.
        // IF i add a "kill()" at the end, it kills the whole thing and never plays anything, even though the kill is at the end...
        // So, the only recourse is to use the tween to reset the objects like the picture sources and the text locations back to 
        // the starting postions or it just won't run the second time... sigh...
        // what's also sad is that if this was set to repeat, I don't think you would have to do any of this cleanup.

        .to("#IntroStartPicture", 0.1, { display: "block", ease: Power0.easeNone })  // restore starting picture
        .to("#IntroPicture1", 0.01, { top: 0, left: 0, display: "none", backgroundImage: "url('images/Amethyst.jpg')", ease: Power0.easeNone })
        .to("#IntroPicture2", 0.01, { display: "none", backgroundImage: "url('images/creekThroughPastureland.jpg')", ease: Power0.easeNone })

        // we have to hide the text, then move it, then unhide.  Otherwise it causes flashing on the screen.
        // first hide:
        .to("#LegendText1", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText2", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText3", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText4", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText5", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText6", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText7", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText8", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText9", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText10", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText11", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText12", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText13", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText14", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText15", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText16", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText17", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText18", 0.01, { display: "none", ease: Power0.easeNone })
        .to("#LegendText19", 0.01, { display: "none", ease: Power0.easeNone })


        // now move.
        .to("#LegendText1", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText2", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText3", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText4", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText5", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText6", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText7", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText8", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText9", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText10", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText11", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText12", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText13", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText14", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText15", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText16", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText17", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText18", 0.01, { top: 700, ease: Power0.easeNone })
        .to("#LegendText19", 0.01, { top: 700, ease: Power0.easeNone })


        // now reset display
        .to("#LegendText1", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText2", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText3", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText4", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText5", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText6", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText7", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText8", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText9", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText10", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText11", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText12", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText13", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText14", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText15", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText16", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText17", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText18", 0.01, { display: "initial", ease: Power0.easeNone })
        .to("#LegendText19", 0.01, { display: "initial", ease: Power0.easeNone })


        // enable start adventure button:
        .to("#Adventure", 0.5, { hidden: false, disabled: false, ease: Power0.easeNone });


} // end runIntroduction



//----------------------------------------------------------------------------------------
// startAdventureHandler:   Called by start Adventure button handler
//                  
//  Hides the intro screen, shows the game screen.  
//-----------------------------------------------------------------------------------------
function startAdventureHandler() {
    "use strict";
    console.log("in start Adventure");

    // Hide the intro screen, show the game screen
    introScreen.style.display = "none";
    gameScreen.style.display = "block";
    helpScreen.style.display = "none";

    bIntroScreen = false;
    bHelpScreen = false;

    overlayAudio.pause();
    overlayAudio.currentTime = 0;


    // start main audio
    mainAudio.setAttribute("src", map[mapLocation][2]);
    mainAudio.currentTime = 0;
    mainAudio.loop = true;
    mainAudio.play();

    console.log("leaving start adventure");

}// end start Game Handler.



//----------------------------------------------------------------------------------------
// helpMeHandler:   Called by help button handler
//                  
//  Hides the intro  and game screens, shows the help screen.  
//-----------------------------------------------------------------------------------------
function helpMeHandler() {
    "use strict";
    // Hide the intro screen, game screen, show the help screen
    introScreen.style.display = "none";
    gameScreen.style.display = "none";
    helpScreen.style.display = "block";

    bHelpScreen = true;
}// end helpMeHandler


//----------------------------------------------------------------------------------------
// resumeGameHandler:   Called by Resume Game button handler
//                  
//  Hides the intro and help screens, shows the game screen.  
//-----------------------------------------------------------------------------------------
function resumeGameHandler() {
    "use strict";
    // Hides the intro and help screens, shows the game screen. 

    introScreen.style.display = "none";
    gameScreen.style.display = "block";
    helpScreen.style.display = "none";

    bIntroScreen = false;
    bHelpScreen = false;

    // restart main audio
    mainAudio.setAttribute("src", map[mapLocation][2]);
    mainAudio.currentTime = 0;
    mainAudio.loop = true;
    mainAudio.play();

}// end resumeGameHandler


//-----------------------------------------------------
//  newGame:
//       Called by button handler 
//       
//       Reinitializes and restarts game
//
//-----------------------------------------------------
function newGame() {
    "use strict";

    // Call init then reset to intro screen.
    init();

    // Hide the intro screen, show the game screen
    introScreen.style.display = "block";
    gameScreen.style.display = "none";

}// end loadGame



//----------------------------------------------------------------------------------------
// keydownHandler:   Called by key press event
//                  
//  Checks for if the return key was hit. If so, it calls the play game (Enter) button handler
//  because we are going to treat an enter key hit the same as the button hit.  
//-----------------------------------------------------------------------------------------
function keydownHandler(event) {
    // looking for the enter key...
    "use strict";

    if (event.keyCode === 13) {
        playGame();
    }

}// end keydown handler




//-----------------------------------------------------
// playGame: 
//       Called by button event handler when player inputs 
//       an action and presses play.
//       Figures out players action and acts on it accordingly
//       This includes taking, using or dropping items, movement
//       and re-displaying game screen based on it all.
//-----------------------------------------------------
function playGame() {
    "use strict";

    // reset previous turns variables:
    gameMessage = "";
    action = "";
    currentItem = "";

    // make sure all buttons are enabled.
    playButton.disabled = false;
    saveButton.disabled = false;
    loadButton.disabled = false;
    newGameButton.disabled = false;


    // get player input and convert to lower case since 
    // that's how we have everything in our arrays
    playersInput = input.value;
    playersInput = playersInput.toLowerCase();

    // clear the input text area. Nicer for the player.
    input.value = "";

    // put out log of what we think player typed.
    console.log("players input is: " + playersInput + ".");

    // figure out the players action selection
    let i = 0;
    let loopEnd = actionsIKnow.length;

    for (i = 0; i < loopEnd; i += 1) {
        // if what the player put in is a valid game action then..
        if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
            action = actionsIKnow[i];
            console.log("player's action: " + action);
            break;
        }
    }// end for actions loop


    // In case the player is doing an item action, determine which item
    loopEnd = itemsIKnow.length;  // reset loopEnd
    console.log("loopEnd for items is: " + loopEnd);

    for (i = 0; i < loopEnd; i += 1) {
        if (playersInput.indexOf(itemsIKnow[i]) !== -1) {
            currentItem = itemsIKnow[i];
            console.log(`player's item selection:  ${currentItem}`);
            break;
        }

    }// end for items loop

    // Short circut movement if currently in magical maze cave.
    let testDirection = "northsoutheastwest";
    if (mapLocation === 4 && testDirection.includes(action) && action != "ronaustin") {
        // in maze cave, made movement direction a random direction including staying here..
        // 1=4 are north, south, east, west respecively.  5 is stay here.

        console.log("in maze cave action if");

        let myNumber = myRandom(5);
        switch (myNumber) {
            case 1:
                action = "north";
                break;

            case 2:
                action = "south";
                break;

            case 3:
                action = "east";
                break;

            case 4:
                action = "west";
                break;

            case 5:
                action = "lost";
                break;

            default:
                action = "lost";

        }// end switch myRandom

        console.log(`in maze if after random.  new action is: ${action}`);
    }// end if in maze cave short circut
    else if (action == "ronaustin") {
        action = "north";
    }



    // the big switch for the action:  NOTE:  this will change some when the map size increases.
    switch (action) {
        case "lost":
            // lost in the maze cave
            mapLocation = 4;
            previousMapLocation = mapLocation;
            break;



        case "north":
            if (mapLocation >= 3) {
                switch (mapLocation) {

                    case 3: // jelly monster
                        if (bJellyMonsterAlive) {
                            gameMessage = blockedPathMessages[3][0]; // jelly monster.
                        }
                        else {
                            previousMapLocation = mapLocation;
                            mapLocation -= 3;
                        }
                        break;

                    case 5: // might be swimming the lake...
                        if (previousMapLocation != 2) {  // you are NOT just returning from whence you came...
                            // you are attempting to swim lake....
                            // if dont make it accross lake then do nothing. 
                            // swimLake function already set up messages.

                            if (swimLake()) {
                                // made it!
                                previousMapLocation = mapLocation;
                                mapLocation -= 3;
                            } // end if swimLake

                        }// end if you are not returning from where you came from.
                        else {
                            // you are returning from whence you came.
                            previousMapLocation = mapLocation;
                            mapLocation -= 3;
                        }
                        break;


                    default:
                        previousMapLocation = mapLocation;
                        mapLocation -= 3;
                }// end switch map location for location >= 3
            }// end if location >= 3
            else {  // northmost locations

                if (mapLocation === 0) {
                    // Exit Gate
                    if (bGateOpen) {
                        endGameReason = "Reached Exit";
                    }
                    else {
                        gameMessage = blockedPathMessages[mapLocation][0];
                    }
                }// end if map location
                else {
                    gameMessage = blockedPathMessages[mapLocation][0];
                }
            }// end else northmost
            break;


        case "east":
            if (mapLocation % 3 != 2) {  // if not eastmost locations..
                switch (mapLocation) {
                    case 3:  // jelly monster
                        if (bJellyMonsterAlive) {
                            gameMessage = blockedPathMessages[3][1]; // jelly monster.
                        }
                        else {
                            previousMapLocation = mapLocation;
                            mapLocation += 1;
                        }
                        break;

                    case 7: // cliff - need rope and grappling hook.
                        if (!bLanternInUse) {
                            // fool!  wondering around in the dark you fell off a cliff!
                            endGameReason = "Dark Cliff";
                        }
                        if ((backpack.indexOf("rope") === -1) || (backpack.indexOf("grappling hook") === -1)) // no rope w grappling hook
                        {
                            gameMessage = blockedPathMessages[7][1];
                        }
                        else {
                            gameMessage = "You use the rope and grappling hook to repell down the cliff.";
                            previousMapLocation = mapLocation;
                            mapLocation += 1;
                        } // end else have rope and grappling hook
                        break;

                    default:
                        previousMapLocation = mapLocation;
                        mapLocation += 1;
                }// end switch maplocation for east

            }// end if not eastmost
            else {
                gameMessage = blockedPathMessages[mapLocation][1];  // east way blocked
            }
            break;


        case "south":
            if (mapLocation < 6) {  // if not southmost location
                switch (mapLocation) {
                    case 0:  // jelly monster
                        if (bJellyMonsterAlive) {
                            gameMessage = blockedPathMessages[0][2]; // jelly monster.
                        }
                        else {
                            previousMapLocation = mapLocation;
                            mapLocation += 3;
                        }
                        break;


                    case 5: // might be swimming the lake...
                        if (previousMapLocation != 8) {  // you are NOT just returning from whence you came...
                            // you are attempting to swim lake....
                            // if dont make it accross lake then do nothing. 
                            // function already set up messages.

                            if (swimLake()) {
                                // made it!
                                previousMapLocation = mapLocation;
                                mapLocation += 3;
                            } // end if swimLake

                        }// end if you are not returning from where you came from.
                        else {
                            // you are returning from whence you came.
                            previousMapLocation = mapLocation;
                            mapLocation += 3;
                        }
                        break;

                    default:
                        previousMapLocation = mapLocation;
                        mapLocation += 3;
                }// end switch location if < 6

            }// end if not southmost
            else {
                gameMessage = blockedPathMessages[mapLocation][2];
            }
            break;


        case "west":
            if (mapLocation % 3 != 0) { // if not west most.
                switch (mapLocation) {
                    case 4:  // jelly monster
                        if (bJellyMonsterAlive) {
                            gameMessage = blockedPathMessages[4][3]; // jelly monster.
                        }
                        else {
                            previousMapLocation = mapLocation;
                            mapLocation -= 1;
                        }
                        break;

                    case 5: // might be swimming the lake...
                        if (previousMapLocation != 4) {  // you are NOT just returning from whence you came...
                            // you are attempting to swim lake....
                            // if dont make it accross lake then do nothing. 
                            // function already set up messages.

                            if (swimLake()) {
                                // made it!
                                previousMapLocation = mapLocation;
                                mapLocation -= 1;
                            }// end if swimLake

                        }// end if you are not returning from where you came from.
                        else {
                            // you are returning from whence you came.
                            previousMapLocation = mapLocation;
                            mapLocation -= 1;
                        }
                        break;


                    case 8:  // cliff
                        if ((backpack.indexOf("rope") === -1) || (backpack.indexOf("grappling hook") === -1)) // no rope w grappling hook
                        {
                            gameMessage = blockedPathMessages[8][3]; // cliff
                        }
                        else {
                            previousMapLocation = mapLocation;
                            mapLocation -= 1;
                            gameMessage = "You use the rope and grappling hook to climb the cliff.";
                        }
                        break;

                    default:
                        previousMapLocation = mapLocation;
                        mapLocation -= 1;
                }// end switch location if < 6

            }// end if not west most
            else {
                gameMessage = blockedPathMessages[mapLocation][3];
            }
            break;


        case "take":
            takeItem();
            break;


        case "drop":
            dropItem();
            break;


        case "use":
            useItem();
            break;

        /*   **************************************************
         *   Below commented out until I figure out if I want them for real or not
         *   ***************************************************** 
                case "search":
                    search();  // search the location
        
                    break;
        
        
                case "open":
                    openSomething();  // open a door, gate or container
                    break;
        
        
                case "close":
                    closeSomething();
                    break;
        
        
                case "up":  // go up if possible
                    if (mapLocation >= 3) {
                        mapLocation -= 3;
                    }
                    else {
                        gameMessage = blockedPathMessages[mapLocation];
                    }
                    break;
        
        
                case "down":  // go down if possible
                    if (mapLocation >= 3) {
                        mapLocation -= 3;
                    }
                    else {
                        gameMessage = blockedPathMessages[mapLocation];
                    }
                    break;
        */

        // Other action cases I might use later:
        /*
        case "search":
        case "open":
        case "close":
        case "up":
        case "down":
        */
        default:
            gameMessage = "Sorry, I don't understand that.";

    } // end big switch


    // now display the new game situation
    renderGame();

} // end function playGame



//-----------------------------------------------------
// takeItem: 
//       Called by playGame 
//       
//       takes currentItem from map and puts into players backpack.
//
//-----------------------------------------------------
function takeItem() {
    "use strict";
    // Get currentItem index number in the itemsInWorld array.  Use it to verify
    // that the item actually exists at the players location.  If so, remove from world
    // and add to players backpack.

    let itemIndex = itemsInWorld.indexOf(currentItem);

    // output item and itemindex we are working with for debug.
    console.log("currentItem: " + currentItem + " itemIndex: " + itemIndex);

    if (itemIndex != -1 &&
        itemLocations[itemIndex] === mapLocation) {

        // monster check
        if (mapLocation === 3 && bJellyMonsterAlive) { // jelly monster!
            gameMessage = `The ${currentItem} is embedded in the Jelly.  The jelly burns your hands when you try to get it.`;
            Player.hitpoints -= 1;
            if (Player.hitpoints <= 0) {
                // died from jelly burns
                Player.bAlive = false;
                Player.deathReason = "JellyBurns";
                endGameReason = "JellyBurns";
            }

        }
        else if (MonsterInTheDark.location === mapLocation && MonsterInTheDark.bAlive) { // Monster in the dark!
            // surprise hit by monster with no fish decoy! 
            gameMessage = `You try to get the ${currentItem} but a HUGE Monster charges out of the dark and attacks you!`;
            overlayAudio.pause();
            overlayAudio.setAttribute("src", OtherSounds[4]);
            overlayAudio.currentTime = 0;
            overlayAudio.play();

            if (!Player.armor) {
                Player.hitpoints -= 8;
            }
            else {
                Player.hitpoints -= 2;
            }

            if (Player.hitpoints <= 0) {
                // died from monster hit
                Player.bAlive = false;
                Player.deathReason = "MonsterInDark";
                endGameReason = "MonsterInDark";
            }

        }
        else {

            // ok, remove from world if NOT salt or fish:
            if (currentItem != "salt" && currentItem != "fish") {
                // cant run out of salt or fish

                // if gem, only one allowed in pack
                if (currentItem === "glowing gem" && (backpack.indexOf("glowing gem") !== -1)) {
                    gameMessage = "Wait, you already have a HUGE glowing gem.  You don't have room in your pack for another.";
                }
                else {
                    itemsInWorld.splice(itemIndex, 1);
                    itemLocations.splice(itemIndex, 1);
                }// end if gem

            }// end if not salt


            // put in pack and display message to player
            // if gem, only one allowed in pack
            if (currentItem === "glowing gem" && (backpack.indexOf("glowing gem") !== -1)) {
                gameMessage = "Wait, you already have a HUGE glowing gem.  You don't have room in your pack for another.";
            }
            else {
                backpack.push(currentItem);
                gameMessage = "You take the " + currentItem + ".";

                // add notes to console.log for debug
                console.log(`Player took ${currentItem} from ${mapLocation}`);
                console.log("Player's backpack now holds: " + backpack);
                console.log("Items in World are now: " + itemsInWorld);
                console.log("Item locations in world are now: " + itemLocations);
            }
        }// end else jelly monster not alive.
    }
    else {
        // item is not at this location... Tell player
        gameMessage = "You can't do that here.";
    }


}// end takeItem



//-----------------------------------------------------
// dropItem: 
//       Called by playGame 
//       
//       Takes currentItem from player's backpack and
//       drops it at the current location.  If it's not
//       in the backpack then it displays error message.
//
//-----------------------------------------------------
function dropItem() {
    "use strict";
    // First check to make sure backpack isn't empty.  If it isn't, get currentItem index 
    // number in the players backpack. Remove the item from the backpack, add it to the
    // world items array and add it's location to the world items location array.  Finally
    // tell the player they dropped the item.

    if (backpack.length != 0) {

        let itemIndex = -1;  // init index
        itemIndex = backpack.indexOf(currentItem);

        if (itemIndex != -1) {

            // ok it exists in backpack.  Remove from pack, add to world.
            backpack.splice(itemIndex, 1);

            //if it is salt, and location is 6 (lava / salt pit) then don't add to world.
            if (!(mapLocation === 6 && currentItem === "salt")) {
                itemsInWorld.push(currentItem);
                itemLocations.push(mapLocation);
            }

            // tell player they dropped it.
            gameMessage = `You dropped the ${currentItem}.`;

            // if its the lantern, douse the light!
            if (currentItem === "lantern") {
                bLanternInUse = false;
            }

        }
        else {
            // item not in back pack
            gameMessage = "You don't have that in your backpack.";
        }

    }// end backpack length
    else {
        // back pack is empty.  Tell player.
        gameMessage = "Your backpack is empty.  There is nothing to drop!";
    }

}// end dropItem



//-----------------------------------------------------
// useItem: 
//       Called by playGame 
//       
//       Takes currentItem from player's backpack and
//       uses it, if possible, at the current location.  
//       If it's can't be used at the location or if it's 
//       not in the backpack then it displays error message.
//
//-----------------------------------------------------
function useItem() {
    "use strict";
    // First check to make sure backpack isn't empty.  If it isn't, get currentItem index 
    // number in the players backpack. It it exists in the backpack, then try to use it at 
    // the players location.  Modify the world items and backpack items appropriately if using
    // the item destroys it, modifies it or requires it be left in the world at that location.
    // If the item can't be used at this location, or is not in the backpack, display appropriate
    // error messages. 

    console.log("in useItem.  Current Item is: " + currentItem);
    // currently known items: "Salt", "Rope", "Grappling Hook", "Plate Armor", "Sword", "Lantern", "Pick Axe", "Glowing Gem"

    let bItemUsedUp = false;  // bool for if item is destroyed.
    let bItemPlaced = false;  // bool for if item is placed in world by using.

    // hit vars for combat with monster
    let playersHit = 0;
    let monsterHit = 0;


    if (backpack.length != 0) {

        let itemIndex = -1;  // init index
        itemIndex = backpack.indexOf(currentItem);

        if (itemIndex != -1) {

            // ok it exists in backpack.  Figure out if it can be used and how.
            switch (currentItem) {

                case "salt":  // item can be used anywhere...
                    if (mapLocation == 3) {
                        // jelly monster 
                        bJellyMonsterAlive = false;
                        gameMessage = "You throw handfulls of salt at the Jelly on the walls.  The jelly quickly disolves away.";
                        backpack.splice(itemIndex, 1);  // out of salt
                    }
                    else {
                        gameMessage = "You throw handfulls of salt over your shoulder for good luck.  You really think you'll need it!";
                        backpack.splice(itemIndex, 1);  // out of salt
                    }
                    break;


                case "rope":
                    if (backpack.indexOf("grappling hook") != -1) {
                        gameMessage = "You tie the grappling hook onto the end of your rope. Bet you can use this for climbing!";
                    }
                    else {
                        gameMessage = "You swing the rope around ineffectively.  You need a good weight on the end of it.";
                    }
                    break;


                case "grappling hook":
                    if (backpack.indexOf("rope") != -1) {
                        gameMessage = "You tie the grappling hook onto the end of your rope. Bet you can use this for climbing!";
                    }
                    else {
                        gameMessage = "You try to wack a rock with the grappling hook.  It sticks in and is hard to get back out.";
                    }
                    break;


                case "plate armor":
                    if (!Player.armor) {
                        gameMessage = "You put the plate armor on.  You feel invinceable!... and, well, a bit heavy.";
                        Player.armor = true;
                    }
                    else {
                        gameMessage = "You take the plate armor off.  You feel much lighter and well, kinda bare.";
                        Player.armor = false;
                    }
                    break;


                case "sword":
                    if (mapLocation === MonsterInTheDark.location && MonsterInTheDark.bAlive) {
                        // attacking Monster in the dark!!
                        playersHit = myRandom(1 * Player.swordSkill);
                        monsterHit = myRandom(20);  // armor helps!

                        if (Player.armor) {
                            // Nice to have armor

                            monsterHit -= 16;  // armor helps!
                            if (monsterHit < 0) {
                                monsterHit = 1;  // have to take some damage!
                            }
                        }

                        // set up audio:

                        fightAudio.currentTime = 0;

                        overlayAudio.pause();
                        overlayAudio.setAttribute("src", OtherSounds[4]);
                        overlayAudio.currentTime = 0;
                        overlayAudio.play();
                        fightAudio.play();

                        // take hits
                        Player.hitpoints -= monsterHit;
                        MonsterInTheDark.hitpoints -= playersHit;

                        // see whose still alive
                        if (Player.hitpoints <= 0) {
                            Player.bAlive = false;
                            Player.deathReason = "MonsterInDarkFight";
                            endGameReason = "MonsterInDarkFight";

                            gameMessage = `You hit the monster and it hit you... Sadly your body couldn't take it.`;
                        }
                        else if (MonsterInTheDark.hitpoints <= 0) {
                            MonsterInTheDark.bAlive = false;
                            gameMessage = "You attack the Monster lurking in the dark.  It's a tough fight but your armor saves you.  The Monster is dead!";
                        }
                        else {
                            gameMessage = "You and the Monster lurking in the dark duke it out. You are both bleeding, but both still standing.";
                        }

                    }// end if where the Monster is.
                    else {
                        gameMessage = "You practice with the sword.";
                        Player.swordSkill += 2;
                    }
                    break; // end sword switch


                case "lantern":
                    gameMessage = "You Light your " + currentItem + ".";
                    bLanternInUse = true;  // set flag to show lantern is being used.
                    console.log("lantern being used");
                    break;


                case "pick axe":
                    if (mapLocation === 2) {
                        if (backpack.indexOf("glowing gem") === -1) {
                            // mine that glowing gem!
                            gameMessage = "You mine the wall with your pick axe and dig out a Huge glowing gem!  Magical Power flows through you as you hold it!";
                            // add gem to world at this spot.
                            itemsInWorld.push("glowing gem");
                            itemLocations.push(mapLocation);
                        }// end if not in backpack
                        else {
                            //you already have one!
                            gameMessage = "Wait, you already have a HUGE glowing gem.  You don't have room in your pack for another.";
                        }
                    }// end if map location
                    else {
                        // not where it is useful.
                        gameMessage = "You use your pick axe to break some rocks but don't find anything useful.";
                    }
                    break;


                case "glowing gem":
                    console.log("in case glowing gem.");
                    if (mapLocation === 0) {
                        // at the gate!
                        gameMessage = "With the gem back in your hands, you feel the vast magic power flowing through you.  As you approach the gate, the gem glows brighter and brighter.  Suddenly the gate flashes a bright purple and goes dim.";
                        bGateOpen = true;
                    }
                    else {
                        gameMessage = "You can feel the magic power flowing through you.  You hold the gem high in both hands and in your mind you command: 'Let there be Light!'  The gem glows brightly.  It makes a rather large and, um, lets be honest, HEAVY,  nightlight...";
                    }
                    break;


                case "fish":
                    if (backpack.indexOf("fish") != -1) {

                        if (mapLocation === MonsterInTheDark.location && MonsterInTheDark.bAlive) {
                            //oops, cooking near a hungry monster....
                            gameMessage = `You start to cook the ${currentItem} but the Monster is hungry too and surprises you! Happily it decided on fish dinner rather than eatting you.`;
                            overlayAudio.pause();
                            overlayAudio.setAttribute("src", OtherSounds[4]);
                            overlayAudio.currentTime = 0;
                            overlayAudio.play();

                            if (!Player.armor) {
                                Player.hitpoints -= 2;
                            }

                            if (Player.hitpoints <= 0) {
                                // died from monster hit
                                Player.bAlive = false;
                                Player.deathReason = "MonsterInDark";
                                endGameReason = "MonsterInDark";
                            }

                        }
                        else {
                            // not where monster is. so ok.
                            gameMessage = `You cook the ${currentItem} and eat it.  You feel a lot better now.`;
                            Player.hitpoints = 10;
                        }

                        bItemUsedUp = true;
                    }

                    break;

                case "item9":
                    gameMessage = "using " + currentItem + ".";
                    break;

                default:
                    gameMessage = "You can't use that here.";

            }// end switch

            if (bItemUsedUp) {
                // remove from backpack and world
                backpack.splice(itemIndex, 1);
                bItemUsedUp = false;
            }
            else if (bItemPlaced) {
                // remove from pack, place in world.
                backpack.splice(itemIndex, 1);
                itemsInWorld.push(currentItem);
                itemLocations.push(mapLocation);
                bItemPlaced = false;
            }

        }// end if item in backpack
        else {
            // item not in back pack
            gameMessage = "You don't have that in your backpack.";
        }// end backpack length

    }// end backpack length
    else {
        // back pack is empty.  Tell player.
        gameMessage = "Your backpack is empty.  There is nothing to use!";
    }

}// end use item



//-----------------------------------------------------
//  renderGame:
//       Called by init and playGame 
//       
//       Displays current game state including image
//       location id, items at location, game message,
//       and player's backpack contents.
//
//-----------------------------------------------------
function renderGame() {
    //OtherSounds[0] = "audio/Africa.mp3";  // main opening game song
    //OtherSounds[1] = "audio/forest_fire.mp3"; // to overlay with lava in lava cave
    //OtherSounds[2] = "audio/gravelwalk.mp3"; // main area transition sound
    //OtherSounds[3] = "audio/FallingToDeath.mp3";  // you fall to your death
    //OtherSounds[4] = "audio/Monster_Footsteps.mp3"; // for monster attack and or follow
    //OtherSounds[5] = "audio/Blade_Combat.mp3";  // player attacks monster with sword
    //OtherSounds[6] = "audio/MonsterFarAway.mp3";  // monster is far away
    //OtherSounds[7] = "audio/MonsterInSameRoom.mp3";  // monster is in YOUR cave room!!
    //OtherSounds[8] = "audio/Drowning.mp3";  // You Drown
    //OtherSounds[9] = "audio/MonsterTearFlesh.mp3";  // monster is eatting you.
    //OtherSounds[10] = "audio/EarthQuake.mp3";  // Earthquake!
    //OtherSounds[11] = "audio/HotSizzling.mp3";  // Jelly Monster Sizzle!

    "use strict";

    // reinit outputs:
    output.innerHTML = "";
    output2.innerHTML = "";

    // if endGameReason length is not <=1 then we had an end game situation.
    if (endGameReason.length > 1) {
        // end game!
        switch (endGameReason) {
            case "SeaMonster": // got eaten by seamonster.
                overlayAudio.setAttribute("src", OtherSounds[9]);
                output.innerHTML = "You try to swim across to the other side.   ALAS!  A Sea Monster ATE YOU!! <br> GAME OVER";
                screenImage.style.backgroundImage = SeaMonster;
                break;

            case "JellyBurns": // got eaten by seamonster.
                overlayAudio.setAttribute("src", OtherSounds[11]);
                output.innerHTML = "You were too weak.  The Jelly on the walls burns you to death. <br> GAME OVER";
                screenImage.style.backgroundImage = Skull;
                break;

            case "armor drowning": // armor too heavy and you drowned
                overlayAudio.setAttribute("src", OtherSounds[8]);
                output.innerHTML = "You try to swim across to the other side.  ALAS! The armor you have drags you under and you drown! <br> GAME OVER";
                screenImage.style.backgroundImage = Drowned;
                break;

            case "MonsterInDark":
                overlayAudio.setAttribute("src", OtherSounds[4]);
                output.innerHTML = "The Monster lurking in the dark charges out and EATS YOU!!  <br>   GAME OVER";
                screenImage.style.backgroundImage = MonsterInDark;
                break;

            case "MonsterInDarkFight":
                overlayAudio.setAttribute("src", OtherSounds[4]);
                output.innerHTML = "You hit the monster and it HIT you... Sadly your body couldn't take it.  <br>   GAME OVER";
                screenImage.style.backgroundImage = MonsterInDark;
                break;

            case "Dark Cliff":
                overlayAudio.setAttribute("src", OtherSounds[3]);
                output.innerHTML = `You wander around in the dark and step into nothingness!  You fall to your DEATH!
  GAME OVER`;
                screenImage.style.backgroundImage = Skull;
                break;

            case "Reached Exit":
                overlayAudio.setAttribute("src", OtherSounds[0]);
                output.innerHTML = "Fresh air fills your lungs as the outside breeze flows over you!  You made it!  <br> ";
                screenImage.style.backgroundImage = TheExit;
                break;

            default: // should not get here ever but...
                overlayAudio.setAttribute("src", OtherSounds[3]);
                output.innerHTML = `You stumbled and skewered yourself on a stalagmite!  Sadly you are dead!
 GAME OVER`;
                screenImage.style.backgroundImage = Skull;

        }// end switch endgame


        // end main audio:
        mainAudio.pause();

        // play overlay audio:
        overlayAudio.currentTime = 0;
        overlayAudio.play();


        // disable and hide all buttons except load and new game.
        playButton.disabled = true;
        playButton.hidden = true;
        saveButton.disabled = true;
        saveButton.hidden = true;
        loadButton.disabled = false;
        newGameButton.disabled = false;

        // disable input box  and hide it
        input.hidden = true;
        input.disabled = true;


    }// end if end game
    else {
        // Not ending Game.  Continue on!


        // IF the lantern is not on,  and not in a location with a light source, then player only sees the black!
        if (!bLanternInUse && mapLocation != 6 && mapLocation != 2 && mapLocation != 0) {
            screenImage.style.backgroundImage = TheDark;


            if (MonsterInTheDark.location === mapLocation && MonsterInTheDark.bAlive) {
                // monster here!
                overlayAudio.setAttribute("src", OtherSounds[7]);
                overlayAudio.currentTime = 0;
                overlayAudio.play();
            }

            gameMessage = "It is pitch black.  You can't see anything.";
            output.innerHTML = map[mapLocation][1];  // in the dark description
            console.log("in dark if.  screenImage is: " + screenImage.style.backgroundImage);
        }
        else // lantern is on
        {
            // You can see!  show image and discription
            screenImage.style.backgroundImage = locationImages[mapLocation];
            output.innerHTML = map[mapLocation][0];  // in the light description

            // check for magic haze location:
            if (mapLocation === 4) {
                console.log("in magic haze location check");
                magicHaze.style.display = "block";
            }
            else {
                magicHaze.style.display = "none";
            }


            // monster check:
            if (MonsterInTheDark.location === mapLocation && MonsterInTheDark.bAlive) {
                // monster here!
                overlayAudio.setAttribute("src", OtherSounds[7]);
                overlayAudio.currentTime = 0;
                overlayAudio.play();
                output2.innerHTML += "<br> You think you see something LARGE moving in the dark shadows.";
            }


            let i = 0;
            //show items if they are there at this location
            for (i = 0; i < itemsInWorld.length; i += 1) {
                if (mapLocation === itemLocations[i]) {
                    // display item
                    output.innerHTML += "<br> You see a <strong>" + itemsInWorld[i] + "</strong> here.";
                }
            }// end for i
        }// end else lantern IS on

        // display game message 
        output2.innerHTML += "<br> <em> " + gameMessage + " </em> ";


        //  show players backpack contents:
        if (backpack.length != 0) {
            output.innerHTML += "<br> You are carrying: <strong>" + backpack.join(", ") + "</strong>";
        }

        // Lastly show Players hit points
        if (Player.hitpoints < 3) {
            output.innerHTML += "<br>  You are horribly wounded! You only have: <bleeding>" + Player.hitpoints + "</bleeding> hit points left!";
        }
        else if (Player.hitpoints < 6) {
            output.innerHTML += "<br>  You are seriously wounded! You only have: <bleeding>" + Player.hitpoints + "</bleeding> hit points left!";
        }
        else if (Player.hitpoints < 8) {
            output.innerHTML += "<br>  You are wounded. You have: <bleeding>" + Player.hitpoints + "</bleeding> hit points left!";
        }
        else if (Player.hitpoints < 10) {
            output.innerHTML += "<br> You have: <strong>" + Player.hitpoints + "</strong> hit points left!";
        }
        else {
            output.innerHTML += "<br> You have: <strong>" + Player.hitpoints + "</strong> hit points.";
        }


        // reset audio ONLY if we are in main game screen.
        mainAudio.pause();
        console.log(`bintro: ${bIntroScreen} and bhelp: ${bHelpScreen}`);
        if (!bIntroScreen && !bHelpScreen) {
            console.log(`in render in make new main sound section: bintro: ${bIntroScreen} and bhelp: ${bHelpScreen}`);
            mainAudio.setAttribute("src", map[mapLocation][2]);
            mainAudio.currentTime = 0;
            mainAudio.loop = true;
            mainAudio.play();

            // check for random area sound of monster.. 33% of time..
            if (MonsterInTheDark.bAlive && (MonsterInTheDark.location != mapLocation) && (myRandom(6) > 4)) {
                overlayAudio.setAttribute("src", OtherSounds[6]);
                overlayAudio.currentTime = 0;
                setTimeout(function () { overlayAudio.play(); }, 2000);
            }
        } // end if in main game screen.


    }// end else not end game.

    console.log("at end of render.   screenImage is: " + screenImage.style.backgroundImage);
}// end renderGame




//-----------------------------------------------------
//  saveGame:
//       Called by button handler 
//       
//       Gathers all gamestate related variables, converts to text
//       in Json format and saves to local storage.
//
//-----------------------------------------------------
function saveGame() {
    "use strict";

    // create an object to put into JSON.stringify(obj);
    // temp gameStateObject
    let gameStateObject = {
        saveMapLocation: mapLocation,    // location
        savePreviousMapLocation: previousMapLocation,  // previous location
        saveItemsInWorld: itemsInWorld,   // items in the world
        saveItemLocations: itemLocations,  // location of the items in the world
        saveBackpack: backpack,  // whats in the backpack 
        savebLanternInUse: bLanternInUse,  // lamp must be on to be able to see anything...
        savebJellyMonsterAlive: bJellyMonsterAlive,  // must kill to get grappling hook
        saveMonsterInTheDark: MonsterInTheDark, // must kill to get pick axe.
        saveEndGameReason: endGameReason,  // game not ended
        savebGateOpen: bGateOpen,   // is the exit gate open?
        savePlayer: Player   // save the Player object
    }; // end temp game state obj creation.

    // stringify it all then save in local storage
    let dataString = JSON.stringify(gameStateObject);

    // now save to local storage
    localStorage.setItem("TheCaveGameData", dataString);

}// end saveGame


//-----------------------------------------------------
//  loadGame:
//       Called by button handler 
//       
//       Gets gameStateObject from local storage and puts
//       into appropriate game data structures.
//
//-----------------------------------------------------
function loadGame() {
    "use strict";

    // temp gameStateObject
    let gameStateObject = null;

    let tempString = "";
    // get state object from local storage
    tempString = localStorage.getItem("TheCaveGameData");

    console.log("Loaded gamedata: " + tempString);

    gameStateObject = JSON.parse(tempString);
    console.log("Gamestate Object after parse: " + gameStateObject);

    // now get data from state object
    mapLocation = gameStateObject.saveMapLocation;
    console.log("mapLocation: " + gameStateObject.saveMapLocation);

    // previous location
    previousMapLocation = gameStateObject.savePreviousMapLocation;
    console.log("previousMapLocation: " + gameStateObject.savePreviousMapLocation);

    itemsInWorld = gameStateObject.saveItemsInWorld;
    console.log("itemsInWorld: " + gameStateObject.saveItemsInWorld);

    itemLocations = gameStateObject.saveItemLocations;
    console.log("itemLocations: " + gameStateObject.saveItemLocations);

    backpack = gameStateObject.saveBackpack;
    console.log("backpack: " + gameStateObject.saveBackpack);

    // flags
    bLanternInUse = gameStateObject.savebLanternInUse;
    console.log("bLanternInUse: " + gameStateObject.savebLanternInUse);

    bJellyMonsterAlive = gameStateObject.savebJellyMonsterAlive;
    console.log("bJellyMonsterAlive: " + gameStateObject.savebJellyMonsterAlive);

    MonsterInTheDark = gameStateObject.saveMonsterInTheDark;
    console.log("MonsterInTheDark: " + gameStateObject.saveMonsterInTheDark);

    endGameReason = gameStateObject.saveEndGameReason;
    console.log("endGameReason: " + gameStateObject.saveEndGameReason);

    bGateOpen = gameStateObject.savebGateOpen;
    console.log("bGateOpen: " + gameStateObject.savebGateOpen);

    Player = gameStateObject.savePlayer;
    console.log("player: " + gameStateObject.savePlayer);


    // make sure all buttons available if not end of game.
    if (endGameReason.length < 2) {
        playButton.disabled = false;
        playButton.hidden = false;
        saveButton.disabled = false;
        saveButton.hidden = false;
        loadButton.disabled = false;
        newGameButton.disabled = false;
    }

    // make sure input box is visable and operational
    input.hidden = false;
    input.disabled = false;

    // reinit game message:
    gameMessage = "";

    // now redisplay game
    renderGame();

}// end loadGame






//-----------------------------------------------------
//  swimLake:
//       Called by playgame, in action resolution 
//       
//       determines if player successfully swims lake
//
//-----------------------------------------------------
function swimLake() {
    "use strict";

    let monsterChance = 50; // chance for seamonster to eat you.
    let swimChance = 75;   // chance for player to successfully swim it.
    let swimRoll = myRandom(100);  // roll to see if monster eats you!
    let bSuccess = false;

    if (swimRoll > monsterChance) { // sea Monster eats you!
        endGameReason = "SeaMonster";
        bSuccess = false;
    }
    else {
        swimRoll = myRandom(100);  // roll again to see if you can swim it

        if (backpack.indexOf("plate armor") != -1) {
            // ugg, you are weighed down with armor!
            console.log("weighed down.. initial swim roll: " + swimRoll);
            swimChance = 25;  // armor weighs you down!

            if (swimRoll > swimChance) // you drown!
            {
                endGameReason = "armor drowning";
                bSuccess = false;
                console.log("armor drowning");
            }
            else {  // swam it!
                bSuccess = true;
            }
        }// end if armor
        else {
            // just trying to swim it unencombered and no monster attack
            if (swimRoll > swimChance) {
                // had to turn back.  
                gameMessage = "The water was too much for you.  You had to turn back before you drowned!";
                bSuccess = false;
            }
            else {
                bSuccess = true; // player swam it!
            }
        }// end else just swim unencumbered
    }// end else monster did not eat you so try to swim

    return bSuccess;

}// end swimLake




//-----------------------------------------------------
//  myRandom(inNumber)
//       Called to get random number from 1 to number given
//       returns the number.
//      
//-----------------------------------------------------
function myRandom(inNumber) {
    "use strict";

    let randNum = Math.floor(Math.random() * inNumber) + 1;

    return randNum;

}// end myRandom