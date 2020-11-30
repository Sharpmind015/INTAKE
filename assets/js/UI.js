// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#js-item-list",
    listItems: "#js-item-list li",
    addBtn: "#js-add-btn",
    clearBtn: "#js-clear-btn",
    itemNameInput: "#js-item-name",
    itemCaloriesInput: "#js-item-calories",
    totalCalories: "#js-total-calories"
  };
  // Public methods
  return {
    populateItemList: function(items) {
      let html = "";
      items.forEach(item => {
        html += `<li class="list-group-item justify-content-between card" id="item-${item.id}">
        <div id="main-item-${item.id}"
        <strong>${item.name}: <em>${item.calories} Calories</em></strong>
        <div>
          <button class="btn btn-link px-1 mr-0"><i class="text-primary edit-item fa mr-0 fa-pencil"></i></button>
          <button class="btn btn-link px-1 mr-0"><i class="text-danger delete-item fa mr-0 fa-remove"></i></button>
        </div>
        </div>
        <form class="form w-100 d-none" id="js-form-${item.id}">
          <div class="form-group">
            <input type="text" placeholder="Add Item" id="js-item-name-${item.id}" class="form-control">
          </div>
          <div class="form-group">
            <input type="number" placeholder="Add Calories" id="js-item-calories-${item.id}" class="form-control">
          </div>
          <div class="d-flex-md justify-content-between">
            <button class="update-item btn btn-rose btn-md">Update meal <i class="fa fa-pencil-square-o ml-2"></i></button>
            <button class="back-item btn btn-default btn-md">Back <i class="fa fa-chevron-circle-left ml-2"></i></button>
          </div>
        </form>
      </li>`;
      });

      //Insert list getItems
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: function(item) {
      // Create li element
      const li = document.createElement("li");
      // Add class
      li.className = "list-group-item justify-content-between card";
      // Add ID
      li.id = `item-${item.id}`;
      //Add HTML
      li.innerHTML = `
        <div id="main-item-${item.id}"
        <strong>${item.name}: <em>${item.calories} Calories</em></strong>
        <div>
          <button class="btn btn-link px-1 mr-0"><i class="text-primary edit-item fa mr-0 fa-pencil"></i></button>
          <button class="btn btn-link px-1 mr-0"><i class="text-danger delete-item fa mr-0 fa-remove"></i></button>
        </div>
        </div>
        <form class="form w-100 d-none" id="js-form-${item.id}">
          <div class="form-group">
            <input type="text" placeholder="Add Item" id="js-item-name-${item.id}" class="form-control">
          </div>
          <div class="form-group">
            <input type="number" placeholder="Add Calories" id="js-item-calories-${item.id}" class="form-control">
          </div>
          <div class="d-flex-md justify-content-between">
            <button class="update-item btn btn-rose btn-md">Update meal <i class="fa fa-pencil-square-o ml-2"></i></button>
            <button class="back-item btn btn-default btn-md">Back <i class="fa fa-chevron-circle-left ml-2"></i></button>
          </div>
        </form>`;
      //Insert itemAddSubmit
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: function(item) {
      document.querySelector(`#item-${item.id}`).innerHTML = `
        <div id="main-item-${item.id}"
        <strong>${item.name}: <em>${item.calories} Calories</em></strong>
        <div>
          <button class="btn btn-link px-1 mr-0"><i class="text-primary edit-item fa mr-0 fa-pencil"></i></button>
          <button class="btn btn-link px-1 mr-0"><i class="text-danger delete-item fa mr-0 fa-remove"></i></button>
        </div>
        </div>
        <form class="form w-100 d-none" id="js-form-${item.id}">
          <div class="form-group">
            <input type="text" placeholder="Add Item" id="js-item-name-${item.id}" class="form-control">
          </div>
          <div class="form-group">
            <input type="number" placeholder="Add Calories" id="js-item-calories-${item.id}" class="form-control">
          </div>
          <div class="d-flex-md justify-content-between">
            <button class="update-item btn btn-rose btn-md">Update meal <i class="fa fa-pencil-square-o ml-2"></i></button>
            <button class="back-item btn btn-default btn-md">Back <i class="fa fa-chevron-circle-left ml-2"></i></button>
          </div>
        </form>`;
    },
    deleteListItem: function(id) {
      document.querySelector(`#item-${id}`).remove();
    },
    clearListItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      //Turn nodelist into array
      listItems = Array.from(listItems);
      listItems.forEach(item => item.remove());
    },
    clearFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: function(id) {
      document.querySelector(
        `#js-item-name-${id}`
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        `#js-item-calories-${id}`
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState(id);
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    showEditState: function(id) {
      document.querySelector(`#main-item-${id}`).classList.add("d-none");
      document.querySelector(`#js-form-${id}`).classList.remove("d-none");
    },
    clearEditState: function(id) {
      document.querySelector(`#main-item-${id}`).classList.remove("d-none");
      document.querySelector(`#js-form-${id}`).classList.add("d-none");
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();
