document.getElementById('signupForm').addEventListener('submit', function(event) {
    // Stop the form from submitting/refreshing the page immediately
    event.preventDefault();

    // 1. Get Values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const role = document.querySelector('input[name="user_role"]:checked').value;

    // 2. Check if Email ends with @gmail.com
    if (!email.toLowerCase().endsWith("@gmail.com")) {
        alert("Error: Only Gmail accounts are allowed.");
        return;
    }

    // 3. Check Password (8+ chars, Upper & Lower case)
    // Regex breakdown: (?=.*[a-z]) has lowercase, (?=.*[A-Z]) has uppercase, .{8,} at least 8 long
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain both uppercase and lowercase letters.");
        return;
    }

    // 4. Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // 5. Success Logic
    alert("Logged in SUCCESSFULLY!");

    // 6. Redirect based on role
    if (role === "admin") {
        window.location.href = "Admin_Dashboard.html"; // Ensure this file exists
    } else {
        window.location.href = "User_Dashboard.html"; 
    }
});
