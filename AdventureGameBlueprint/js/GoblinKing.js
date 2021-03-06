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
var map = [];

map[0] = "A glowing gateway blocks the path to the north.";
map[1] = "An Ice Cave.  The icicles glitter like diamonds in the lantern light.  Rainbows rays of colors shine all around you.";
map[2] = "Large glowing gems stud the walls and cieling, iluminating the area in a mystical light.";
map[3] = "The walls and cieling are covered in a strange jelly like substance.";
map[4] = "Your stomach does flip flops. You feel dizzy. There is a faint blueish haze all around. There are tunnels in each direction";
map[5] = "A large body of water stretches away from you.  ";
map[6] = "The glow from the hot lava illuminates the area.  Through the sweat dripping in your eyes you see what appears to be salt deposits scattered around.";
map[7] = "The roar of water fills your ears.  Spray fills the air.";
map[8] = "The shallow river flows north.";

// set start location:
var mapLocation = 0;

// setup the images array
const locationImages = [];

locationImages[0] = "images/MagicalGatewayCave.jpg";
locationImages[1] = "images/iceCave.jpeg";
locationImages[2] = "images/Amethyst.jpg";
locationImages[3] = "images/JellyMonsterCaveCropped.jpg";
locationImages[4] = "images/mazeCave.jpg";
locationImages[5] = "images/SkullWaterCaveMod.jpg";
locationImages[6] = "images/LavaCave.jpeg";
locationImages[7] = "images/WaterfallCave.jpg";
locationImages[8] = "images/caveRiver.jpg";



// Other Images:  TheDark, Exit and monsters
const TheDark = "images/TheDark.png";
const TheExit = "images/WaterfallExit.jpg";
const MonsterInDark = "images/MonsterInTheDark.jpg";
const SeaMonster = "images/SeaMonster.jpg";

// set boundary - blocked ways messages
// multi dim array for different error messages from a location depending on direction attempted. 
// first index is map location, second is attempted direction:  0 = N, 1 = east, 2 = south, 3 = west
var blockedPathMessages = [[], [], [], [], [], [], [], [], []]; //  9 multi dim array for different error messages from a location depending on direction attempted. 
                                

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
var itemsInWorld = [];

// note: location index == item index.  value == map index
var itemLocations = [];

// backpack!
var backpack = [];

// players input string
var playersInput = "";

// game message for what's going on
var gameMessage = "";

// game action array and current action:
var actionsIKnow = ["north", "east", "south", "west", "up", "down", "search", "take", "use", "drop", "open", "close"];
var action = "";

// another item array to hold all the items the game understands
// initially this is the same as the itemsInWorld.
var itemsIKnow = ["salt", "rope", "grappling hook", "plate armor", "sword", "lantern", "pick axe", "glowing gem", "item8", "item9"];
var currentItem = "";  // the current item being actioned


// FLAGS for items and monsters
var bLanternInUse = false;  // lamp must be on to be able to see anything...
var bJellyMonsterAlive = true;  // must kill to get grappling hook
var bMonsterInDarkAlive = true; // must kill to get pick axe.


/* *********************************************************************
 *  html page items
 *  ********************************************************************* */

// the image element for the display of the image on the page:
var screenImage = document.getElementById("screenImage");

// the input and output fields too.
var input = document.querySelector("#input");
var output = document.querySelector("#output");

// set up the play, save, load  and newGame buttons
var playButton = document.getElementById("playGame");
playButton.style.cursor = "pointer";
playButton.addEventListener("click", playGame, false);

var saveButton = document.getElementById("saveGame");
saveButton.style.cursor = "pointer";
saveButton.addEventListener("click", saveGame, false);

var loadButton = document.getElementById("loadGame");
loadButton.style.cursor = "pointer";
loadButton.addEventListener("click", loadGame, false);

var newGameButton = document.getElementById("newGame");
newGameButton.style.cursor = "pointer";
newGameButton.addEventListener("click", newGame, false);

/* ****************************************************************************************
 * *************************  Functions Section *******************************************
 * **************************************************************************************** */


// GLOBAL ACTIONS:
//-----------------------------------------------------
window.addEventListener("load", init);  // force call to init function on load of page



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
    bMonsterInDarkAlive = true; // must kill to get pick axe.

    // set start location:
    mapLocation = 7;

    // create an array for the items that are in the world at the start and set their locations
    // note: this itemsInWorld array will shrink as the player takes the items or grow as they drop the items.
    itemsInWorld = ["salt", "rope", "grappling hook", "plate armor", "sword", "pick axe", "glowing gem"];

    // note: location index == item index.  value == map index
    itemLocations = [6, 0, 3, 8, 4, 1, 2];

    // backpack!
    backpack = ["lantern"];

    playersInput = "";
    gameMessage = "";

    input.innerHTML = "";
    input.value = "";
    output.innerHTML = "";
    output.value = "";


    // now that everything is set, display everything.
    renderGame();

} // end function init


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

    // get player input and convert to lower case since 
    // that's how we have everything in our arrays
    playersInput = input.value;
    playersInput = playersInput.toLowerCase();

    // put out log of what we think player typed.
    console.log("players input is: " + playersInput + ".");

    // figure out the players action selection
    var i = 0;
    var loopEnd = actionsIKnow.length;

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
                            mapLocation -= 3;
                        }
                        break;

                    default:
                        mapLocation -= 3;
                }
            }// end if location >= 3
            else{  // northmost locations
                gameMessage = blockedPathMessages[mapLocation][0];
            }
            break;


        case "east":
            if (mapLocation % 3 != 2) {  // if not eastmost locations..
                switch (mapLocation) {
                    case 3:  // jelly monster
                        if (bJellyMonsterAlive) {
                            gameMessage = blockedPathMessages[3][1]; // jelly monster.
                        }
                        else {
                            mapLocation += 1;
                        }
                        break;

                    case 7: // cliff - need rope and grappling hook.
                        if ((backpack.indexOf("rope") === -1) || (backpack.indexOf("grappling hook") === -1) ) // no rope w grappling hook
                        {
                            gameMessage = blockedPathMessages[7][1];
                        }
                        else {
                            gameMessage = "You used the rope and grappling hook to repell down the cliff.";
                            mapLocation += 1;
                        } // end else have rope and grappling hook
                        break;

                    default:
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
                            mapLocation += 3;
                        }
                        break;

                    default: 
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
                            mapLocation -= 1;
                        }
                        break;

                    case 8:  // cliff
                        if ((backpack.indexOf("rope") === -1) || (backpack.indexOf("grappling hook") === -1)) // no rope w grappling hook
                        {
                            gameMessage = blockedPathMessages[8][3]; // cliff
                        }
                        else {
                            mapLocation -= 1;
                        }
                        break;

                    default:
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

        // added other cases in action array here to fall through to default untill I figure out if I want them or not:
        case "search":
        case "open":
        case "close":
        case "up":
        case "down":
        default:
            gameMessage = "Sorry, I don't understand that.";
            break;

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

    var itemIndex = itemsInWorld.indexOf(currentItem);

    // output item and itemindex we are working with for debug.
    console.log("currentItem: " + currentItem + " itemIndex: " + itemIndex);

    if (itemIndex != -1 &&
        itemLocations[itemIndex] == mapLocation) {

        // ok, remove from world:
        itemsInWorld.splice(itemIndex, 1);
        itemLocations.splice(itemIndex, 1);

        // put in pack and display message to player
        backpack.push(currentItem);
        gameMessage = "You take the " + currentItem + ".";

        // add notes to console.log for debug
        console.log("Player took " + currentItem + " from " + mapLocation);
        console.log("Player's backpack now holds: " + backpack);
        console.log("Items in World are now: " + itemsInWorld);
        console.log("Item locations in world are now: " + itemLocations);
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

        var itemIndex = -1;  // init index
        itemIndex = backpack.indexOf(currentItem);

        if (itemIndex != -1) {

            // ok it exists in backpack.  Remove from pack, add to world.
            backpack.splice(itemIndex, 1);
            itemsInWorld.push(currentItem);
            itemLocations.push(mapLocation);

            // tell player they dropped it.
            gameMessage = "You dropped the " + currentItem + ".";

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

    var bItemUsedUp = false;  // bool for if item is destroyed.
    var bItemPlaced = false;  // bool for if item is placed in world by using.

    if (backpack.length != 0) {

        var itemIndex = -1;  // init index
        itemIndex = backpack.indexOf(currentItem);

        if (itemIndex != -1) {

            // ok it exists in backpack.  Figure out if it can be used and how.
            switch (currentItem) {

                case "salt":  // item can be used anywhere...
                    gameMessage = "using " + currentItem + ".";
                    break;


                case "rope":
                    if (mapLocation === 3) {
                        gameMessage = "Successfully solved location 3 using " + currentItem + ".";
                    }
                    else {
                        gameMessage = "just tried to use " + currentItem + " to no avail at location " + mapLocation + ".";
                    }
                    break;


                case "grappling hook":
                    if (mapLocation === 5) {
                        gameMessage = "Successfully solved location 5 using " + currentItem + ".  Item is used up.";
                        bItemUsedUp = true;
                    }
                    else {
                        gameMessage = "just tried to use " + currentItem + " to no avail at location " + mapLocation + ".";
                    }
                    break;


                case "plate armor":
                    if (mapLocation === 8) {
                        gameMessage = "Successfully solved location 8 using " + currentItem + ".  Item is placed in world.";
                        bItemPlaced = true;
                    }
                    else {
                        gameMessage = "just tried to use " + currentItem + " to no avail at location " + mapLocation + ".";
                    }
                    break;


                case "sword":
                    gameMessage = "using " + currentItem + ".";
                    break;


                case "lantern":
                    gameMessage = "You Light your " + currentItem + ".";
                    bLanternInUse = true;  // set flag to show lantern is being used.
                    console.log("lantern being used");
                    break;


                case "pick axe":
                    gameMessage = "using " + currentItem + ".";
                    break;


                case "glowing gem":
                    gameMessage = "using " + currentItem + ".";
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

    // IF the lantern is not on,  and not in a location with a light source, then player only sees the black!
    if (!bLanternInUse && mapLocation != 6 && mapLocation != 2 && mapLocation != 0) {
        screenImage.src = TheDark;
        gameMessage = "It is pitch black.  You can't see anything.";
        console.log("in dark if.  screenImage.src is: " + screenImage.src);
    }
    else // lantern is on
    {
        // You can see!  show image and discription
        screenImage.src = locationImages[mapLocation];
        output.innerHTML = map[mapLocation];


        var i = 0;
        //show items if they are there at this location
        for (i = 0; i < itemsInWorld.length; i++) {
            if (mapLocation === itemLocations[i]) {
                // display item
                output.innerHTML += "<br> You see a <strong>" + itemsInWorld[i] + "</strong> here.";
            }
        }// end for i
    }// end else lantern IS on

    // display game message 
    output.innerHTML += "<br> <em> " + gameMessage + " </em> ";


    // finally show players backpack contents:
    if (backpack.length != 0) {
        output.innerHTML += "<br> You are carrying: " + backpack.join(",");
    }

    console.log("at end of render.   screenImage.src is: " + screenImage.src);
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
    var gameStateObject = {
        mapLocation: mapLocation,    // location
        itemsInWorld: itemsInWorld,   // items in the world
        itemLocations: itemLocations,  // location of the items in the world
        backpack: backpack  // whats in the backpack 
    }

    // stringify it all then save in local storage
    var dataString = JSON.stringify(gameStateObject);

    // now save to local storage
    localStorage.setItem("GoblinKingGameData", dataString);

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
    var gameStateObject = null;

    var tempString = "";
    // get state object from local storage
    tempString = localStorage.getItem("GoblinKingGameData");

    console.log("Loaded gamedata: " + tempString);

    gameStateObject = JSON.parse(tempString);
    console.log("Gamestate Object after parse: " + gameStateObject);

    // now get data from state object
    mapLocation = gameStateObject.mapLocation;
    console.log("mapLocation: " + gameStateObject.mapLocation);

    itemsInWorld = gameStateObject.itemsInWorld;
    console.log("itemsInWorld: " + gameStateObject.itemsInWorld);

    itemLocations = gameStateObject.itemLocations;
    console.log("itemLocations: " + gameStateObject.itemLocations);

    backpack = gameStateObject.backpack;
    console.log("backpack: " + gameStateObject.backpack);

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

    // just call init
    init();

}// end loadGame

