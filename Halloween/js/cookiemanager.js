function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000 * days));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

function addCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000 * days));
    var expires = "expires=" + d.toUTCString();
    var qty = parseInt(getCookie(name)) || 0;
    value = qty + 1;
    document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

function getCookie(name) {
    var x = document.cookie.split("; ");
    for (var i = 0; i < x.length; i++) {
        var y = x[i].split("=");
        if (y[0] == name) return y[1];
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

