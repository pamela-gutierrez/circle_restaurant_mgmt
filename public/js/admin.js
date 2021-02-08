// =========================================================================== ADMIN ONLY==========================================================================================
// LOGIN PAGE:
// for login button class = loginSumbit
// What do I want to happen when the person hits the login button?
// I want to send the information to be verified as existing in our user database. If it does exist in our user database, (the credentials are valid) redirect them to the admin members page where

const items = require("../../models/items");


$(document).ready(function () {
    // itemContainer holds all of the orders
    // activeOrderContainer  holds all of the orders in progress
    var menuItemContainer = $(".menuItem-container");
    var activeOrders = $(".activeOrders-container");
    // var itemCategorySelect = $("#category");

    // Click events for view menu, edit menu, delete menu items
    $(document).on("click", "button.delete", handleMenuItemDelete);
    $(document).on("click", "button.edit", handleMenuEdit);
    // $(document).on("click", "button.view", handleViewMenu);

    // Item Id for the individual menu items 
    var menuItem;
    // Submitted orders, are we going to allow the admin to edit orders?
    var orders;

    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var updating = false;

    // If we have this section in our url, we pull out the item id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?item_id=") !== -1) {
        postId = url.split("=")[1];
        getMenuItemData(itemId);
    }


    $(".logout").on("click", function (event) {
        event.preventDefault();
    })


    // ----------------ADD A NEW ITEM TO THE MENU----------------------------

    var newMenuItemForm = $("#nif");
    var nameInput = $("#nameInput");
    var categoryInput = $("#categoryInput");
    var descriptionInput = $("#descriptionInput");
    var costInput = $("#costInput");


    $(newMenuItemForm).on("submit", function handleItemSubmit(event) {
        event.preventDefault();
        // wont submit if form is empty or missing body or title
        if (!nameInput.val().trim() || !categoryInput.val().trim() || !descriptionInput.val().trim() || !costInput.val().trim()) {
            return;
        }
        var newMenuItem = {
            name: nameInput.val().trim(),
            category: categoryInput.val().trim(),
            description: descriptionInput.val().trim(),
            cost: costInput.val().trim()
        };
        console.log(newMenuItem)

        if (updating) {
            newMenuItem.id = itemId
            updateMenuItem(newMenuItem);
        }
        else {
            submitNewItem(newMenuItem);
        }
    });

    // --------------SUBMIT MENU ITEM------------------------------
    // Submits a new menu Item and brings user to available menu items page upon completion
    function submitMenuItem(menuItem) {
        // does this one need an id already? I think Hudson's route might not need it either?
        $.post("/api/admin/item/:id", menuItem, function () {
            window.location.href = "/admin";
        });
    }

    // -----------------DELETE ITEMS FROM MENU----------
    function deleteMenuItem(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/admin/menu/" + id
        })
            .then(function () {
                viewFullMenu(itemCategorySelect.val());
            });
    }
    viewFullMenu();

    // --------------------------------------------------------------

    // BUTTON THAT MARKS ORDERS AS COMPLETED
    $(".change-completed").on("click", function (event) {
        var id = $(this).data("id");
        var newCompleted = $(this).data("newCompleted");
    });
    // --------------------------------------------------------------

    // Function to append new menu item post to HTML inside menuItemContainer

    function initalizeNewMenu() {
        menuItemContainer.empty();
        var menuItemToAdd = [];
        for (var i = 0; i < menuItem.length; i++) {
            menuItemToAdd.push(createNewItem(menuItem[i]));
        }
        menuItemContainer.append(menuItemToAdd);
    }

    // Constructs HTML for new Menu Item
    function createNewItem(item) {
        var newMenuItemCard = $("<div>");
        newMenuItemCard.addclass("card");
        var newItemCardName = $("<div>");
        newItemCardName.addclass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("Delete Item");
        deleteBtn.addclass("delete btn");
        var editBtn = $("<button>");
        editBtn.text = ("edit item")
        editBtn.addclass("editBtn");
        var newItemCategory = $("<h5>");
        newItemCategory.text(menuItem.category);
        var newItemCost = $("<h5>")
        newItemCost.text(newItemCost.cost)
    };


    functionHandleMenuEdit() {
        var currentMenuItem = $(this)
            .parent()
            .parent()
            .data("item")
        window.location.href = "/admin?item_id=" + currentMenuItem.id;
    }

    function handleMenuItemDelete() {
        var currentMenuItem = $(this)
            .parent()
            .parent()
            .data("menuItem");
        deleteMenuItem(currentMenuItem.id);
    }

});

    // -----------------VIEW ALL MENU ITEMS------------------------------
    // Will the menu be automatically displayed when the user logs in? Or will it be a seperate button?
    // Potential extra feature? Do we want to allow the user to search by category of food item?
    // function viewFullMenu(category) {
    //     var categoryString = category || "",
    //     if (categoryString) {
    //         categoryString = "/category/" + categoryString;
    //     }
    //     // var viewFullMenu = $("viewFullMenu");
    //     // viewFullMenu.on("click", function (event) {
    //     //     event.preventDefault();
    //     $.get("/api/admin/item", + categoryString, (function (data) {
    //         console.log("Items", data);
    //         items = data;
    //         if (!items || !items.length) {
    //             displayEmpty();
    //         } else {
    //             initializeMenu();
    //         }
    //     })