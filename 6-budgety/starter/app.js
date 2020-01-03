/*
/////////////////////////////////////////////////
// The following serves the purpose of demonstrating an implementation of creating private
// and public functions using IIFEs and closures, and how to set up the basic architecture
// of the budget app, i.e., by creating modules that are maximally independent of each
// other and only expose data that are needed to run the app (i.e., everything else
// remains private).

// Create all three modules by using encapsulations. That means we employ a combination
// of IIFEs and closures to achieve this.

var budgetController = (function() {
  // The following two variables will be private (cannot be access from the console).
  var x = 23;
  var add = function(a) {
    return x + a;
  }
  
  // The only functionality (method) we want to expose from the budgetController are the
  // functions that follow here after the return statement. Those will all be public. This is
  // how data privacy is achieved in JS.
  return {
    publicTest: function(b) {
      return add(b);
    }
  }
}) ();


var UIController = (function() {
  // some code
}) ();


var controller = (function(budgetCtrl, UICtrl) {

  // We intentionally don't want to use the modules budgetController and UIController
  // right inside this controller (although technically we could have). But if we did that we
  // would introduce some level of dependency, e.g., we would need to change the name of the 
  // module inside here if we decided to rename those outside modules. If we do like shown below
  // all we needed to do that in case is to change the name of the module where we input it,
  // but we would not need to change the reference to it in the input argument of the 
  // controller function.

  var z = budgetCtrl.publicTest(5);

  return {
    anotherPublic: function() {
      return z;
    }
  }
}) (budgetController, UIController);

*/

// BUDGET CONTROLLER
var budgetController = (function() {
  
  var Expense = function(id, description, value) {
    this.id = id,
    this.description = description,
    this.value = value
  }

  var Income = function(id, description, value) {
    this.id = id,
    this.description = description,
    this.value = value
  }

  return {
    expense: function(id, descript, val) {
      return Expense(id, descript, val);
    }
  };
  

}) ();

// UI CONTROLLER
var UIController = (function() {
  
  // Compile all strings from the HTML in a central place to retrieve them, but also to make
  // it easy if something in the HTML will changed later on there will only be one place
  // (right here) where need to change it in the backend.
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
  }

  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,  // income (inc) or expense (exp)
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
}) ();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  // Set up all event listeners here:
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();
    // Set up the event listener for the input button.
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    // Add another listener in case user does not click the checkmark button, but instead hits
    // the return key (i.e., the enter key).
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    })
  }

  // Main logic:
  var ctrlAddItem = function() {
    // 1. Get the field input data
    var input = UICtrl.getinput();
    // 2. Add the item to the budget controller

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI

  }

  return {
    init: function() {
      console.log('Application has started.');
      setupEventListeners();
    }
  }


}) (budgetController, UIController);

controller.init();
