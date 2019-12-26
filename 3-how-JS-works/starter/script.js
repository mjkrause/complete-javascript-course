///////////////////////////////////////
/* Lecture: Hoisting

// FUNCTION DECLARATION
// Here we call a function before it is actually declared in the script. Running this will
// print the correct output in the console because function declaration are hoisted, i.e., the 
// function declaration is stored in the variable object, and therefore is available in the 
// global execution context.
calcAge(1984);

function calcAge(year) {
    console.log(2020 - year);
}

// CALLING A FUNCTION EXPRESSION
// Will NOT work:
// retirement(1964);  
// this is not using a function declaration but a function expression!
// NOTE: hoisting only works with function declarations, but not with function expressions.

var retirement = function(year) {
    console.log(67-(2019 - year));
}

// Will work:
retirement(1967);  // ...because the function expression occurred prior to the call of the
// expression.

// VARIABLE DECLARATION
console.log(age);  // will report undefined
var age = 30;
console.log(age);
foo();  // this works because the age variable is defined inside a function, which means that 
// it is hoisted.
function foo() {
    var age = 85;
    console.log(age);
}
*/

///////////////////////////////////////
// Lecture: Scoping

// First scoping example
/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        //console.log(a + b + c);
        third();
    }
}

// The third function is in a different scope from the first and second function, therefore has
// access to the variable c (and attempts to print it will throw an error during execution).
function third() {
    var d = 'John';
    // console.log(c);
    console.log(a + ' ' + d);
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

// console.log(this);

/*
calcAge(1985);
function calcAge(year) {
    console.log(2020 - year);
    console.log(this);
}
*/

var john = {
    name: 'John',
    DOB: 1998,
    calcAge: function() {
        console.log(this);
        console.log(2020 - this.DOB);

        /*
        // The this keyword inside this function declaration does NOT point to the john object,
        // but instead to the global execution context. It is written inside of a regular
        // function it is not part of a method. Therefore, the this keyword will point to the 
        // Window object.
        function innerFunction() {
            console.log(this);
        }
        innerFunction();
        */
    }
}

john.calcAge();

var mike = {
    name: 'Mike',
    DOB: 1984
};

// Method borrowing.
mike.calcAge = john.calcAge;
mike.calcAge();

// Take-away: The this keyword only assumes a value when the method in which it is contained
//            is called.

