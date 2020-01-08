////////////////////////////
// LECTURE: let and const

/*

// In ES5 this is done like so:
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// In ES6 we can use const for variable we want to be immutable, and we use let to replace the
// old var from ES5.
const name6 = 'Jane Smith';
let age6 = 23;
// name6 = 'Jane Miller'  // will throw TypeError
console.log(name6 + ' is ' + age6 + ' years old.')



// THE DIFFERENCE: let and const are block-scoped, while var was function-scoped. A "block" is
// everything inside curly braces, but in case of a for-loop it also include the loop
// variable declaration in normal parentheses.
// AND: using a variable before it is declared now throws an error (as opposed to just stating on
// the console that it is not defined as in ES5). Variables are still hoisted, but I"m not sure
// what the functional differences would be if they weren't...

function driversLicense(passedTest) {

  let firstName;
  const yearOfBirth = 1990;

  if (passedTest) {
    firstName = 'John';
    //yearOfBirth = 1990; // if we defined a const here, we can't use it in the console.log
    // statement due to block-scoping
  }
  console.log(firstName + ', born in ' + yearOfBirth + ', is now permitted to drive a car.');
}

driversLicense(true);

// block-scoping demo:

//i = 23;
for (j = 0; j < 5; j++) {
  //console.log(i);
}
console.log(j);



console.log('outside of IIFE: ' + name);  // neither throws an error nor does it print
{
  let name = 'john';

  console.log(name);

  {
    console.log('nested IIFE: ' + name);
  }
}

// Template literals: (i.e,. string interpolation)
let firstName = 'John';
console.log(`${firstName} `.repeat(5));



//////////////////////////////////////
// LECTURE: Arrow functions

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
  return 2016 - el;
});

console.log(ages5);

// ES6
let ages6 = years.map(el => 2016 - el);  // same thing as above!!
console.log(ages6);
// const comp = (ages5 === ages6);  // doesn't evaluate to true!
// console.assert(ages5.sort() === ages6.sort(), {ages5, ages6});  // doesn't work in JS

// So far the best way to test two arrays for equivalence:
console.log(JSON.stringify(ages5)==JSON.stringify(ages6));

// Using arrow function with two arguments.

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
  const now = new 
  Date().getFullYear();
  const age = now - el;
  return `Age element ${index + 1}: ${age}.`
});

console.log(ages6);



///////////////////////////////////////////////
// LECTURE: Arrow functions part 2

// ES5
// This shows a necessary hack due to the fact that in ES5 the this keyword inside of a function,
// which is part of an object (as is the case below) points to the global object, but not to the
// the object it is called from (which would be box5 in this case). To make it point to the box5
// object we use the hack and define self as this while "this" still points to box5.
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    var self = this;  // this is a hack so we have access to this inside of the function in the
    // next line.
    document.querySelector('.green').addEventListener('click', function() {
      var str = 'This is box number ' + self.position + ' and it is ' + self.color + '.';
      alert(str);
    });
  }
}
box5.clickMe();



// ES6: the this keyword in the arrow function points to box6, and not (as in ES5) to the global
// object, the window object. So here we don't need to catch this before we enter the function.
const box6 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener('click', () => {
      var str = 'This is box number ' + this.position + ' and it is ' + this.color + '.';
      alert(str);
    });
  }
}
box6.clickMe();
*/

/*
// Using constructor, and use bind to make this point to the object it is called in, even in
// nested functions.

function Person(name) {
  this.name = name;
};

*/

/*
// ES5
Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(el) {
    return this.name + ' is friends with ' + el;
  }.bind(this));

  console.log(arr);
};

var friends = ['John', 'Mary', 'Bob'];

person = new Person('Mike');

person.myFriends5(friends);

function Person(name) {
  this.name = name;
};

*/

/*
// ES6
Person.prototype.myFriends6 = function(friends) {
  var arr = friends.map(el => `${this.name} is friends with ${el}`);

  console.log(arr);
};

var friends = ['John', 'Mary', 'Bob'];

person = new Person('Mike');

person.myFriends6(friends);

/*

//////////////////////////////////////////////
// LECTURE: Destructuring

// ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

*/

/*
// ES 6
const [name, age] = ['John', 26];
console.log(name);
console.log(age);

const obj = {
  firstName: 'John',
  lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

// This works, too:
const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);


function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2);
console.log(retirement);

*/

/*
///////////////////////////////////////////////////////////////
// LECTURE: Arrays

const boxes = document.querySelectorAll('.box');
console.log(typeof boxes);

var x = 5;
console.log(typeof x);


// ES5:
// The following selects all boxes and colors them blue.
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
  cur.style.backgroundColor = 'dodgerblue';
});


// ES 6:
// Same functionality, but less lines of code...
const boxesArr6 = Array.from(boxes);  // turns nodeList into an array
boxesArr6.forEach(cur => cur.style.backgroundColor = 'red');

///////////////////////////////////////////////////
// Using "break" or "continue" in a loop. Can't do that in forEach or map, need to use
// plain old for-loop:

/*
// ES5:
for (var i = 0; i < boxesArr5.length; i++) {
  // Get text describing color:
  if (boxesArr6[i].className === 'box blue') {
    continue;
  }
  
  boxesArr5[i].textContent = 'I changed to blue!';
}


// ES6:
// Using the forOf loop instead of plain-old for-loop.
for (const cur of boxesArr6) {
  if (cur.className.includes('blue')) {
    continue;
  }
  cur.textContent = 'I changed to blue, yes!';
}

*/

/*
////////////////////////////////////
// find and findIndex in ES6.

// ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(cur, index) {
  return cur > 18;
});
console.log(full);

// Find index of element that has full age:
var idx = full.indexOf(true);
console.log(idx);
console.log(ages[idx]);

// ES6: less code
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));

*/

/*
///////////////////////////////////////////
// LECTURE: Spread operator

function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5:
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6: using the Spread operator
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

// Use it in node lists:
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
Array.from(all).forEach(cur => cur.style.color = 'purple');  // turn lettering color to purple

*/

//////////////////////////////////////
// LECTURE: Rest operator

/*

// ES5
function isFullAge5() {
  console.log(arguments);
  var argsArr = Array.prototype.slice.call(arguments);

  argsArr.forEach(function(cur) {
    console.log((2016 - cur) >= 18);
  })
}

// isFullAge5(1990, 1999, 1965);

// ES6
function isFullAge6(...years) {
  years.forEach(cur => console.log(
    (2016 - cur) >= 18)
  );
}

isFullAge6(1990, 1999, 1965);

*/

/*
// ES5
function isFullAge5(limit) {
  console.log(arguments);
  var argsArr = Array.prototype.slice.call(arguments, 1);
  console.log(argsArr);

  argsArr.forEach(function(cur) {
    console.log((2016 - cur) >= limit);
  })
}

// isFullAge5(21, 1990, 1999, 1965);

// ES6
function isFullAge6(limit, ...years) {
  years.forEach(cur => console.log(
    (2016 - cur) >= limit)
  );
}

isFullAge6(1990, 1999, 1965);

*/

//////////////////////////////////////////////////
// LECTURE: Default parameters

/* 
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

  lastName === undefined ? lastName = 'Smith' : lastName;
  nationality === undefined ? nationality = 'American' : nationality;
  this.firstName = firstName,
  this.yearOfBirth = yearOfBirth,
  this.lastName = lastName,
  this.nationality = nationality
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'spanish'); 

*/

// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {

  this.firstName = firstName,
  this.yearOfBirth = yearOfBirth,
  this.lastName = lastName,
  this.nationality = nationality
}

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');

/////////////////////////////////////////////////////////
// LECTURE: Maps

const question = new Map();
question.set('question', 'What is the official name of the latest JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'Wrong, please try again.');

console.log(question.get('question'));
// console.log(question.size);

/* if (question.has(4)) {
  question.delete(4);
  console.log('Answer 4 is gone');
} */

/* question.forEach((value, key) => {
  console.log(`This is ${key}, and it's set to ${value}.`);
}) */

for (let [key, value] of question.entries()) {
  if (typeof(key) === 'number') {
    console.log(`Answer ${key}: ${value}.`);
  }
}

const ans = parseInt(prompt('Write the correct answer.'));
console.log(question.get(ans === question.get('correct')));






