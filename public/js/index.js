// Add items to the cart
// update the items in the cart
// Delete items from the cart
// View all items in the cart
// submit all items in the cart as an order

const items = require("../../models/items");


//  cs JS that checks to see if there are any values for order id and table id in your cs js.

// function checkForExistingOrders() {
//     if ()
// }
// If there is, then execute a function that makes an ajax request to get all items associated with a specific order. Something like /api/orders/:orderId/items

// This is a variable that get reassigned a value depending on the specific order its associated with.
var items;

function getAllItems() {
    $.get("/api/orders/:id/items", function (data) {
        items = data;
        if (!items || !items.length) {
            // append these to the div where the items would have gone
            console.log("No items in cart.")
        }
        else {
            appendItemsToPage(data);
        }
    })

    function appendItemsToPage() {
        var newOrderCard = $("<div>");
        newOrderCard.addClass("card");
        var newOrderCardHeading = $("<div>");
        newOrderCardHeading.addClass("header cell-header card-section");
        var newItemTitle = $("<h4>");
        var newItemDescription = $("<p>");
        var newFooter = $("<div>");
        newFooter.addClass("card-divider flex-container footer");
        var newPrice = $("<p>");
        newPrice.addClass("align-left");
        var newDeleteButton = $("<button>")
        newDeleteButton.text("Delete Item");
        newDeleteButton.addClass("button align-right");
        newItemTitle.text(items.name);
        newItemDescription.text(items.description);
        newItemPrice.text(items.cost);
        newOrderCardHeading.append(newItemTitle);
        newOrderCardHeading.append(newItemDescription);
        newOrderCardHeading.append(newFooter);
        newFooter.append(newItemPrice);
        newFooter.append(newDeleteButton);
        newOrderCard.append(newOrderCardHeading);
        newOrderCard.append(newFooter);
        newOrderCard.data();
        return newOrderCard;
    }



    // appendItemsToPage --- dynamically create CHECK
    // empty out the div and then dynically create and populate it again

    // If table has already been assigned, we don't want to get all the tables.
    // When the page loads we make a get request to /api/seats
    // ADD API ROUTE TO SEAT

    // // after the request is made and the info is received (we get the information for the seating tables), we then dynamically create the occupied status and the max seat (red and green) 
    // the dynamically generated html will contain the table id as a data attribute and it's occupied status.
    // add a class of "add table" to every html element that is not occupied (red)
    // add event listener for the click of anything with add table, when you click on it then we need to grab ahold of the data-attibute of table id 
    // make a put request to /api/seats/:id to update a specific seat to be occupied
    // change out the client side styling to go from green to red
    // make a post request to /api/orders/seating/:id
    // ADD ROUTE ABOVE
    // when you get back that response from the server there is going to be a new order id associated with it. SET orderID, set seatingId.

    // Do we want to show them all the menu items if they haven't first selected a table?
    // TO VIEW ITEMS (GET request not added to cart)
    // Use ajax method that isn't wrapped in a button click (it happens as soon as the user arrives on the page)
    // ajax method is used to make a get request to the api route for all items /api/item
    // after the request is made and the info is received (we get the information from the menu), we then dynamically create the menu items on the page
    // the dynamically generated html will contain name, price, description, category, add button
    // add unique identifyer (class) to the "addItem" button, also add the data attribute with the corresponding id of that item object.

    // ADD ITEMS TO CART
    // add event listener to anything with the class of add item
    // when the event takes place, we will assign the value of data attribute to data-id to a variable and then we're going to use that variable value to go ahead and make a request.

    $(".addItem").on("click", function (event) {
        event.preventDefault();
        $.post("/api/menu/items/" + id)
        // THIS IS AN EDIT TO AN EXISTING ORDER. I need to grad the table order id and change the add another item to that order.
    })



    // Make a post request with the order id and the item id to add menu item to the specific order.
    // For every request there has to be a response, yes it happened or no it didn't. If it did happen then in the cs JS append to this section of the page. Dynamically generate html for that item, in addition we need to have a quanitity (maybe default 1)
    // For each added item to an order, genreate a button plus symbol whatever)
    // On the plus symbol we'll need a class to hook on to, make another put request to update the cart, we'll need the orderId, the itemId, and the quantity. Return the update order order with new quanitity along with the associated ids.

    // SUBMIT
    // make a request to update an order to complete 
    // remove attributes from the client side storage
    // once the item is closed we need to make a put request to make that seat unoccupied again.
    // consider making a total sale col to add up values and consider API tax stuff.



}
