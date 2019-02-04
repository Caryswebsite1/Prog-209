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

map[0] = "location 0";
map[1] = "location 1";
map[2] = "location 2";
map[3] = "location 3";
map[4] = "location 4";
map[5] = "location 5";
map[6] = "location 6";
map[7] = "location 7";
map[8] = "location 8";

// set start location:
var mapLocation = 0;

// setup the images array
var locationImages = [];

locationImages[0] = "anImage0";
locationImages[1] = "anImage1";
locationImages[2] = "anImage2";
locationImages[3] = "anImage3";
locationImages[4] = "anImage4";
locationImages[5] = "anImage5";
locationImages[6] = "anImage6";
locationImages[7] = "anImage7";
locationImages[8] = "anImage8";

// set boundary - blocked ways messages
var blockedPathMessages = [];

blockedPathMessages[0] = "some blocking msg 0";
blockedPathMessages[1] = "some blocking msg 1";
blockedPathMessages[2] = "some blocking msg 2";
blockedPathMessages[3] = "some blocking msg 3";
blockedPathMessages[4] = "some blocking msg 4";
blockedPathMessages[5] = "some blocking msg 5";
blockedPathMessages[6] = "some blocking msg 6";
blockedPathMessages[7] = "some blocking msg 7";
blockedPathMessages[8] = "some blocking msg 8";


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
var itemsIKnow = ["item0", "item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9"];
var currentItem = "";  // the current item being actioned



/* *********************************************************************
 *  html page items
 *  ********************************************************************* */

// the image element for the display of the image on the page:
var screenImage = document.querySelector("img");

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

    // set start location:
    mapLocation = 0;

    // create an array for the items that are in the world at the start and set their locations
    // note: this itemsInWorld array will shrink as the player takes the items or grow as they drop the items.
    itemsInWorld = ["item0", "item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9"];

    // note: location index == item index.  value == map index
    itemLocations = [0, 0, 1, 3, 8, 1, 6, 8, 4, 5];

    // backpack!
    backpack = [];

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
                mapLocation -= 3;
            }
            else {
                gameMessage = blockedPathMessages[mapLocation];
            }
            break;


        case "east":
            if (mapLocation % 3 != 2) {
                mapLocation += 1;
            }
            else {
                gameMessage = blockedPathMessages[mapLocation];
            }
            break;


        case "south":
            if (mapLocation < 6) {
                mapLocation += 3;
            }
            else {
                gameMessage = blockedPathMessages[mapLocation];
            }
            break;


        case "west":
            if (mapLocation % 3 != 0) {
                mapLocation -= 1;
            }
            else {
                gameMessage = blockedPathMessages[mapLocation];
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

    var bItemUsedUp = false;  // bool for if item is destroyed.
    var bItemPlaced = false;  // bool for if item is placed in world by using.

    if (backpack.length != 0) {

        var itemIndex = -1;  // init index
        itemIndex = backpack.indexOf(currentItem);

        if (itemIndex != -1) {

            // ok it exists in backpack.  Figure out if it can be used and how.
            switch (currentItem) {

                case "item0":  // item can be used anywhere...
                    gameMessage = "using " + currentItem + ".";
                    break;


                case "item1":
                    if (mapLocation === 3) {
                        gameMessage = "Successfully solved location 3 using " + currentItem + ".";
                    }
                    else {
                        gameMessage = "just tried to use " + currentItem + " to no avail at location " + mapLocation + ".";
                    }
                    break;


                case "item2":
                    if (mapLocation === 5) {
                        gameMessage = "Successfully solved location 5 using " + currentItem + ".  Item is used up.";
                        bItemUsedUp = true;
                    }
                    else {
                        gameMessage = "just tried to use " + currentItem + " to no avail at location " + mapLocation + ".";
                    }
                    break;


                case "item3":
                    if (mapLocation === 8) {
                        gameMessage = "Successfully solved location 8 using " + currentItem + ".  Item is placed in world.";
                        bItemPlaced = true;
                    }
                    else {
                        gameMessage = "just tried to use " + currentItem + " to no avail at location " + mapLocation + ".";
                    }
                    break;


                case "item4":
                    gameMessage = "using " + currentItem + ".";
                    break;


                case "item5":
                    gameMessage = "using " + currentItem + ".";
                    break;


                case "item6":
                    gameMessage = "using " + currentItem + ".";
                    break;


                case "item7":
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

    // show location image and id
    screenImage.src = "../images/" + locationImages[mapLocation];
    output.innerHTML = map[mapLocation];

    var i = 0;
    //show items if they are there at this location
    for (i = 0; i < itemsInWorld.length; i++) {
        if (mapLocation === itemLocations[i]) {
            // display item
            output.innerHTML += "<br> You see a <strong>" + itemsInWorld[i] + "</strong> here.";
        }
    }// end for i

    // display game message 
    output.innerHTML += "<br> <em> " + gameMessage + " </em> ";

    // finally show players backpack contents:
    if (backpack.length != 0) {
        output.innerHTML += "<br> You are carrying: " + backpack.join(",");
    }

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

