//Budget Controller
var budgetController = (function() {
 

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
    
     
  }

})();

// GOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  
  var DOMs = UICtrl.getDOMStrings();

  var ctrlAddItem = () => {
    // get input data 

    // add the item

    // add to UI 

    // calc the budget 

    // display the budget on UI 
    console.log("working ")
  }

  document.querySelector(DOMs.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', (event) => {

    if(event.keyCode === 13 || event.which === 13){
      ctrlAddItem()
    }

  });

})(budgetController, UIController);