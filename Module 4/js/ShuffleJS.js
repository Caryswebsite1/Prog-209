"use strict";

// JavaScript source code
/* **************************************************  
 * Shuffle:  Created by Cary K. Gibson          
 * Date: 1/31/2019
 * 
 * Creates an input array 6x6  (3 labels, 3 inputs ) x (3 labels, 3 inputs ), 
 * displays it on the page in form format.  On the shuffle button click, it takes
 * the user input, shuffles it then displays it in an output array area.
 * 
 * *****************************************************
 */



/******************************* NOTE TO RON ****************************************
 * use strict prevents things like using a variable or object before it is declared, 
 * deleting variables or functions, and doing other things that are generally considered
 * either outright errors or bad coding practices by most other programming languages.
 * Happily for me it doesn't realy change anything.  Frankly I was amaized at the stuff
 * it no longer allowed, simply because that stuff was allowed before!
 * ************************************************************************************ */


// GLOBAL ACTIONS:
//-----------------------------------------------------
window.addEventListener("load", init);

var G_shuffleButton = null;          // to hold the button object
var G_inputArray = [];               // holds global input array
var G_outputArray = [];              // holds global output array



//-----------------------------------------------------
// Init:  calls for initial display of input and output
//        sets up button event handler.
//-----------------------------------------------------
function init() {

    initArrays();

    displayAll();

    var G_shuffleButton = document.getElementById("playButton");
    G_shuffleButton.addEventListener("click", shuffleArray);

    // diagnostics:
    //document.getElementById("myError").innerHTML = "init: shufflebutton: " + G_shuffleButton;

} // end function init


//-----------------------------------------------------
// initArrays:  initializes input and output Array values
//-----------------------------------------------------
function initArrays() {

    var i = 0;
    for (i = 0; i < 9; i++) {
        G_inputArray[i] = "???";
        G_outputArray[i] = "???";
    }

    // diagnostics:
    //document.getElementById("myError").innerHTML = "in initArrays";
} // end initArrays


//-----------------------------------------------------
// displayAll:  just calls both display functions
//-----------------------------------------------------
function displayAll() {
    displayInput();
    displayOutput();
}

//-----------------------------------------------------
// displayInput:  clears the input fieldset
// then creates the label and input cells and
// adds them to the input fieldset.
//-----------------------------------------------------
function displayInput() {

    var i = 0;

    // using const for rows and columns because they should not be changed.
    const ROWS = 3;
    const COLUMNS = 3;  // not 6 because I'm considering label and input pair to be 1.       

    var inputFieldset = document.getElementById("ArrayInput");

    // first clear the input fieldset of cells
    if (inputFieldset.hasChildNodes()) {

        while (inputFieldset.hasChildNodes()) {
            inputFieldset.removeChild(inputFieldset.childNodes[0]);  // Get rid of first in line each time through loop
        }

    }// end if inputFieldset has children



    // now create new cells
    var topPad = 10;   // padding for placement since we are placing absolute, we need to take this into account
    var leftPad = 20;  // padding for placement since we are placing absolute, we need to take this into account

    var rows = 0;   // loop variable for rows
    var cols = 0;   // loop variable for columns

    for (rows = 0; rows < ROWS; rows++) {

        for (cols = 0; cols < COLUMNS; cols++) {

            // array index for this row and column combination
            // Used both for part of the lable text, id and for 
            // getting the actual current input value from the global input array
            var arrayIndex = (rows * COLUMNS) + cols;

            // create label tag
            var labCell = document.createElement("label");

            // set it's css class to "cell"
            labCell.setAttribute("class", "labelCell");

            // set its innerHTML. Note: setting value doesn't show up
            labCell.innerHTML = "Input" + arrayIndex;

            // add it to the input field set so it shows up on page
            inputFieldset.appendChild(labCell);




            //  **********************Now Do Input Tag**********************************

            // create input tag 
            var inCell = document.createElement("input");

            // set it's css class to "cell"
            inCell.setAttribute("class", "inputCell");

            // set it's type to "text"
            inCell.setAttribute("type", "text");

            // set max length to 20
            inCell.setAttribute("maxlength", "20");

            // set its id to "inputCell"
            inCell.setAttribute("id", "input" + arrayIndex);

            // set its value to the corrisponding input array value:
            inCell.value = G_inputArray[arrayIndex];

            // add it to the input field set so it shows up on page
            inputFieldset.appendChild(inCell);


            //  **********************now that we have both, we can position them:**********************************

            // Label:
            labCell.style.top = (rows * (labCell.offsetHeight + topPad)) + topPad + "px";
            labCell.style.left = (cols * (labCell.offsetWidth + inCell.offsetWidth + leftPad)) + leftPad + "px";

            // input:
            inCell.style.top = (rows * (labCell.offsetHeight + topPad)) + topPad + "px";
            inCell.style.left = (cols * (labCell.offsetWidth + inCell.offsetWidth + leftPad)) + labCell.offsetWidth + leftPad + "px";


        } // end cols

    }// end rows


}// end display input


//-----------------------------------------------------
// displayOutput:  Almost a duplicate of display Input but 
// creates label and output cells and adds them to the output fieldset
//-----------------------------------------------------
function displayOutput() {

    var i = 0;


    // using const for rows and columns because they should not be changed.
    const ROWS = 3;
    const COLUMNS = 3;  // not 6 because I'm considering label and input pair to be 1.       

    var outputFieldset = document.getElementById("outputContainer");  // get output field set 

    // first clear the input fieldset of cells
    if (outputFieldset.hasChildNodes()) {

        while (outputFieldset.hasChildNodes()) {
            outputFieldset.removeChild(outputFieldset.childNodes[0]);  // Get rid of first in line each time through loop
        }

    }// end if inputFieldset has children



    // now create new cells
    var topPad = 10;
    var leftPad = 20;

    var rows = 0;
    var cols = 0;

    for (rows = 0; rows < ROWS; rows++) {

        for (cols = 0; cols < COLUMNS; cols++) {

            // array index for this row and column combination
            // Used both for part of the lable text, id and for 
            // getting the actual current input value from the global input array
            var arrayIndex = (rows * COLUMNS) + cols;

            // create label tag
            var labCell = document.createElement("label");

            // set it's css class to "outLabelCell"
            labCell.setAttribute("class", "outLabelCell");

            // set its innerHTML:
            labCell.innerHTML = "Output" + arrayIndex;

            // add it to the output field set so it shows up on page
            outputFieldset.appendChild(labCell);




            //  **********************Now Do Output Tag**********************************

            // create output tag 
            var outCell = document.createElement("div");

            // set it's css class to "cell"
            outCell.setAttribute("class", "outputCell");

            // set its id to "output"
            outCell.setAttribute("id", "output" + arrayIndex);

            // set its value to the corrisponding output array value:
            outCell.innerHTML = G_outputArray[arrayIndex];

            // add it to the output field set so it shows up on page
            outputFieldset.appendChild(outCell);


            //  **********************now that we have both, we can position them:**********************************

            // Label:
            labCell.style.top = (rows * (labCell.offsetHeight + topPad)) + topPad + "px";
            labCell.style.left = (cols * (labCell.offsetWidth + outCell.offsetWidth + leftPad)) + leftPad + "px";

            // output:
            outCell.style.top = (rows * (labCell.offsetHeight + topPad)) + topPad + "px";
            outCell.style.left = (cols * (labCell.offsetWidth + outCell.offsetWidth + leftPad)) + labCell.offsetWidth + leftPad + "px";

        } // end cols

    }// end rows


}// end display output;


//-----------------------------------------------------
// shuffleArray:  gets the input values from the page,
// puts them into the output array variable then calls
// displayOutput
//-----------------------------------------------------
function shuffleArray() {

    var startArray = [];  // a temporary array with only this function scope to hold copy of input array

    var i = 0;
    var inValue = 0;


    // fill input array (for history and any possible displayInput calls) and our temp start array with input array values from page
    for (i = 0; i < 9; i++) {
        inValue = document.getElementById("input" + i).value;

        G_inputArray[i] = inValue;
        startArray[i] = inValue;

    }// end for

    // empty the outputarray
    while (G_outputArray.length > 0) {
        G_outputArray.splice(0, G_outputArray.length);         // clear old array
    }


    // now shuffle startArray and put values into output array

    while (startArray.length > 0) {
        let rnd = Math.floor(Math.random() * startArray.length);
        G_outputArray.push(startArray[rnd]);  // add new one to the output array
        startArray.splice(rnd, 1);         // remove it from temp start array
    }


    displayOutput();  // display results!

} // end shuffle array