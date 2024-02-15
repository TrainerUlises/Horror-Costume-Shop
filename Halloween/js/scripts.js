function update(itemCode) {
    var quantityId = itemCode + "qty";
    var quantity = parseInt(document.getElementById(quantityId).value) || 0;
    let shoppingCart = new ShoppingCart(getCookie('whoami'));
    shoppingCart.setNumOrdered(itemCode, quantity);
    createCart(); 
}

function deleteItem(itemCode) {
    let shoppingCart = new ShoppingCart(getCookie('whoami'));
    shoppingCart.setNumOrdered(itemCode, 0);
    createCart();  
}

function createCart() {
    var userId = getCookie('whoami');
    var shoppingCart = new ShoppingCart(userId);
    var cartInfo = document.getElementById("info");
    var cartAction = document.getElementById("info2");

    var cartTable = "<table>";
    cartTable += "<tr><th>Product</th><th>Name</th><th>Quantity</th><th>Price</th><th>Subtotal</th><th>Action</th></tr>";

    shoppingCart.getItemsOrdered().forEach(function (item) {
        var quantityId = item.getItemCode() + "qty";
        var image = "<img src='" + item.getItemImage() + "' alt='Product Image' style='max-width: 100px;' />";
        var updateButton = "<input type='button' value='Update' onclick='update(\"" + item.getItemCode() + "\")' />";
        var deleteButton = "<img src='images/x.png' alt='Delete' width='20px' onclick='deleteItem(\"" + item.getItemCode() + "\")' />";

        cartTable += "<tr>";
        cartTable += "<td>" + image + "</td>";
        cartTable += "<td>" + item.getItemName() + "</td>";
        cartTable += "<td><input id='" + quantityId + "' type='text' value='" + item.getNumItems() + "' />" + updateButton + "</td>";
        cartTable += "<td>$" + item.getUnitCost() + "</td>";
        cartTable += "<td>$" + item.getTotalCost() + "</td>";
        cartTable += "<td>" + deleteButton + "</td>";
        cartTable += "</tr>";
    });

    cartTable += "<tr><td colspan='4'>Total</td><td>$" + shoppingCart.getTotalCost() + "</td><td></td></tr>";
    cartTable += "</table>";

    if (shoppingCart.getItemsOrdered().length > 0) {
        cartInfo.innerHTML = cartTable;
        cartAction.innerHTML = "<a href='shipping.html'>Proceed to Shipping</a>";
    } else {
        cartInfo.innerHTML = "<h1>EMPTY CART<br><a href='buyCostumes.html'>Go Back Shopping</a></h1>" +
                             "<h1>EMPTY CART<br><a href='buyProps.html'>Go Back Shopping</a></h1>" +
                             "<h1>EMPTY CART<br><a href='buyMasks.html'>Go Back Shopping</a></h1>";
        cartAction.innerHTML = "";
    }
}