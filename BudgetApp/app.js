//Budget Controller
var budgetController = (function() {
  
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

})();

// UI Controller
var UIController =(function(){

  var DOMStrings = {
    inputType: '.add__type', 
    inputDescription: '.add__description', 
    inputValue: '.add__value', 
    inputBtn: '.add__btn'
  };

  return{
    getInputs: () => {
      return{
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },

    getDOMStrings: () => DOMStrings 
  };

})();

// GOBAL APP CONTROLLER
var controller = ((budgetCtrl, UICtrl) => {

  const setupEventListeners = () => {
    var DOMs = UICtrl.getDOMStrings();
   
    document.querySelector(DOMs.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
      if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
      }
    });
  };
  
  var ctrlAddItem = () => {
    // get input data 
    var input = UICtrl.getInputs();
    console.log(input);
    // add the item

    // add to UI 

    // calc the budget 

    // display the budget on UI 
    console.log("working ");
  };

  return {
    init: () => {
      console.log("application has started");
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();