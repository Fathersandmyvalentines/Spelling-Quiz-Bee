document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("toggle-password");

    // Toggle password visibility
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈"; // Change icon to "hide"
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁️"; // Change icon to "show"
        }
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent page reload

        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value;

        // Retrieve accounts from localStorage
        const accounts = JSON.parse(localStorage.getItem("users")) || {};
        const existingAccount = accounts[username];

        // Check if fields are empty
        if (!username || !password) {
            errorMessage.innerText = "Information required";
            errorMessage.style.color = "red";
            return;
        }

        // Check if username and password are correct
        if (!existingAccount || existingAccount.password !== password) {
            errorMessage.innerText = "Wrong username or password";
            errorMessage.style.color = "red";
        } else {
            errorMessage.innerText = "Login Successful! Redirecting...";
            errorMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = `main.html?user=${username}`;
            }, 2000);
        }
    });
});