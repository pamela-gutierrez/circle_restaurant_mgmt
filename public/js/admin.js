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
    var newFooter = $("<div>").addClass("card-divider flex-container footer");
    var itemCost = $("<p>").addClass("align-left").text("$" + items.cost);
    var addButton = $("<button>").addClass("editItem button float-right").attr("data-open", "editItemModal").attr("data-id", items.id).text("Edit Item");
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