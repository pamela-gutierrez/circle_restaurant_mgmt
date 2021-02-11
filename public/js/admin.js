
var renderMenu = () => {
    return $.ajax({
        url: "/api/admin/item",
        type: "GET"
    }).then((menu) => {
        console.log(menu);
        for (var i = 0; i < menu.length; i++) {
            createNewCard(menu[i]);
        }
    })
}

function createNewCard(items) {
    var newOrderCard = $("<div>").addClass("card").css("width", "300px");
    var newOrderCardHeading = $("<div>").addClass("header cell-header card-section");
    var itemName = $("<h4>").text(items.name);
    var itemDescription = $("<p>").text(items.description);
    var newFooter = $("<div>").addClass("card-divider flex-container footer align-right");
    var itemCost = $("<p>").text("$" + items.cost + " ");
    var addButton = $("<button>").addClass("editItem button").attr("data-open", "editItemModal").attr("data-id", items.id).text("Edit Item");
    
    itemCost.append(addButton);
    newFooter.append(itemCost)
    newOrderCardHeading.append(itemName).append(itemDescription).append(newFooter);
    newOrderCard.append(newOrderCardHeading);
    
    switch (items.category) {
        case "Appetizers":
            $("#adminAppetizerItem").append(newOrderCard);
            break;
        case "Burgers":
            $("#adminBurgerItem").append(newOrderCard);
            break;
        case "Salads":
            $("#adminSaladItem").append(newOrderCard);
            break;
        case "Drinks":
            $("#adminDrinkItem").append(newOrderCard);
            break;
        default:
            console.log("invalid category")
            break;
    }
}

function saveMenuItem(e) {
    e.preventDefault();

    var nameInput = $("#add-item-menu");
    var categoryInput = $("#add-item-ctgy");
    var descriptionInput = $("#add-item-desc");
    var costInput = $("#add-item-cost");
    // wont submit if form is empty or missing body or title
    if (!nameInput.val().trim() || !categoryInput.val().trim() || !descriptionInput.val().trim() || !costInput.val().trim()) {
        console.log("INVALID PARAMETERS");
        return;
    } else {
        var newMenuItem = {
            name: nameInput.val().trim(),
            category: categoryInput.val().trim(),
            description: descriptionInput.val().trim(),
            cost: costInput.val().trim()
        };
    }

    $.post("/api/admin/item", newMenuItem, function () {
        window.location.href = "/admin";
    });
}

function updateMenuItem(e) {
    e.preventDefault();

    var itemId = this.getAttribute("data-id");
    var nameInput = $("#edit-item-menu").val().trim();
    var categoryInput = $("#edit-item-ctgy").val().trim();
    var descriptionInput = $("#edit-item-desc").val().trim();
    var costInput = $("#edit-item-cost").val().trim();
    var updatedItem = {};

    // wont submit if form is empty or missing body or title

    if (!nameInput || !categoryInput || !descriptionInput || !costInput) {

        console.log("INVALID PARAMETERS");
        return;
    } else {
        updatedItem = {
            id: itemId,
            name: nameInput,
            category: categoryInput,
            description: descriptionInput,
            cost: costInput
        };
    }

    $.ajax({
        url: "/api/admin/item/" + itemId,
        type: "PUT",
        data: updatedItem
    }).then(function () {
        window.location.href = "/admin";
    });
}

function deleteMenuItem(e) {
    e.preventDefault();
    var currentMenuItemId = this.getAttribute("data-id");
    $.ajax({
        method: "DELETE",
        url: "/api/admin/item/" + currentMenuItemId
    }).then(function () {
        window.location.href = "/admin";
    })
}

function getSingleItem(e) {
    e.preventDefault();
    var currentMenuItemId = this.getAttribute("data-id");
    $.ajax({
        url: "/api/admin/item/" + currentMenuItemId,
        type: "GET"
    }).then(function (item) {
        $("#edit-item-menu").val(item.name).attr("data-name", item.name);
        $("#edit-item-ctgy").val(item.category).attr("data-ctgy", item.category);
        $("#edit-item-desc").val(item.description).attr("data-desc", item.description);
        $("#edit-item-cost").val(item.cost).attr("data-cost", item.cost);
        $("#saveItem").attr("data-id", currentMenuItemId);
        $("#deleteItem").attr("data-id", currentMenuItemId);
    })
}

// On ready
$(document).ready(function () {
    renderMenu();

    // Grab html elements
    addForm = document.getElementById("addMenuItemModal");

    // Event Listeners
    addForm.addEventListener('submit', saveMenuItem);
    $(document).on("click", "button.editItem", getSingleItem);
    $(document).on("click", "button#saveItem", updateMenuItem);
    $(document).on("click", "button#deleteItem", deleteMenuItem);
});


// // =========================================================================== ADMIN ONLY==========================================================================================
// // LOGIN PAGE:
// // for login button class = loginSumbit
// // What do I want to happen when the person hits the login button?
// // I want to send the information to be verified as existing in our user database. If it does exist in our user database, (the credentials are valid) redirect them to the admin members page where

// // const items = require("../../models/items");


// $(document).ready(function () {
//     // itemContainer holds all of the orders
//     // activeOrderContainer  holds all of the orders in progress
//     var menuItemContainer = $(".menuItem-container");
//     var activeOrders = $(".activeOrders-container");
//     // var itemCategorySelect = $("#category");

//     // Click events for view menu, edit menu, delete menu items
//     $(document).on("click", "button.delete", handleMenuItemDelete);
//     $(document).on("click", "button.edit", handleMenuEdit);
//     // $(document).on("click", "button.view", handleViewMenu);

//     // Item Id for the individual menu items 
//     var menuItem;
//     // Submitted orders, are we going to allow the admin to edit orders?
//     var orders;

//     // Gets an optional query string from our url (i.e. ?post_id=23)
//     var url = window.location.search;
//     var updating = false;

//     // If we have this section in our url, we pull out the item id from the url
//     // In localhost:8080/cms?post_id=1, postId is 1
//     if (url.indexOf("?item_id=") !== -1) {
//         postId = url.split("=")[1];
//         getMenuItemData(itemId);
//     }


//     $(".logout").on("click", function (event) {
//         event.preventDefault();
//     })


//     // ----------------ADD A NEW ITEM TO THE MENU----------------------------

//     var newMenuItemForm = $("#nif");
//     var nameInput = $("#nameInput");
//     var categoryInput = $("#categoryInput");
//     var descriptionInput = $("#descriptionInput");
//     var costInput = $("#costInput");


//     $(newMenuItemForm).on("submit", function handleItemSubmit(event) {
//         event.preventDefault();
//         // wont submit if form is empty or missing body or title
//         if (!nameInput.val().trim() || !categoryInput.val().trim() || !descriptionInput.val().trim() || !costInput.val().trim()) {
//             return;
//         }
//         var newMenuItem = {
//             name: nameInput.val().trim(),
//             category: categoryInput.val().trim(),
//             description: descriptionInput.val().trim(),
//             cost: costInput.val().trim()
//         };
//         console.log(newMenuItem)

//         if (updating) {
//             newMenuItem.id = itemId
//             updateMenuItem(newMenuItem);
//         }
//         else {
//             submitNewItem(newMenuItem);
//         }
//     });

//     // --------------SUBMIT MENU ITEM------------------------------
//     // Submits a new menu Item and brings user to available menu items page upon completion
//     function submitMenuItem(menuItem) {
//         // does this one need an id already? I think Hudson's route might not need it either?
//         $.post("/api/admin/item/:id", menuItem, function () {
//             window.location.href = "/admin";
//         });
//     }

//     // -----------------DELETE ITEMS FROM MENU----------
//     function deleteMenuItem(id) {
//         $.ajax({
//             method: "DELETE",
//             url: "/api/admin/menu/" + id
//         })
//             .then(function () {
//                 viewFullMenu(itemCategorySelect.val());
//             });
//     }
//     viewFullMenu();

//     // --------------------------------------------------------------

//     // BUTTON THAT MARKS ORDERS AS COMPLETED
//     $(".change-completed").on("click", function (event) {
//         var id = $(this).data("id");
//         var newCompleted = $(this).data("newCompleted");
//     });
//     // --------------------------------------------------------------

//     // Function to append new menu item post to HTML inside menuItemContainer

//     function initalizeNewMenu() {
//         menuItemContainer.empty();
//         var menuItemToAdd = [];
//         for (var i = 0; i < menuItem.length; i++) {
//             menuItemToAdd.push(createNewItem(menuItem[i]));
//         }
//         menuItemContainer.append(menuItemToAdd);
//     };

//     // Constructs HTML for new Menu Item
//     function createNewItem(item) {
//         var newMenuItemCard = $("<div>");
//         newMenuItemCard.addclass("card");
//         var newItemCardName = $("<div>");
//         newItemCardName.addclass("card-header");
//         var deleteBtn = $("<button>");
//         deleteBtn.text("Delete Item");
//         deleteBtn.addclass("delete btn");
//         var editBtn = $("<button>");
//         editBtn.text = ("edit item")
//         editBtn.addclass("editBtn");
//         var newItemCategory = $("<h5>");
//         newItemCategory.text(menuItem.category);
//         var newItemCost = $("<h5>")
//         newItemCost.text(newItemCost.cost)
//     };


//     function handleMenuEdit() {
//         var currentMenuItem = $(this)
//             .parent()
//             .parent()
//             .data("item");
//         window.location.href = "/admin?item_id=" + currentMenuItem.id;
//     }

//     function handleMenuItemDelete() {
//         var currentMenuItem = $(this)
//             .parent()
//             .parent()
//             .data("menuItem");
//         deleteMenuItem(currentMenuItem.id);
//     }

// });

//     // -----------------VIEW ALL MENU ITEMS------------------------------
//     // Will the menu be automatically displayed when the user logs in? Or will it be a seperate button?
//     // Potential extra feature? Do we want to allow the user to search by category of food item?
//     // function viewFullMenu(category) {
//     //     var categoryString = category || "",
//     //     if (categoryString) {
//     //         categoryString = "/category/" + categoryString;
//     //     }
//     //     // var viewFullMenu = $("viewFullMenu");
//     //     // viewFullMenu.on("click", function (event) {
//     //     //     event.preventDefault();
//     //     $.get("/api/admin/item", + categoryString, (function (data) {
//     //         console.log("Items", data);
//     //         items = data;
//     //         if (!items || !items.length) {
//     //             displayEmpty();
//     //         } else {
//     //             initializeMenu();
//     //         }
//     //     })