document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (!/^[A-Z][a-z]+$/.test(name)) {
        alert('Name must start with an uppercase letter.');
        return;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.(com|in)$/.test(email)) {
        alert('Enter a valid email (e.g., example@domain.com or .in)');
        return;
    }

    // Password validation
    const password = document.getElementById('password').value;
    const passwordStrength = document.getElementById('passwordStrength');
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) 

{
        alert(
            'Password must be at least 8 characters long and include uppercase, lowercase, number, and special symbol.'
        );
        return;
    }
    passwordStrength.textContent = 'Strong password!';

    // Redirect to login page
    window.location.href = 'login.html';
    // window.location.href="./gaming.js";
});
