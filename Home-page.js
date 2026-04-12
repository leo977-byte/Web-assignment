document.addEventListener('DOMContentLoaded', function() {

    function checkLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loginLink = document.querySelector('#nav-links a:first-child');

        if (loginLink && loggedInUser) {
            loginLink.innerHTML = `<i class="fa-solid fa-circle-user"></i> <span>Welcome, ${loggedInUser}</span>`;

            const signUpLink = document.querySelector('#nav-links a:last-child');

            if (signUpLink) {
                signUpLink.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> <span>Logout</span>`;
                signUpLink.href = '#';

                signUpLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('loggedInUser');
                    showNotification('👋 You have been logged out successfully!');
                    setTimeout(() => location.reload(), 1000);
                });
            }
        }
    }

    function showNotification(message) {
        let notification = document.querySelector('.notification');
        if (notification) notification.remove();

        notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e8D8C4;
            color: black;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }


    // Welcome notification on page load
    window.addEventListener('load', function() {
        showNotification('✨ Welcome to Piece of Cake! ✨');
    });

     checkLoginStatus();
});