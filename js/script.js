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


    // Switch to Sign Up
    toSignUpBtn.addEventListener('click', () => {

        signInForm.classList.add('hidden');
        signUpForm.classList.remove('hidden');

        signInHero.classList.add('hidden');
        signUpHero.classList.remove('hidden');

        lucide.createIcons();
    });


    // Switch to Sign In
    toSignInBtn.addEventListener('click', () => {

        signUpForm.classList.add('hidden');
        signInForm.classList.remove('hidden');

        signUpHero.classList.add('hidden');
        signInHero.classList.remove('hidden');

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

});