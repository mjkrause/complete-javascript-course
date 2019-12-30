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

*/

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


