// from the main page we user should be able to:
// login the admin
// add items to their order
// remove items from their order
// submit their order


$(document).ready(function () {
    // --------------------------ADMIN LOGIN--------------------------------
    // Pointers to HTML tags/classes/ids
    var menuItemContainer = $(".menuItem-container");
    var activeOrders = $("#activeOrders-container");

    var loginAdmin = $("form.modalLogin");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");

    // $(document).on("click", "button.editOrder", handleEditOrder);
    // $(document).on("submit", "button.submitOrder", handleSubmitOrder);


    // ADMIN LOGIN
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

        usernameInput.val("");
        passwordInput.val("");
        // signUpUser(userData.username, userData.password);
        // usernameInput.val("");
        // passwordInput.val("");
    });

    // not sure if we need this... the html routes might already link to admin
    function loginUser(username, password) {
        $.post("/api/main", {

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
    // sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // UPDATE ORDER: gets the data from the order we are updating
    // We need this to get the id that we'll pass to the get request below
    function getOrderData(id) {
        var orderData = {

        }
    }

    function updateOrder(item) {
        $.ajax({
            method: "PUT",
            url: "/api/admin/item/:id"
        })
    }



    // ADD ITEM TO ORDER
    $(".addItem").on("click", function (event) {
        event.preventDefault();
        // THIS IS AN EDIT TO AN EXISTING ORDER. I need to grad the table order id and change the add another item to that order.
    })

    // Submit Order
    //  function handleSubmitOrder (){

    //  }


    // DELETE ITEM FROM ORDER
    $(".delete-item").on("click", handleOrderItemDelete)

    function handleOrderItemDelete() {
        $.ajax({
            method: "DELETE",
            url: "/api/main/menu/" + id
        }).then(function () {
            console.log("deleted order", id);
            location.reload();
        })
        var currentItem = $(this)
            .parent()
            .parent()
            .data("item")
    }

})


