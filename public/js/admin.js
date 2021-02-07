// =========================================================================== ADMIN ONLY==========================================================================================
// LOGIN PAGE:
// for login button class = loginSumbit
// What do I want to happen when the person hits the login button?
// I want to send the information to be verified as existing in our user database. If it does exist in our user database, (the credentials are valid) redirect them to the admin members page where

// BUTTON TO SUBMIT LOGIN INFORMATION
// $(".loginSubmit").on("click", function (event) {

$(document).ready(function () {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var itemId;
    var updating = false;

    // If we have this section in our url, we pull out the item id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?item_id=") !== -1) {
        postId = url.split("=")[1];
        getMenuItemData(itemId);
    }


    // itemContainer holds all of the orders
    // activeOrderContainer  holds all of the orders in progress
    var itemContainer = $(".menuItem-container");
    var activeOrders = $(".activeOrders-container");
    var orders;

    // ----------------------------------------------------------------------
    // LOGIN FUNCTION 

    var loginAdmin = $("form.login");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");

    loginAdmin.on("submit", function (event) {
        event.preventDefault();
        var userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.username || !userData.password) {
            return;
        }
        loginUser(userData.username, userData.password);
        usernameInput.val("val");
        passwordInput.val("");
        // signUpUser(userData.username, userData.password);
        // usernameInput.val("");
        // passwordInput.val("");
    });

    function loginUser(username, password) {
        $.post("/api/admin", {
            username: username,
            password: password
        })
            .then(function () {
                window.location.replace("/admin");
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    $(".logout").on("click", function (event) {
        event.preventDefault();
    })

    // ONCE ON THE MEMBERS PAGE ADMINS SHOWS 
    // --------------------------------------------------------------------
    // come back to this, do edit menu first

    // VIEW ALL MENU ITEMS -- fix this.

    function viewMenuItem() {

    }
    // This is view 
    var viewTableOrders = $("viewTableOrders");

    viewTableOrders.on("click", function (event) {
        event.preventDefault();
        $.get("/api/admin/item").then(function (data) {
            console.log(data);
        })
        // getCustOrders
    })

    // OR






    // --------------------------------ADD A NEW ITEM TO THE MENU---------------------------------

    var newMenuItemForm = $("#nif");
    // Do we need this? Or is the newMenuItem already the same thing?
    var addItem = $(".add-Item");
    var nameInput = $("#nameInput");
    var categoryInput = $("#categoryInput");
    var descriptionInput = $("#descriptionInput");
    var costInput = $("#costInput");


    $(newMenuItemForm).on("submit", function handleItemSumbit(event) {
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
            sumbitNewItem(newMenuItem);
        }
    });
    // Submits a new menu Item and brings user to available menu items page upon completion
    function submitMenuItem(menuItem) {
        // does this one need an id already? I think Hudson's route might not need it either?
        $.post("/api/admin/item/:id", menuItem, function () {
            window.location.href = "/admin";
        });
    }
    // ------------------------------------------------------------------------------------------








    // ----------------------------------------------------------------------

    // EDIT MENU BUTTON.
    // $(".editMenu").on("click", function (event) {
    //     event.preventDefault();
    //     var id = $(this).data("id");
    //     var editedMenu = $(this).data("")


    //     function editMenu(menuItem) {

    //     }

    //     $.ajax("/api/admin" + id, {
    //         type: "PUT",
    //         url: 
    //     }
    // })

    // ------------------------------------------------------------------------

    // BUTTON THAT MARKS ORDERS AS COMPLETED
    $(".change-completed").on("click", function (event) {
        var id = $(this).data("id");
        var newCompleted = $(this).data("newCompleted");
    })
    // ------------------------------------------------------------------------




    // -------------------------------------------------------------------------
    // DELETE ITEMS FROM ORDER
    // $(".delete-item").on("click", function (event) {
    //     var id = $(this).data("id");
    function deleteMenuItem(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/admin/menu/" + id
        })
            .then(function () {
                console.log("deleted menu item", id);
            });
    }
    function handleMenuItemDelete() {
        var currentMenuItem = $(this)
            .parent()
            .parent()
            .data("menuItem");
        window.location.href = "/"
    }















})