// JavaScript source code
// Modual 2 Part B

function min(arg1, arg2) {

    var NotNum1 = isNaN(arg1);
    var NotNum2 = isNaN(arg2);
    if (NotNum1 || NotNum2)
    {
        // argument(s) provided not numbers
        console.log("Error: Arguments given must both be numbers");
        return "Bad Input";
    }
    else if (arg1 >= arg2)
    {
        return arg2; // return the smaller
    }
    else // arg 1 must be smaller
    {
        return arg1;
    }
} // end function min

module.exports = min;  // export function

