document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const errorMessage = document.getElementById("error-message");

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
        const verifyPassword = document.getElementById("verify-password").value;

        // Custom validation message
        let errors = [];

        if (!username) errors.push("Username is required.");
        if (!password) errors.push("Password is required.");
        if (!verifyPassword) errors.push("Verify Password is required.");
        if (password && verifyPassword && password !== verifyPassword) {
            errors.push("Passwords do not match.");
        }

        // Check if username already exists
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username]) {
            errors.push("Username is already taken.");
        }

        // Display errors or proceed
        if (errors.length > 0) {
            errorMessage.innerHTML = errors.join("<br>"); // Show errors
            errorMessage.style.color = "red";
        } else {
            // Store user in localStorage
            users[username] = { password };
            localStorage.setItem("users", JSON.stringify(users));

            // Success message
            errorMessage.innerHTML = "Sign-up successful! Redirecting...";
            errorMessage.style.color = "green";

            setTimeout(() => {
                window.location.href = "sbqlogin.html"; // Redirect to login page
            }, 2000);
        }
    });
});