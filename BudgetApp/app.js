//Budget Controller
var budgetController = (function() {
 

})();

// UI Controller
var UIController =(function(){

  //code here

})();

// GOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  
  var ctrlAddItem = () => {
    // get input data 

    // add the item

    // add to UI 

    // calc the budget 

    // display the budget on UI 
    console.log("working ")
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', (event) => {

    if(event.keyCode === 13 || event.which === 13){
      ctrlAddItem()
    }

  })

})(budgetController, UIController);