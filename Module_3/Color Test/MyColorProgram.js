// JavaScript source code
var showButton = document.querySelector("#show");
var clearButton = document.querySelector("#clear");

showButton.addEventListener("click", showColorHandler, false);
clearButton.addEventListener("click", clearColorHandler, false);


// show color button was clicked
function showColorHandler(e) {

    var r = 0;
    var g = 0;
    var b = 0;
    var redInput = 0;
    var greenInput = 0;
    var blueInput = 0;

    redInput = document.querySelector("#RedColorText");
    r = parseInt(redInput.value);

    greenInput = document.querySelector("#GreenColorText");
    g = parseInt(greenInput.value);

    blueInput = document.querySelector("#BlueColorText");
    b = parseInt(blueInput.value);



    // validate the input values
    if (validate(r) && validate(g) && validate(b)) {
        // ok to change the color
        colorBar.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";

        //set the hex value:
        var colorHex = fullColorHex(r, g, b);
        document.getElementById("HexValue").innerHTML = colorHex;
    }
    else {
        alert("You must enter a number from 0 to 255 for each color!");
        clear();
    }

}// end show color handler


function validate(n) {
    if (n < 0 || n > 255 || isNaN(n)) {
        // bad input
        return false;
    }
    else {
        return true;
    }
}// end validate

function clearColorHandler(e) {
    clear();
}


function clear() {
    // clear colorbar and set input text values to 000
    colorBar.style.backgroundColor = "OldLace";

    // set color input boxes to 000
    document.getElementById("RedColorText").value = "xxx";
    document.getElementById("GreenColorText").value = "xxx";
    document.getElementById("BlueColorText").value = "xxx";

    // set hex value to xxxxxx
    document.getElementById("HexValue").innerHTML = "xxxxxx";
}


// convert single  rgb (0 to 255) value to hex
function rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

// convert a full set of rgb to hex
function fullColorHex(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
}
