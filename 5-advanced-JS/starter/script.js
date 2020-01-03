/* // Function constructor.

var john = {
  name: 'John',
  yearOfBirth: 1990,
  job: 'teacher'
};

console.log(john);

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  this.calculateAge = function () {
    console.log(2019 - this.yearOfBirth);
  }
};

var john = new Person('John', 1990, 'teacher');

console.log(john);

john.calculateAge();

console.log(john);

var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

jane.calculateAge();
mark.calculateAge();

// Add another property to the prototype to the function constructor.
Person.prototype.lastName = 'Smith';

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);



// Object.create

var personProto = {
  calculateAge: function () {
    console.log(2019 - this.yearOfBirth);
  }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

// Add properties right during the object-create process, so that we don't need to add 
// later.
var jane = Object.create(personProto, 
  {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1969},
    job: {value: 'designer'}
  });



// Primitives hold the value their were originally assigned.
var a = 23;
var b = a;
a = 46;

console.log(a);
console.log(b);

// Objects hold references to locations in memory. If we change a value in object 1, it will be
// changed in object 2 as well.
var obj1 = {
  name: 'John',
  age: 26
};

var obj2 = obj1;
obj1.age = 30;

console.log(obj1.age);
console.log(obj2.age);

// Functions:
var age = 27;
var obj = {
  name: 'Jonas',
  city: 'Lisbon'
};


// Passing functions as arguments

var years = [1990, 1965, 1937, 2005, 1998];

// Suppose we want to loop over the values of years, and do something with each value. This
// could be done in one large function or, alternatively, we could have one outer function
// that governs the iteration over elements, and another function which does the calculation on
// an element. JS prefers maximum modularity, so we use the alternative.

// Here we pass in function fn as argument. This seems to be a special JS thing. Normally (i.e., 
// in other languages such as Python or Java), function fn should be visible to arrayCalc if it
// is in the namespace of the script. But in JS it seems it is preferred to explicitly pass a
// function to another function, perhaps to narrow down the scope? 
function arrayCalc(arr, fn) {
  var arrRes = [];

  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

// Write callback (cb) functions. Ideally, a cb only does one task, such has here: it only performs
// a subtraction operation.
function calcAge(el) {
  return 2016 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - (0.67 * el));
  } else {
    return -1;
  }
}

// NOTE: when we pass a cb, we don't want it to be called inside the argument. That's why we only
// write the name of the function, without the "()" syntax. We want to call the function in the
// body of arrayCalc instead.
var ages = arrayCalc(years, calcAge);
console.log(ages);

var fullAges = arrayCalc(ages, isFullAge);
console.log(fullAges);

var rates = arrayCalc(ages, maxHeartRate);
console.log(rates);



// Functions returning functions.

// In the following function we're using a couple of anonymous functions that the function
// returns.
function interviewQuestion(job) {
  if (job === 'designer') {
    return function (name) {
      console.log(name + ', explain what UX design is.');
    }
  } else if (job === 'teacher') {
    return function (name) {
      console.log('What subject do you teach ' + name + '?');
    }
  } else {
    return function (name) {
      console.log('Hello ' + name + ', what do you do?');
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
teacherQuestion('John');
designerQuestion('Jane');
var unknownJob = interviewQuestion('carpenter');
unknownJob('Mark');

*/


//////////////////////////////////////
// Lecture: IIFE (pronounce iffy), or Immediately Invoked Function Expressions

// IIFE is a very common pattern in JS. 

// Creating data privacy
// For example if we wanted to create a private function. In the following function game the 
// variable "score" cannot be accessed in the global execution context because it is defined 
// inside a function. Thus, score is a private variable.

/*
function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}
game();


// But instead of writing an explicit function, we could do it simply by using an IIFE:
(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

//console.log(score);

// IIFEs can take input arguments:
(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);

// IIFEs cannot be reused, of course. But if the goal is merely to achieve data privace, IIFEe
// are a good solution.



//////////////////////////////////////
// LECTURE: CLOSURES

function retirement(retirementAge) {
  var msg = ' years left until retirement.';
  return function(yearOfBirth) {
    var age = 2020 - yearOfBirth;
    console.log((retirementAge - age) + msg);
  }
}

var retirementUS = retirement(66);
// retirementUS(1990);

// The above executes. Function retirement returns a function, which has an input (the age),
// and also defined a new message variable (msg), then returns a function. That returned function
// excepts an argument (the DOB), which then outputs data from the original function "retirement",
// which has already been popped off the execution stack at that point, but its data such as
// the variable msg are still available. That observation is referred to as "closure".

// retirement(70)(1967);

var retirementGermany = retirement(65);
var retirementFrance = retirement(59);

retirementUS(1967);
retirementFrance(1967);
retirementGermany(1967);


// CHALLENGE: re-write the job interview questions function by using closures.

function interviewQuestion(job) {
  return function(name) {
    if (job === 'designer') {
      return console.log(name + ', explain what UX design is.');
    } else if (job === 'teacher') {
      return console.log('What subject do you teach, ' + name + '?');
    } else {
      return console.log('Hello ' + name + ', what do you do?');
    }
  }
}

var designer = interviewQuestion('designer')('Joe');
var teacher = interviewQuestion('teacher')('Mike');
var unknown = interviewQuestion('')('Jane');


/////////////////////////////////////////////
// LECTURE: BIND, CALL, and APPLY

var john = {
  name: 'John',
  age: 26,
  job: 'teacher',
  presentation: function(style, timeOfDay) {
    if (style === 'formal') {
      console.log('Good ' + timeOfDay + ' ladies and gentlemen! I\'m ' 
      + this.name + ' and I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
    } else if (style === 'friendly') {
      console.log('Hey what\'s up? I\'m ' + this.name + ' and I\'m a ' + this.job 
      + ' and I\'m ' + this.age + ' years old. Have a nice day!');
    }
  }
}

var emily = {
  name: 'Emily',
  age: 35,
  job: 'designer'
};

john.presentation('formal', 'morning');

// CALL method
john.presentation.call(emily, 'friendly', 'afternoon');

// APPLY method (commented out as it requires the arguments as an array, which the john func
// can't handle at the moment, but in principle...)
// john.presentation.apply(emily, ['friendly', 'afternoon']);

// BIND method: allows us to set some pre-set parameters. Here we preset the style parameter.
var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('afternoon');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('evening');


// Here's an example of how we can use the bind method in a context.
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];

  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calcAge(el) {
  return 2016 - el;
}

// We changed this function such that it requires two input arguments (i.e., to contrive a
// problem). But if we want to use it as input to arrayCalc it will throw and error as the
// function called in the push argument only can have ONE argument. One solution to that problem
// is to use the bind method, where we can preset one of the two argument beforehand, so that 
// after that isFullAge will can now be passed into arrayCalc ALTHOUGH is formally requires
// two arguments!
function isFullAge(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calcAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);

*/


////////////////////////////////////////
// CODING CHALLENGE

/* THIS IS MY FIRST IMPLEMENTATION. IT WORKS, BUT IT CAN BE IMPLEMENTED 
// USING MORE OOP FEATURES...

// Create constructor.
var Question = function(question, answers, correctAnswer) {
  this.question = question;
  this.answers = answers;
  this.correctAnswer = correctAnswer;
}

// Create instances of questions.
progLang = new Question(
  'Is JavaScript the coolest programming language in the world?',
  ['Yes', 'No'],
  0
);

courseTeacher = new Question(
  'What\'s the name of the teacher of this course?',
  ['John', 'Michael', 'Jonas'],
  2
);

natureOfCoding = new Question(
  'What best describes coding?',
  ['boring', 'hard', 'fun', 'tedious'],
  2
);

var questions = [progLang, courseTeacher, natureOfCoding];

function selectQuestion(questions) {
  // question is an array, and we use index into it using a random number.
  return questions[Math.floor(Math.random() * questions.length)];
  // console.log(selectedQuestion);
}

function printAnswers(arr) {
  for (var i = 0; i < arr.length; i++) {
    console.log(i + ': ' + arr[i]);
  };
}

function processUserAnswer(userAnswer, correctAnswer, score) {
  if (userAnswer === correctAnswer) {
    console.log('Correct answer!');
    score += 1;
    console.log('User score increasd to: ' + score);
  } else if (userAnswer !== correctAnswer) {
    console.log('Nope, incorrect');
    console.log('User score is unchanged: ' + score);
  }
  return score;
}

function game(questions) {

  var question, stillGame, userAnswer;
  var newScore;
  oldScore = 0;


  while (true) {

    // Select and pose question:
    question = selectQuestion(questions);
    console.log(question.question);

    printAnswers(question.answers);

    // Get answer.
    stillGame = prompt('Enter exit to end game.');
    if (stillGame === 'exit') {
      console.log('Exiting game - bye...')
      break;
    } else if (stillGame >= question.answers.length) {
      console.log('Answer out of range - only use suggested range of integers.')
      console.log('User score unchanged: ' + oldScore);
      continue;
    } else {
      userAnswer = question.answers[stillGame];

      // Process answer by judging whether it is correct or not:
      newScore = processUserAnswer(
        userAnswer,
        question.answers[question.correctAnswer],
        oldScore);

      oldScore = newScore;

    }

  }
}

// Play the game.
game(questions);

// END OF FIRST IMPLEMENTATION
*/

// SECOND IMPLEMENTATION, IN WHICH I USE MORE OOP PRINCIPLES.

// We first start out by wrapping the entire code in an IIFE, so that we create a 
// containerized scope for this quiz game (and so it can be imported into anyone else's
// code).

(function () {

  // Create constructor (i.e., JS parlance for "class") with three parameters.
  function Question (question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  // Now we add methods to the Question prototype, such that all instances of
  // class Question cann access those methods by means of the prototype chain.
  Question.prototype.displayQuestion = function() {
    
    console.log(this.question);
    // Loop over each item in a the instance answers (which is an array).
    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + ': ' + this.answers[i]);
    }
  }

  // Add instance methods to the class (prototype) to take advantage of OOP. The callback
  // function in this case is keepScore, which is difficult to infer from this function here
  // (unless you know it, how would someone new to the code know where that callback is defined?)
  Question.prototype.checkAnswer = function(ans, callback) {
    var sc;  // score
    if (ans === this.correctAnswer) {
      console.log('Correct answer!');
      sc = callback(true);
    } else {
      console.log('Wrong answer - try again :)');
      sc = callback(false);
    }

    this.displayScore(sc);
  }

  Question.prototype.displayScore = function(score) {
    console.log('Your current score: ' + score);
    console.log('---------------------------------------------');
  }

  // Create instances of Questions prototype:
  var progLang = new Question(
    'Is JavaScript the coolest programming language in the world?',
    ['Yes', 'No'],
    0
  );

  var courseTeacher = new Question(
    'What\'s the name of the teacher of this course?',
    ['John', 'Michael', 'Jonas'],
    2
  );

  var natureOfCoding = new Question(
    'What best describes coding?',
    ['boring', 'hard', 'fun', 'tedious'],
    2
  );

  // Create array of instances.
  var questions = [progLang, courseTeacher, natureOfCoding];


  // Use closure to keep a score.
  var keepScore = score();

  function score() {
    // Returns a callback function that accepts a boolean as input argument.
    var sc = 0;  // NOTE: only set to 0 at the beginning of the game
    return function(correct) {  // correct is boolean
      if (correct) {
        sc++;  // increments by 1
      }
      return sc;
    }
  }

  function nextQuestion() {
    // Get random number to select of the questions in the questions array.
    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();
    // Solicit user input by opening a window.
    var answer = prompt('Please select the correct answer. Type \'exit\' to end the game.');
    if (answer !== 'exit') {  // base case check
      questions[n].checkAnswer(parseInt(answer), keepScore);  // keepScore is a callback function
      nextQuestion();  // recurse
    }
  }

  nextQuestion();  // called only once, then it will be called recursively

})();  // this executes the function


