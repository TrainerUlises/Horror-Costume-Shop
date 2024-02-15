const flag = getCookie("flag");

const menuContainer = document.createElement("div");
menuContainer.setAttribute("id", "menu");

if (flag === "true") {
    appendMenuItem("logoff.html", "Logoff");
} else {
    appendMenuItem("login.html", "Login");
}

appendMenuItem("about.html", "About");
appendMenuItem("products.html", "Product List");
appendMenuItem("contact.html", "Contact Us");

document.body.appendChild(menuContainer);

function appendMenuItem(href, text) {
    const menuItem = document.createElement("a");
    menuItem.setAttribute("href", href);
    menuItem.setAttribute("class", "menu-item");
    menuItem.innerText = text;

    const tableData = document.createElement("td");
    tableData.setAttribute("width", "100");
    tableData.setAttribute("align", "center");

    tableData.appendChild(menuItem);
    menuContainer.appendChild(tableData);
}
