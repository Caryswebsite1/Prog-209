// Module 8 Exercise Jquery and js code:

// start with making sure we are loaded:
$(function () {
    // theoretically, this will not fire until everything is loaded.
    "use strict";

    // make a variable for the image and container:
    let $theTree = $('#Tree');
    let $theContainer = $('#mainContainer');

    let mySynch = false;  // set to true if animation is running...

    // first animation is just a fade out and fade back in.

    // second animation is slide back and forth then return to center.

    // third animation is bounce around the container. 

    // set up the button listeners then the handlers (which are the animations)
    $('#FadeOutIn').on('click', fadeOutIn);
    $('#SideToSide').on('click', sideToSide);
    $('#Crazy').on('click', goCrazy);


    //---------------------------------------------------------
    // fadeOutIn:  Takes the image and fades it out then back in. no easeing.
    // ----------------------------------------------------------
    function fadeOutIn() {

        console.log('in fade');

             // fading out while getting bigger...
            $theTree.animate({
                'opacity': 0,
                'width': 700,
                'height': 500,
                'top': 0,
                'left': 0,
                'marginTop': 0
            }, 2000);

            // reset to very small but still not shown.  
            // make sure to reset top and left to what they should be.
            $theTree.animate({
                'width': 1,
                'height': 1,
                'top' : 0,
                'left': 310,
                'marginTop': 200
            }, 10);

            // then fade in while getting back to original size.

            $theTree.animate({
                'opacity': 1,
                'width': 80,
                'height': 80
            }, 2000);

     }// end fadeOutIn


    //---------------------------------------------------------
    // sideToSide:  Takes the image and moves it to the right edge, 
    // back to the left edge, then back to center.
    // ----------------------------------------------------------
    function sideToSide() {

        console.log("in Side to Side");

        $theTree.animate({
            'left': 620
        }, 1000);

        // send to left edge
        $theTree.animate({
            'left': 0
        }, 2000);

        // then back to center:
        $theTree.animate({
            'left': 310
        }, 2000);


    }// end sideToSide



    //---------------------------------------------------------
    // goCrazy:  bounces the image around the container then
    // ----------------------------------------------------------
    function goCrazy() {

        let maxTop = 420;  // based on container height of 500..
        let maxLeft = 620; // based on container width of 700;

        let newTopRand = 0;  // random numbers to calculate next top and left from.
        let newLeftRand = 0;

        let newTop = 0;  // next top and left to go to.
        let newLeft = 0;

        // document based coords..
        let treeCoords = 0;
        let containerCoords = $theContainer.offset();
        let i = 0;

        console.log('container offset' + containerCoords.top + "  " + containerCoords.left);

        // we are going to do the following: 
        // move randomly in the container for 10 moves then
        // do a fadeOutIn from wherever we are.

 
        for (i = 0; i < 10; i++) {

            treeCoords = $theTree.offset();

            // get new top and left coords for image based on max numbers from 
            // the container's size. make sure to account for image size.
            newTopRand = myRandom(maxTop);
            newLeftRand = myRandom(maxLeft);

            // the new top rand + the container top => where we want the new image to move to...
            // the new left rand + the container left => where we want the new image to move to...
            // have to check image coords and subtract to get the distance to move.

            if (treeCoords.top > (newTopRand + containerCoords.top)) {
                newTop = treeCoords.top - (newTopRand + containerCoords.top);
            }
            else {
                newTop = (newTopRand + containerCoords.top) - treeCoords.top;
            }

            if (treeCoords.left > (newLeftRand + containerCoords.left)) {
                newLeft = treeCoords.left - (newLeftRand + containerCoords.left);
            }
            else {
                newLeft = (newLeftRand + containerCoords.left) - treeCoords.left;
            }


            $theTree.animate({
                'top' : newTop,
                'left': newLeft
            }, 250);

        }// end for i

        // call for fadeOutIn wherever we are.
        fadeOutIn();

    }// end goCrazy




    //-----------------------------------------------------
    // myRandom:  given a number, returns a random number
    // from 0 to that number.
    //------------------------------------------------------
    function myRandom(inNumber){

        let rnd = Math.floor(Math.random() * inNumber);
        return rnd;
    }// end myRandom


});  // end main function


