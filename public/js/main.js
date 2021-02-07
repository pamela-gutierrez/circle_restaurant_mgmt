//VIEW MENU
$(".viewMenu").on("click", function (event) {
    event.preventDefault();

    // GET ALL THE MENU ITEMS
})

// ADD ITEM TO ORDER
$(".addItem").on("click", function (event) {
    event.preventDefault();
    // THIS IS AN EDIT TO AN EXISTING ORDER. I need to grad the table order id and change the add another item to that order.


})

// DELETE ITEM FROM ORDER
$(".delete-item").on("click", function (event) {
    var id = $(this).data("id");
    $.ajax("/api/orders/" + id, {
        type: "DELETE"
    }).then(
        function () {
            console.log("deleted order", id);
            location.reload();
        }
    )
})

// SUBMIT ORDER

$(".sumbitOrder").on("click", function (event) {

})