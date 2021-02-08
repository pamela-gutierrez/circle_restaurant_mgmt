// from the main page we user should be able to:
// view the menu
// add items to their order
// remove items from their order
// submit their order


$(document).ready(function () {
    var orderId;
    // sets a glad for whether or not we're updating a post to be false initially
    var updating = false;

    // Getting jQuery references to the itemId
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    var postCategorySelect = $("#category");


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


