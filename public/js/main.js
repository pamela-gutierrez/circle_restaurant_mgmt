// from the main page we user should be able to:
// view the menu
// add items to their order
// remove items from their order
// submit their order


$(document).ready(function () {
    // --------------------------ADMIN LOGIN--------------------------------

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



    var orderId;
    // sets a glad for whether or not we're updating a post to be false initially
    var updating = false;

    // Getting jQuery references to the itemId



    // UPDATE ORDER: gets the data from the order we are updating
    function getOrderData(id) {
        $.post("/api/orders" + id, function (data) {
            if (data) {
                nameInput.val(data.name);
                updating = true;
            }
        })
    }


    // DELETE ITEM FROM ORDER
    $(".delete-item").on("click", function (event) {
        $.ajax({
            method: "DELETE",
            url: "/api/main/menu/" + id
        }).then(function () {
            console.log("deleted order", id);
            location.reload();
        })
    })

    // ADD ITEM TO ORDER
    $(".addItem").on("click", function (event) {
        event.preventDefault();
        // THIS IS AN EDIT TO AN EXISTING ORDER. I need to grad the table order id and change the add another item to that order.


    })

})


