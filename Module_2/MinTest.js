// JavaScript source code

var min = require('./MinFunction.js');

console.log(min(5, 100));

var error = min(5, "oops");
    console.log(min(5, "oops"));
var NotNumError = isNaN(error);
if (NotNumError) // return from messed up min call
{
    console.log("bad min call resulted in NAN return value");
}
else
{
    console.log("ug, null is interpreted as a number!");
}

console.log(min(-1.334, -0.5));


