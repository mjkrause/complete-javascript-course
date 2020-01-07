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
// @ts-check
var budgetController = (function() {
  
  var Expense = function(id, description, value) {
    this.id = id,
    this.description = description,
    this.value = value,
    this.percentage =1
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    // We add this method to the constructor's prototype such that each instance we create
    // of this constructor will inherit the method. IOWs, the method is not specific to an
    // instance (in that case it should be part of the constructor!), but generic to all 
    // instances of that constructor.
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    // In the spirit of code modularity this function returns the percentage, but function
    // calcPercentage (above) computes percentages.
    return this.percentage;
  };

  var Income = function(id, description, value) {
    this.id = id,
    this.description = description,
    this.value = value
  };

  var calculateTotal = function(type) {
    var sum = 0;
    // This is generic for both income and expenses, and curEl is the current element. We can
    // use the value parameter of that element to retrieve its value for the summation.
    data.allItems[type].forEach(function(curEl, idx, arr) {
      sum += curEl.value;   // same as sum = sum + curEl.value;
    });

    data.totals[type] = sum;
  };

  // Choose an object of nested arrays as the most suitable data structure for all data 
  // within the budget controller.
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1  // does not exist when initiatiated
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // Use the last element in the array as the ID + 1 (unless the array contain no items, in
      // that case we set the ID to 0):
      if (data.allItems[type].length > 0 ) {
        ID = data.allItems[type][data.allItems[type].length - 1 ].id + 1;
      } else {
        ID = 0;
      };

      // Create new item based on 'inc' or 'exp' type (for convenience we use the same variable
      // names that are used in the HTML file):
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into the data structure.
      data.allItems[type].push(newItem);

      // Return new item.
      return newItem;
    },

    deleteItem: function(type, id) {
      // The exp or inc arrays are not sorted, and elements have been deleted already (potentially),
      // so we need to have a method to retrieve the index of a specific element. Here's how this
      // can be achieved:

      var ids, index;

      ids = data.allItems[type].map(function(current){
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);  // remove one element, starting at index "index"...
      };

    },

    calculateBudget: function() {
      
      // Calculate total income and expenses.
      calculateTotal('exp');
      calculateTotal('inc');

      // Calculate the budget: income - expenses.
      data.budget = data.totals.inc - data.totals.exp;

      // Calculate the percentage of income that we spent.
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: function() {

      /*
      a=20
      b=10
      c=40
      income=100
      a=20/100=20%
      */ 

      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      })
    },

    getPercentages: function() {
      // Here we use the map function as we would like to have a new array returned from the 
      // operation.
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      })
      return allPerc;  // array containing all percentages
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function() {
      console.log(data);
    }

  };

}) ();


// UI CONTROLLER
// @ts-check
var UIController = (function() {
  
  // Compile all strings from the HTML in a central place to retrieve them, but also to make
  // it easy if something in the HTML will changed later on there will only be one place
  // (right here) where need to change it in the backend.
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage'
  }
  // parent class of both inc and exp
  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,  // income (inc) or expense (exp)
        description: document.querySelector(DOMstrings.inputDescription).value,
        // We want to return the following as a floating point number, and not as a string.
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    addListItem: function(obj, type) {
      var html, newHTML, element;

      // Create HTML string with placeholder text.
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
      }
      // Relace the placeholder text with some actual data.
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      // Insert the HTML into the DOM (always insert the new element as the last child of the 
      // income list or the expense list).
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    },

    deleteListItem: function(selectorID) {

      // Removing an element from the DOM in JavaScript is weird, but here it goes...
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);

    },

    clearFields: function() {
      // Once an item has been added to income or expenses lists, clear the input prompt in the UI
      // immediately.
      var fields, fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' 
      + DOMstrings.inputValue);
      
      // fields is currently a list (that's what querySelectorAll returns), but we need an array.
      fieldsArr = Array.prototype.slice.call(fields);  // cast list into an array

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      // Put cursor back into the input prompt so user can conveniently enter data without navigate 
      // to it.
      fieldsArr[0].focus();

    },

    displayBudget: function(obj) {  // obj here is the ouput from function "getBudget" further down
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }

    },

    displayPercentages: function(percentages) {
      // Here we're using a custom-made loop function, that takes advantage of the
      // callback function mechanism in JavaScript.

      // fields is a node list (i.e., NOT an array).
      var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      var nodeListForEach = function(list, callback) {
        // This function calls the callback function for each element in the node list. By creating
        // a separate function we can reuse this for any node list throughout the app.
        // list in this case will be fields (i.e. the node list). 
        for (var i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      };

      nodeListForEach(fields, function(current, index) {

        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });

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
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  // Main logic:

  var updateBudget = function() {

    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return budget
    var budget = budgetCtrl.getBudget();
    
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
    //console.log(budget);
  }

  var updatePercentages = function() {

    // 1. Calculate percentages.
    budgetCtrl.calculatePercentages();

    // 2. Read them from the budget controller.
    var percentages = budgetCtrl.getPercentages();

    // 3. Update percentage on the UI.
    UICtrl.displayPercentages(percentages);
  };

  // @ts-check
  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get the field input data.
    input = UICtrl.getinput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

      // 2. Add the item to the budget controller (use input from previous step).
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields "description" and "value" on the prompt.
      UICtrl.clearFields();

      // 5. Calculate and update budget.
      updateBudget();

      // 6. Calculate and update percentages.
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    // TRAVERSE THE DOM TO IDENTIFY THE PARENT ELEMENT OF THE EVEN THAT FIRED
    // The following isn't a great way of finding the ID of the parent node of the target element,
    // (due to the hard-coding of the number of times it is called, creating reliance on the 
    // DOM structure), but for the time being it works...
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {

      splitID = itemID.split('-');  // returns an array
      type = splitID[0];
      ID = parseInt(splitID[1]);  // the output from the split method is a string!

      // 1. Delete item from data structure.
      budgetCtrl.deleteItem(type, ID);

      // 2. Delete item from the UI.
      UICtrl.deleteListItem(itemID);

      // 3. Update and show the new budget.
      updateBudget();
      
      // 4. Calculate and update percentages.
      updatePercentages();

    };
  }

  return {
    init: function() {
      console.log('Application has started.');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  }


}) (budgetController, UIController);

controller.init();
