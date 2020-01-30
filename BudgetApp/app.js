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
  };

  return {
    addItem: (type, des, val) => {
      let newItem, ID;

      // creates ID
      if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      }else {
        ID = 0;
      }

      // Creating new item 
      if(type === 'exp'){
        newItem = new Expense(ID, des, val);
      } else if(type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      //pushing into the array data structure 
      data.allItems[type].push(newItem);
      
      // return the new element 
      return newItem;
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
    let input, newItem;
    
    // get input data 
    input = UICtrl.getInputs();
    console.log(input);

    // add the item
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
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