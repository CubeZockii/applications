document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form"); // Falsche ID vorher: "admin-login"

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value; // Falsche ID vorher: "admin-user"
        const password = document.getElementById("password").value; // Falsche ID vorher: "admin-pass"

        // Feste Login-Daten
        const ADMIN_USER = "DualAdmin";
        const ADMIN_PASS = "G8v#Zp3q!Xr";

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            localStorage.setItem("isAdmin", "true");
            window.location.href = "dashboard.html" ; // Weiterleitung zum Admin-Bereich
        } else {
            document.getElementById("error-message").innerText = "Invalid username or password!";
        }
    });
});
