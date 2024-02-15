const flag = getCookie("flag");

if (flag !== "true") {
    alert("Please log in to access this page.");
    location.href = "login.html";
}
