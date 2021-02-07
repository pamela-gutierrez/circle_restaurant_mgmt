// =========================================================================== ADMIN ONLY==========================================================================================
// LOGIN PAGE:
// for login button class = loginSumbit
// What do I want to happen when the person hits the login button?
// I want to send the information to be verified as existing in our user database. If it does exist in our user database, (the credentials are valid) redirect them to the admin members page where

// BUTTON TO SUBMIT LOGIN INFORMATION
// $(".loginSubmit").on("click", function (event) {

$(document).ready(function () {

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
                window.location.replact("/admin");
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    // ONCE ON THE MEMBERS PAGE ADMINS SHOWS 
    $(".logout").on("click", function (event) {
        event.preventDefault();
    })


    // --------------------------------------------------------------------


    // VIEW ALL TABLE ORDERS
    var viewTableOrders = $("viewTableOrders");

    viewTableOrders.on("click", function (event) {
        event.preventDefault();
        $.get("/api/orders").then(function (data) {
            viewCustOrders.text(data.???????)
        })
        // getCustOrders
    })


    // ----------------------------------------------------------------------

    // EDIT MENU BUTTON.
    $(".editMenu").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        var editedMenu = $(this).data("")


        function editMenu(menuItem) {

        }

        $.ajax("/api/admin" + id, {
            type: "PUT",
            url: 
})
    })

    // ------------------------------------------------------------------------

    // BUTTON THAT MARKS ORDERS AS COMPLETED
    $(".change-completed").on("click", function (event) {
        var id = $(this).data("id");
        var newCompleted = $(this).data("newCompleted");
    })
    // BUTTON THAT ALLOWS USER TO REVIEW ITEMS BEFORE SUBMITTING. I'll want to display all the orders. 
    $(".reviewOrders").on("click", function (event) {
        event.preventDefault();
    })


    // -------------------------------------------------------------------------
    // DELETE ITEMS FROM ORDER
    $(".delete-item").on("click", function (event) {
        var id = $(this).data("id");
        $.ajax("/api/admin/menu/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted order", id);
            }
        );
    });
});