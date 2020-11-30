// App Controller
const App = (function(ItemCtrl, UICtrl, StorageCtrl) {
  // Load Event Listeners
  const loadEventListeners = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();
    // Add item events
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    //Disable submit on enter
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    //Edit icon events
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);
    // Update item event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemUpdateSubmit);
    // Delete item event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemDeleteSubmit);
    // Clear items event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", itemsClearClick);
    // Back button event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", e => {
        if (e.target.classList.contains("back-item")) {
          // Get List item id
          const listId = e.target.parentNode.parentNode.parentNode.id;
          // Get actual id
          const id = parseInt(listId.split("-")[1]);
          UICtrl.clearEditState(id);
        }
        e.preventDefault();
      });
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    //Get form input from UIController
    const input = UICtrl.getItemInput();

    // Check for name and calories
    if (input.name !== "" && input.calories !== "") {
      //Add item
      ItemCtrl.addItem(input.name, input.calories);
      //Add items to UI List
      UICtrl.addListItem(newItem);
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);
      // Store in Local Storage
      StorageCtrl.storeItem(newItem);
      //Clear fields
      UICtrl.clearFields();
    }

    e.preventDefault();
  };

  // Edit item
  const itemEditClick = function(e) {
    if (e.target.classList.contains("edit-item")) {
      // Get List item id
      const listId = e.target.parentNode.parentNode.parentNode.parentNode.id;
      // Get actual id
      const id = parseInt(listId.split("-")[1]);
      //Get item
      const itemToEdit = ItemCtrl.getItemByID(id);
      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      //Add item to form
      UICtrl.addItemToForm(id);
    }
    e.preventDefault();
  };

  //Update item submit
  const itemUpdateSubmit = function(e) {
    if (e.target.classList.contains("update-item")) {
      // Get List item id
      const listId = e.target.parentNode.parentNode.parentNode.id;
      // Get actual id
      const id = parseInt(listId.split("-")[1]);
      // Get Form values
      const name = e.target.parentNode.parentNode.elements[0].value;
      const calories = e.target.parentNode.parentNode.elements[1].value;
      //Update Item
      const updatedItem = ItemCtrl.updateItem(name, calories, id);
      //Update UI
      UICtrl.updateListItem(updatedItem);
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Update local storage
      StorageCtrl.updateItemStorage(updatedItem);
      UICtrl.clearEditState(updatedItem.id);
      e.preventDefault();
    }
  };
  const itemDeleteSubmit = function(e) {
    if (e.target.classList.contains("delete-item")) {
      // Get List item id
      const listId = e.target.parentNode.parentNode.parentNode.parentNode.id;
      // Get actual id
      const id = parseInt(listId.split("-")[1]);
      // Delete item fro data structure
      ItemCtrl.deleteItem(id);
      // Delete from UI
      UICtrl.deleteListItem(id);
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);
      //Delete from localStorage
      StorageCtrl.deleteItemFromStorage(id);
      e.preventDefault();
    }
  };

  //Clear items event
  const itemsClearClick = function(e) {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();
    // Remove from UI
    UICtrl.clearListItems();
    //Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);
    // Clear from localStorage
    StorageCtrl.clearItemsFromStorage();
    e.preventDefault();
  };

  // Public methods
  return {
    init: function() {
      //Set initial clearEditState
      // UICtrl.clearEditState();

      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate list with items
      UICtrl.populateItemList(items);

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Load event loadEventListeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl, StorageCtrl);

App.init();
