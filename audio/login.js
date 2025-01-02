document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Email validation
    const email = document.getElementById('loginEmail').value.trim(); // Corrected ID
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.(com|in)$/.test(email)) {
        alert('Enter a valid email (e.g., example@domain.com or .in)');
        return;
    }

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (!/^[a-z]+$/.test(name)) {
        alert('Name must start with an uppercase letter.');
        return;
    }

    // Redirect to another page
    window.location.href = './gaming.html';
});





