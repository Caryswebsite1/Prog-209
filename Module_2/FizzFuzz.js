'use strict';

console.log('Prog 209 Module 2 Fizz Fuzz Assignment');


function FizzFuzz() {
    for (var i = 1; i < 301; i++) {
        // if cleanly divisable by 5 print Fizz
        // else if cleanly divisable by 7 print Fuzz
        // else print number.

        if (i % 5 === 0) {
            console.log("Fizz");
        }
        else if (i % 7 === 0) {
            console.log("Fuzz");
        }
        else // not divisable cleanly by 5 or 7 so print i
        {
            console.log(i);
        }

    }// end for loop
} // end FizzFuzz

//window.
//global.
