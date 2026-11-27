document.addEventListener('DOMContentLoaded', () => {

    // Initialize Icons
    lucide.createIcons();

    // Elements
    const signInForm = document.getElementById('signin-form-box');
    const signUpForm = document.getElementById('signup-form-box');

    const signInHero = document.getElementById('hero-signin-content');
    const signUpHero = document.getElementById('hero-signup-content');

    const toSignUpBtn = document.getElementById('to-signup-btn');
    const toSignInBtn = document.getElementById('to-signin-btn');

    // Role Selection
    const signInRole = document.getElementById('signin-role');
    const signUpRole = document.getElementById('signup-role');

    // Inputs
    const signInEmail = document.getElementById('signin-email');
    const signInPassword = document.getElementById('signin-password');

    const signUpName = document.getElementById('signup-name');
    const signUpEmail = document.getElementById('signup-email');
    const signUpPassword = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('confirm-password');


    // Switch to Sign Up
    toSignUpBtn.addEventListener('click', () => {

        signInForm.classList.add('hidden');
        signUpForm.classList.remove('hidden');

        signInHero.classList.add('hidden');
        signUpHero.classList.remove('hidden');

        signUpRole.value = signInRole.value;

        lucide.createIcons();
    });


    // Switch to Sign In
    toSignInBtn.addEventListener('click', () => {

        signUpForm.classList.add('hidden');
        signInForm.classList.remove('hidden');

        signUpHero.classList.add('hidden');
        signInHero.classList.remove('hidden');

        signInRole.value = signUpRole.value;

        lucide.createIcons();
    });


    // Show / Hide Password
    const toggleButtons = document.querySelectorAll('.toggle-password-btn');

    toggleButtons.forEach(button => {

        button.addEventListener('click', () => {

            const targetId = button.getAttribute('data-target');
            const input = document.getElementById(targetId);

            if (input.type === 'password') {
                input.type = 'text';
                button.innerHTML = '<i data-lucide="eye"></i>';
            } else {
                input.type = 'password';
                button.innerHTML = '<i data-lucide="eye-off"></i>';
            }

            lucide.createIcons();
        });

    });


    // Get Saved Users
    function getUsers() {
        return JSON.parse(localStorage.getItem('chronicare-users')) || [];
    }


    // Sign Up
    signUpForm.querySelector('form').addEventListener('submit', (event) => {

        event.preventDefault();

        const name = signUpName.value.trim();
        const email = signUpEmail.value.trim().toLowerCase();
        const password = signUpPassword.value;
        const confirm = confirmPassword.value;
        const role = signUpRole.value;

        // Check Password
        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }

        // Get Users
        const users = getUsers();

        // Check if Email Exists
        const emailExists = users.some(user => user.email.toLowerCase() === email);

        if (emailExists) {
            alert('This email is already registered. Please Sign In.');
            return;
        }

        // Create Account
        const newUser = {
            name: name,
            email: email,
            password: password,
            role: role
        };

        users.push(newUser);

        localStorage.setItem('chronicare-users', JSON.stringify(users));

        alert('Account created successfully! Please Sign In.');

        // Switch to Sign In
        signUpForm.classList.add('hidden');
        signInForm.classList.remove('hidden');

        signUpHero.classList.add('hidden');
        signInHero.classList.remove('hidden');

        // Fill Email and Role
        signInEmail.value = email;
        signInRole.value = role;
        signInPassword.value = '';
        // Reset Sign Up Form
        signUpForm.querySelector('form').reset();

        lucide.createIcons();

    });


    // Sign In
    signInForm.querySelector('form').addEventListener('submit', (event) => {

        event.preventDefault();

        const email = signInEmail.value.trim().toLowerCase();
        const password = signInPassword.value;
        const role = signInRole.value;

        const users = getUsers();

        // Find Account
        const user = users.find(account =>
            account.email === email &&
            account.password === password &&
            account.role === role
        );

        // Check Account
        if (!user) {
            alert('Incorrect email, password, or account type!');
            return;
        }

        // Save Logged In User
        localStorage.setItem('chronicare-current-user', JSON.stringify({
            name: user.name,
            email: user.email,
            role: user.role
        }));

        // Redirect Based on Role
        if (user.role === 'patient') {
            window.location.href = 'patient-portal.html';
        } else if (user.role === 'doctor') {
            window.location.href = 'doctor-portal.html';
        }

    });

});

