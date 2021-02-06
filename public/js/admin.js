// =========================================================================== ADMIN ONLY==========================================================================================
// LOGIN PAGE:
// for login button class = loginSumbit
// What do I want to happen when the person hits the login button?
// I want to send the information to be verified as existing in our user database. If it does exist in our user database, (the credentials are valid) redirect them to the admin members page where

// BUTTON TO SUBMIT LOGIN INFORMATION
$(".loginSubmit").on("click", function (event) {
    event.preventDefault();
    var userData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
    };
    if (!userData.username || !userData.password) {
        return;
    }
    // signUpUser(userData.username, userData.password);
    // usernameInput.val("");
    // passwordInput.val("");
});

// ONCE ON THE MEMBERS PAGE ADMINS SHOWS 

// VIEW ALL TABLE ORDER
$(".viewCustOrders").on("click", function (event) {
    event.preventDefault();
})

$.ajax("/api/main/")

// EDIT MENU BUTTON.
$(".editMenu").on("click", function (event) {
    event.preventDefault();
})

// BUTTON THAT MARKS ORDERS AS COMPLETED
$(".change-completed").on("click", function (event) {
    var id = $(this).data("id");
    var newCompleted = $(this).data("newCompleted");
})
// BUTTON THAT ALLOWS USER TO REVIEW ITEMS BEFORE SUBMITTING. I'll want to display all the orders. 
$(".reviewOrders").on("click", function (event) {
    event.preventDefault();
})
//



