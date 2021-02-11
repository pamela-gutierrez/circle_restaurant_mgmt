$(document).ready(function () {
    // Renders Menu Item
    renderMenu();

    // Render Dropdown list of Table options in NavBar
    renderSeating();

    // On "click" functions to Add Item's to Cart, View Cart, and Submit Order
    $(document).on("click", "button.addItem", addToCart);
    $(document).on("click", "button.viewCart", renderCart);
    var submitOrderButton = $(".submitOrderButton");
    submitOrderButton.on("click", function () {
        console.log("hello");
        submitOrder();
    })


    // Pointers to HTML tags/classes/ids
    var loginAdmin = $("form.modalLogin");
    var usernameInput = $("input#username-input");
    var passwordInput = $("input#password-input");

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
    });

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
})

// Dynamically creates table selection dropdown list
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

// Dynamically appends menu item cards onto main.html by Item Category
function createNewCard(items) {
    var newOrderCard = $("<div>").addClass("card").css("width", "300px");
    var newOrderCardHeading = $("<div>").addClass("header cell-header card-section");
    var itemName = $("<h4>").text(items.name + " ");
    var itemDescription = $("<p>").text(items.description + " ");
    var newFooter = $("<div>").addClass("card-divider flex-container footer align-right");
    var itemCost = $("<p>").text("$" + items.cost + " ");
    var addButton = $("<button>").addClass("button addItem").attr("data-id", items.id).text("Add Item");
    
    itemCost.append(addButton);
    newFooter.append(itemCost); //.append(addButton);
    newOrderCardHeading.append(itemName).append(itemDescription).append(newFooter);
    newOrderCard.append(newOrderCardHeading);


    switch (items.category) {
        case "Appetizers":
            $("#appetizerItem").append(newOrderCard);
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

// Updates current table ID based on selected Table ID
function updateTable() {
    var tableDropdownId = $("#order-table").find(":selected").val();
    // console.log(tableDropdownId);
    $.ajax({
        url: "/api/seating/" + tableDropdownId,
        type: "PUT"
    }).then(function () {
        //   console.log();
    })
    return tableDropdownId;
}

// Takes itemId and seatingId and adds them to order when "Add" button is clicked
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
        // console.log(data);
        $.ajax({
            url: "/api/orders",
            type: "POST",
            data: data
        }).then(function (err) {
            if (err) throw err;
        })
    }
}

// Renders item's in cart for each table based on tableId
function renderCart() {
    var seatingIdToRender = $("#order-table").find(":selected").val();
    // console.log(seatingIdToRender);
    $("#activeOrders-container").empty();
    if (seatingIdToRender == "Select a table:") {
        $(".cartItem").text("Invalid seating table");
    } else {
        var totalSum = 0;
        $.ajax({
            url: "/api/orders/seating/" + seatingIdToRender,
            type: "GET"
        }).then(function (data) {
            data.forEach(element => {
                var newRow = $("<tr>").addClass("cart-item").attr("data-order-id", element.id);
                var nameTd = $("<td>").text(element.Item.name);
                var qtyTd = $("<td>").text(element.item_quantity);
                var costTd = $("<td>").text(element.Item.cost);
                newRow.append(nameTd, qtyTd, costTd);
                $("#activeOrders-container").append(newRow);
                totalSum += parseInt(element.Item.cost);
            });
            $(".cartTotal").text(totalSum);
        })
    }
}

function submitOrder() {
    console.log("WE ARE HERE");
    var cartItems = document.querySelectorAll(".cart-item");
    // var dataOrderId = cartItems.getAttribute("data-order-id");
    cartItems.forEach(element => {
        console.log(element.dataset.orderId);
        $.ajax({
            url: "/api/orders/" + element.dataset.orderId,
            type: "PUT",
        }).then(function (data) {
            console.log(data);
            
        })
    });
    alert("Your Order Has Been Submitted!");
    window.location.href = "/";
}
