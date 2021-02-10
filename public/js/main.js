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
    var loginAdmin = $("form.modalLogin")
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


    // function updateTable() {
    // var tableDropdownId = $("option#order-table").val();  
    // console.log(tableDropdownId);
    // //   $.ajax({
    // //     type: GET
    // //   }  
    // }
    // updateTable()


    // SELECT * FROM ItemOrders
    // LEFT JOIN Orders
    // WHERE Orders.tableId = ?


    // When the add button is clicked we can go and get the current table


    $(document).on("click", "button.addItem", event => {
        event.preventDefault();

    })

    // Renders Added Item's Into Order Modal
    function renderOrderModal() {
        $("#cartItem").val();
        $("#cartItemPrice").val();

    }

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

// ---------------- Renders Menu Item's By Category Onto Page ------------------- //
var renderMenu = () => {
    return $.ajax({
        url: "/api/admin/item",
        type: "GET"
    }).then((menu) => {
        for (var i = 0; i < menu.length; i++) {
            createNewCard(menu[i]);
        }
    })
}

// Render table selection dropdown
var renderSeating = () => {
    $.ajax({
        url: "/api/seating",
        type: "GET"
    }).then((seats) => {
        var seatingLi = $("<li>");
        var seatingLabel = $("<label>");
        var seatingSelect = $("<select>").attr("id", "order-table");
        var seatingOption = $("<option>").attr("value", null).attr("disabled", true).attr("selected", true).text("Select a table: ");
        seatingSelect.append(seatingOption);
        for (var i = 0; i < seats.length; i++) {
            var seatingOptions = $("<option>").attr("value", i + 1).text("Table #" + (i + 1));
            seatingSelect.append(seatingOptions);
        }
        seatingLabel.append(seatingSelect);
        seatingLi.append(seatingLabel);
        $("#seatingDropdown").prepend(seatingLi);
    });
}

// Prints cards onto main.html page
function createNewCard(items) {
    var newOrderCard = $("<div>").addClass("card").css("width", "300px");
    var newOrderCardHeading = $("<div>").addClass("header cell-header card-section");
    var itemName = $("<h4>").text(items.name + " ");
    var itemDescription = $("<p>").text(items.description + " ");
    var newFooter = $("<div>").addClass("card-divider flex-container footer");
    var itemCost = $("<p>").addClass("align-left").text("$" + items.cost);
    var addButton = $("<button>").addClass("button addItem align-right").attr("data-id", items.id).text("Add Item");
    itemCost.append(addButton);
    newFooter.append(itemCost)
    newOrderCardHeading.append(itemName).append(itemDescription).append(newFooter);
    newOrderCard.append(newOrderCardHeading);
    switch (items.category) {
        case "Sandwiches":
            $("#sandwichItem").append(newOrderCard);
            break;
        case "Burgers":
            $("#burgerItem").append(newOrderCard);
            break;
        case "Salads":
            $("#saladItem").append(newOrderCard);
            break;
        case "Drinks":
            $("#drinkItem").append(newOrderCard);
            break;
        default:
            console.log("invalid category")
            break;
    }
}

function updateTable() {
    var tableDropdownId = $("#order-table").find(":selected").val();
    console.log(tableDropdownId);
    $.ajax({
        url: "/api/seating/" + tableDropdownId,
        type: "PUT"
    }).then(function () {
        //   console.log();
    })
    return tableDropdownId;
}

function addToCart() {
    var currentMenuItemId = this.getAttribute("data-id");
    var tableDropdownId = updateTable();

    if (tableDropdownId == "Select a table:") {
        alert("Invalid table. Please select a table.");
        return;
    } else {
        var data = {
            itemId: currentMenuItemId,
            seatingId: tableDropdownId
        }
        console.log(data);
        $.ajax({
            url: "/api/orders",
            type: "POST",
            data: data
        }).then(function (err) {
            if (err) throw err;
        })
    }



}

$(document).ready(function () {
    // Initialize webpage
    renderMenu();
    renderSeating();

    // Event Listeners
    // $(document).on("click", "#order-table", updateTable);
    $(document).on("click", "button.addItem", addToCart);

});

