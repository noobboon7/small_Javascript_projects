//Budget Controller
const budgetController = (function() {
  
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function(totalIncome) {
    if(totalIncome > 0){
      this.percentage = Math.round((this.value / totalIncome) * 100);
    }else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };
  
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach(cur => sum += cur.value );
    data.totals[type]  = sum;
  };
  

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
    percentage: -1
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
    },

    deleteItem: (type, id) => {
      let ids, idx;
      
      ids = data.allItems[type].map(ele => ele.id);
      idx = ids.indexOf(id);
      if(idx !== -1){
        data.allItems[type].splice(idx, 1);
      }
    },

    calculateBudget: () => {
      
      // calculate total income and expenses
      calculateTotal('inc');
      calculateTotal('exp');
      
      // Calculate the budget: income + expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the % of the income that we spend 
      if(data.totals.inc > 0){
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      }else {
        data.percentage = -1;
      }
    }, 

    calculatePercentages: () => {
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: () => {
      const allPercentages = data.allItems.exp.map(cur => cur.getPercentage());
      return allPercentages;
    },

    getBudget: () => {
     return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: () => {
      console.log(data);
    }
  };

})();

// UI Controller
const UIController =(function(){

  var DOMStrings = {
    inputType: '.add__type', 
    inputDescription: '.add__description', 
    inputValue: '.add__value', 
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  };
  const formatNumber =(num, type) => {
    let numSplit, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit =num.split('.');

    int = numSplit[0];

    if(int.length > 3 && int.length < 6){
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    } else if(int.length > 6 && int.length < 9){
      int = int.substr(0, int.length - 6) + ',' + int.substr(int.length - 6, 3) + ',' + int.substr(int.length - 3, 3);
    } else if(int.length > 9){
      int = int.substr(0, int.length - 9) + ',' + int.substr(int.length - 9, 3) + ',' + int.substr(int.length - 6, 3) + ',' + int.substr(int.length - 3, 3) ;
    }
    
    dec = numSplit[1];

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };

  const nodeListForEach = (list, callback) => {
    for( let [idx, ele] of list.entries()){
      callback(ele, idx);
    }
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

        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      } else if (type === 'exp'){ 
        element = DOMStrings.expensesContainer;
        
        html = ' <div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%<div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      //replace placeholder text 
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value,type));
      // Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: (selectorID) => {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
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

    displayBudget: (obj) => {
      let type;

      obj.budget > 0 ? type = 'inc' : type = 'exp';
      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, type);
      document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, type);
      
      if(obj.percentage > 0){
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }
    },

    displayPercentages: (percentages) => {
      let fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
      
      nodeListForEach(fields, (cur, idx) => {
        if(percentages[idx] > 0) {
          cur.textContent = percentages[idx] + '%';
        }else {
          cur.textContent = '---';
        }

      });
    },

    displayMonth: () => {
      let now, months, month, year;
      
      now = new Date();
      months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = now.getMonth();
      year = now.getFullYear();
      document.querySelector(DOMStrings.dateLabel).textContent = `${months[month - 1]}  ${year}`;
    },
    
    changedType: () => {
      let fields = document.querySelectorAll(
        DOMStrings.inputType + ',' +
        DOMStrings.inputDescription + ','  + 
        DOMStrings.inputValue);

        nodeListForEach(fields, cur => cur.classList.toggle('red-focus'));
        document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
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

    document.querySelector(DOMs.container).addEventListener('click', ctrDeleteItem);
    document.querySelector(DOMs.inputType).addEventListener('change', UICtrl.changedType);
  };
  
  const updateBudget = () => {
    
    // calc the budget 
    budgetCtrl.calculateBudget();

    //  Return the budget
    const budget = budgetCtrl.getBudget();

    // display the budget on UI 
    UICtrl.displayBudget(budget);
  };

  const updatePercentages  = () => {
    
    // calculate budget 
    budgetCtrl.calculatePercentages();

    // read percentages from BudgetController
    let percentages = budgetCtrl.getPercentages();
    // Update the UI 
    UICtrl.displayPercentages(percentages);
  };

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

      // update percentages 
      updatePercentages();
    }
  };

  const ctrDeleteItem = (event) => {
    let itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID){
      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      budgetCtrl.deleteItem(type, ID);
      UICtrl.deleteListItem(itemID);
      updateBudget();
      updatePercentages();
    }
  };
  

  return {
    init: () => {
      console.log("application has started");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();