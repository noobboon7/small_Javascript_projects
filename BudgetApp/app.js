//Budget Controller
const budgetController = (function() {
  
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
const UIController =(function(){

  var DOMStrings = {
    inputType: '.add__type', 
    inputDescription: '.add__description', 
    inputValue: '.add__value', 
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return{
    getInputs: () => {
      return{
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },

    addListItem: (obj, type) => {
      let html, newHtml, element;
      
      //create HTML placeholder
      if(type === 'inc'){
        element = DOMStrings.incomeContainer;

        html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      } else if (type === 'exp'){ 
        element = DOMStrings.expensesContainer;
        
        html = ' <div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%<div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      //replace placeholder text 
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: () => {
      let fields, fieldsArr;
      fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((cur, idx, arr) => {
        cur.value = "";
      });
      fieldsArr[0].focus();
    },

    getDOMStrings: () => DOMStrings, 
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
  
  const updateBudget = () => {
     // calc the budget 

    //  Return the budget

    // display the budget on UI 
  }
  

  const ctrlAddItem = () => {
    let input, newItem;
    
    // get input data 
    input = UICtrl.getInputs();

    if(input.value > 0 && input.description !== "" && !isNaN(input.value)) {
      // add the item
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // add to UI 
      UICtrl.addListItem(newItem, input.type);
      
      // Clear the fields
      UICtrl.clearFields();
      
      // calc and update budget
      updateBudget();
    }
  };

  return {
    init: () => {
      console.log("application has started");
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();