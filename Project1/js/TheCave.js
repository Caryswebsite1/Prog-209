"use strict";

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

// create map
const map = [[], [], [], [], [], [], [], [], []];  // 9 dimentional array so we can have a lighted and unlighted map area discription.

map[0][0] = "A glowing gateway blocks the path to the north.";
map[0][1] = "A glowing gateway blocks the path to the north.";
map[1][0] = "An Ice Cave.  The icicles glitter like diamonds in the lantern light.  Rainbows rays of colors shine all around you.";
map[1][1] = "It's Very Cold.  And you hear something moving...";
map[2][0] = "The Cave of Gems!  You found it!  Large glowing gems stud the walls and ceiling, iluminating the area in a mystical light.";
map[2][1] = "The Cave of Gems!  You found it!  Large glowing gems stud the walls and ceiling, iluminating the area in a mystical light.";
map[3][0] = "The walls and ceiling are covered in a strange jelly like substance.";
map[3][1] = "Something squishes under your feet in the dark.";
map[4][0] = "Your stomach does flip flops. You feel dizzy. There is a faint blueish haze all around. There are tunnels in each direction";
map[4][1] = "Your stomach does flip flops. You feel dizzy. There is a faint blueish haze all around. There are tunnels in each direction";
map[5][0] = "A large body of water stretches away from you, the waves lapping against the shore.";
map[5][1] = "You think you hear the lapping of waves?  How can that be?";
map[6][0] = "The glow from the hot lava illuminates the area.  Through the sweat dripping in your eyes you see what appears to be salt deposits scattered around.";
map[6][1] = "The glow from the hot lava illuminates the area.  Through the sweat dripping in your eyes you see what appears to be salt deposits scattered around.";
map[7][0] = "The roar of water fills your ears.  Spray fills the air.";
map[7][1] = "A constant roar fills your ears.  Your face is getting wet from something.";
map[8][0] = "The shallow river flows north.";
map[8][1] = "You hear what you think is the sound of moving water.";

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
let actionsIKnow = ["north", "east", "south", "west", "up", "down", "search", "take", "use", "drop", "open", "close"];
let action = "";

// another item array to hold all the items the game understands
// this is Not the same as the itemsInWorld because the glowing gem is not available until it is mined.
const itemsIKnow = ["salt", "rope", "grappling hook", "plate armor", "sword", "lantern", "pick axe", "glowing gem", "item8", "item9"];
let currentItem = "";  // the current item being actioned


let MonsterInTheDark = {// must kill to get pick axe.
    hitpoints: 50,
    location: 1,
    bAlive: true
};

// FLAGS for items and monsters
let bLanternInUse = false;  // lamp must be on to be able to see anything...
let bJellyMonsterAlive = true;  // must kill to get grappling hook
let endGameReason = "";  // loaded with reason for end game so correct messages can be shown.??
let bGateOpen = false;  // is the exit gate open?
let bArmorOn = false;   // does the player have the armor on?


/* *********************************************************************
 *  html page items
 *  ********************************************************************* */

// the image element for the display of the image on the page:
let screenImage = document.getElementById("screenImage");

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

    // init main game state variables.  we can also call init from newGame button handler
    // and it will reset the world.


    // Reset FLAGS for items and monsters
    bLanternInUse = false;  // lamp must be on to be able to see anything...
    bJellyMonsterAlive = true;  // must kill to get grappling hook
    MonsterInTheDark.bAlive = true; // must kill to get pick axe. // must kill to get pick axe.
    endGameReason = "";  // game not ended
    bGateOpen = false;  // is the exit gate open?
    bArmorOn = false;   // does the player have the armor on?

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


    // set start location:
    mapLocation = 7;
    previousMapLocation = 7;

    // create an array for the items that are in the world at the start and set their locations
    // note: this itemsInWorld array will shrink as the player takes the items or grow as they drop the items.
    itemsInWorld = ["salt", "rope", "grappling hook", "plate armor", "sword", "pick axe"];

    // note: location index == item index.  value == map index
    itemLocations = [6, 0, 3, 8, 4, 1];

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

    // now that everything is set, display everything.
    renderGame();

} // end function init



//----------------------------------------------------------------------------------------
// startAdventureHandler:   Called by start Adventure button handler
//                  
//  Hides the intro screen, shows the game screen.  
//-----------------------------------------------------------------------------------------
function startAdventureHandler() {
    "use strict";
    // Hide the intro screen, show the game screen
    introScreen.style.display = "none";
    gameScreen.style.display = "block";
    helpScreen.style.display = "none";
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
}// end resumeGameHandler



//----------------------------------------------------------------------------------------
// keydownHandler:   Called by key press event
//                  
//  Checks for if the return key was hit. If so, it calls the play game (Enter) button handler
//  because we are going to treat an enter key hit the same as the button hit.  
//-----------------------------------------------------------------------------------------
function keydownHandler(event) {
    // looking for the enter key...
   
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

    for (i = 0; i < loopEnd; i++) {
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

    for (i = 0; i < loopEnd; i++) {
        if (playersInput.indexOf(itemsIKnow[i]) !== -1) {
            currentItem = itemsIKnow[i];
            console.log("player's item selection: " + currentItem);
            break;
        }

    }// end for items loop

    // the big switch for the action:  NOTE:  this will change some when the map size increases.
    switch (action) {
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
            gameMessage = "The " + currentItem + " is embedded in the Jelly.  The jelly burns your hands when you try to get it.";
        }
        else if (MonsterInTheDark.location === mapLocation && MonsterInTheDark.bAlive) { // Monster in the dark!
            endGameReason = "MonsterInDark";
        }
        else {

            // ok, remove from world if NOT salt:
            if (currentItem != "salt") {
                // cant run out of salt

                // if gem, only one allowed in pack
                if (currentItem === "glowing gem" && (backpack.indexOf("glowing gem") !== -1) ) {
                    gameMessage = "Wait, you already have a HUGE glowing gem.  You don't have room in your pack for another.";
                }
                else {
                    itemsInWorld.splice(itemIndex, 1);
                    itemLocations.splice(itemIndex, 1);
                }// end if gem

            }// end if not salt

           
            // put in pack and display message to player
            // if gem, only one allowed in pack
            if (currentItem === "glowing gem" && (backpack.indexOf("glowing gem") !== -1) ){
                gameMessage = "Wait, you already have a HUGE glowing gem.  You don't have room in your pack for another.";
            }
            else {
                backpack.push(currentItem);
                gameMessage = "You take the " + currentItem + ".";

                // add notes to console.log for debug
                console.log("Player took " + currentItem + " from " + mapLocation);
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
            if ( !(mapLocation === 6 && currentItem === "salt") ) {
                itemsInWorld.push(currentItem);
                itemLocations.push(mapLocation);
            }

            // tell player they dropped it.
            gameMessage = "You dropped the " + currentItem + ".";

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
                    if (!bArmorOn) {
                        gameMessage = "You put the plate armor on.  You feel invinceable!... and, well, a bit heavy.";
                        bArmorOn = true;
                    }
                    else {
                        gameMessage = "You take the plate armor off.  You feel much lighter and well, kinda bare.";
                        bArmorOn = false;
                    }
                    break;


                case "sword":
                    if (mapLocation === MonsterInTheDark.location && MonsterInTheDark.bAlive) {
                        // attacking Monster in the dark!!
                        if (bArmorOn) {
                            // we are good to go!  Kill it!
                            gameMessage = "You attack the Monster lurking in the dark.  It's a tough fight but your armor saves you.  The Monster is dead!";
                            MonsterInTheDark.bAlive = false;
                        }
                        else {
                            // no armor.. won't die but won't feel good.
                            gameMessage = "You attack the Monster lurking in the dark.  It's a tough fight and the Monster wounds you gravely.  The Monster is still alive!";
                        }

                    }// end where the Monster is.
                    else {
                        gameMessage = "You swing the sword in great arcs.  You think you could do some damage with this.";
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


                case "item8":
                    gameMessage = "using " + currentItem + ".";
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
            }
            else if (bItemPlaced) {
                // remove from pack, place in world.
                backpack.splice(itemIndex, 1);
                itemsInWorld.push(currentItem);
                itemLocations.push(mapLocation);
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


    // reinit outputs:
    output.innerHTML = "";
    output2.innerHTML = "";

    // if endGameReason length is not <=1 then we had an end game situation.
    if (endGameReason.length > 1) {
        // end game!
        switch (endGameReason) {
            case "SeaMonster": // got eaten by seamonster.
                output.innerHTML = "You try to swim across to the other side.   ALAS!  A Sea Monster ATE YOU!! <br> GAME OVER";
                screenImage.style.backgroundImage = SeaMonster;
                break;

            case "armor drowning": // armor too heavy and you drowned
                output.innerHTML = "You try to swim across to the other side.  ALAS! The armor you have drags you under and you drown! <br> GAME OVER";
                screenImage.style.backgroundImage = Drowned;
                break;

            case "MonsterInDark":
                output.innerHTML = "The Monster lurking in the dark charges out and EATS YOU!!  <br>   GAME OVER";
                screenImage.style.backgroundImage = MonsterInDark;
                break;

            case "Dark Cliff":
                output.innerHTML = "You wander around in the dark and step into nothingness!  You fall to your DEATH!  <br>   GAME OVER";
                screenImage.style.backgroundImage = Skull;
                break;

            case "Reached Exit":
                output.innerHTML = "Fresh air fills your lungs as the outside breeze flows over you!  You made it!  <br> ";
                screenImage.style.backgroundImage = TheExit;
                break;

            default: // should not get here ever but...
                output.innerHTML = "You stumbled and skewered yourself on a stalagmite!  Sadly you are dead!  <br>   GAME OVER";
                screenImage.style.backgroundImage = Skull;

        }// end switch endgame

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
        if (!bLanternInUse && mapLocation != 6 && mapLocation != 4 && mapLocation != 2 && mapLocation != 0) {
            screenImage.style.backgroundImage = TheDark;
            gameMessage = "It is pitch black.  You can't see anything.";
            output.innerHTML = map[mapLocation][1];  // in the dark description
            console.log("in dark if.  screenImage is: " + screenImage.style.backgroundImage);
        }
        else // lantern is on
        {
            // You can see!  show image and discription
            screenImage.style.backgroundImage = locationImages[mapLocation];
            output.innerHTML = map[mapLocation][0];  // in the light description


            // monster check:
            if (MonsterInTheDark.location === mapLocation && MonsterInTheDark.bAlive) {
                // monster here!
                output2.innerHTML += "<br> You think you see something LARGE moving in the dark shadows.";
            }


            let i = 0;
            //show items if they are there at this location
            for (i = 0; i < itemsInWorld.length; i++) {
                if (mapLocation === itemLocations[i]) {
                    // display item
                    output.innerHTML += "<br> You see a <strong>" + itemsInWorld[i] + "</strong> here.";
                }
            }// end for i
        }// end else lantern IS on

        // display game message 
        output2.innerHTML += "<br> <em> " + gameMessage + " </em> ";


        // finally show players backpack contents:
        if (backpack.length != 0) {
            output.innerHTML += "<br> You are carrying: <strong>" + backpack.join(", ") + "</strong>";
        }


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
        savebArmorOn: bArmorOn   // does the player have the armor on?
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

    bArmorOn = gameStateObject.savebArmorOn;
    console.log("bArmorOn: " + gameStateObject.savebArmorOn);


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
//  newGame:
//       Called by button handler 
//       
//       Reinitializes and restarts game
//
//-----------------------------------------------------
function newGame() {

    // Call init then reset to intro screen.
    init();

    // Hide the intro screen, show the game screen
    introScreen.style.display = "block";
    gameScreen.style.display = "none";

}// end loadGame



//-----------------------------------------------------
//  swimLake:
//       Called by playgame, in action resolution 
//       
//       determines if player successfully swims lake
//
//-----------------------------------------------------
function swimLake() {

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

    let randNum = Math.floor(Math.random() * inNumber) + 1;

    return randNum;

}// end myRandom