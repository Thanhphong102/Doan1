const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click',()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click',()=> {
    wrapper.classList.remove('active');
});



document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.register form');
    const usernameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const passwordInput = form.querySelectorAll('input[type="password"]')[0];
    const confirmPasswordInput = form.querySelectorAll('input[type="password"]')[1];
    const genderInputs = form.querySelectorAll('input[name="gender"]');
    const termsCheckbox = form.querySelector('input[type="checkbox"]');
    const submitButton = form.querySelector('.btn');

    // Helper function to display error messages
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.innerText = message;
        input.classList.add('error');
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.remove();
        }
        input.classList.remove('error');
    }

    // Real-time validation for each field
    usernameInput.addEventListener('input', function () {
        if (!usernameInput.value.trim()) {
            showError(usernameInput, 'Trường này không được bỏ trống.');
        } else if (usernameInput.value.length < 10 || usernameInput.value.length > 40) {
            showError(usernameInput, 'Tên đăng nhập phải có từ 10 đến 40 ký tự.');
        } else {
            clearError(usernameInput);
        }
    });

    emailInput.addEventListener('input', function () {
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Trường này không được bỏ trống.');
        } else if (!emailInput.value.endsWith('@gmail.com')) {
            showError(emailInput, 'Email phải có đuôi là @gmail.com.');
        } else {
            clearError(emailInput);
        }
    });

    passwordInput.addEventListener('input', function () {
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Trường này không được bỏ trống.');
        } else if (passwordInput.value.length > 10) {
            showError(passwordInput, 'Mật khẩu phải có tối đa 10 ký tự.');
        } else {
            clearError(passwordInput);
        }
    });

    confirmPasswordInput.addEventListener('input', function () {
        if (!confirmPasswordInput.value.trim()) {
            showError(confirmPasswordInput, 'Trường này không được bỏ trống.');
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'Mật khẩu nhập lại không khớp.');
        } else {
            clearError(confirmPasswordInput);
        }
    });

    genderInputs.forEach(gender => {
        gender.addEventListener('change', function () {
            if ([...genderInputs].some(input => input.checked)) {
                clearError(genderInputs[0]);
            }
        });
    });

    termsCheckbox.addEventListener('change', function () {
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'Vui lòng đồng ý với các điều khoản và điều kiện.');
        } else {
            clearError(termsCheckbox);
        }
    });

    // Validate all fields on submit
    form.addEventListener('submit', function (e) {
        let valid = true;

        // Check if any field is empty
        [usernameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            if (input.value.trim() === '') {
                showError(input, 'Trường này không được bỏ trống.');
                valid = false;
            }
        });

        // Check specific field requirements
        if (usernameInput.value.length < 10 || usernameInput.value.length > 40) {
            showError(usernameInput, 'Tên đăng nhập phải có từ 10 đến 40 ký tự.');
            valid = false;
        }

        if (!emailInput.value.endsWith('@gmail.com')) {
            showError(emailInput, 'Email phải có đuôi là @gmail.com.');
            valid = false;
        }

        if (passwordInput.value.length > 10) {
            showError(passwordInput, 'Mật khẩu phải có tối đa 10 ký tự.');
            valid = false;
        }

        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'Mật khẩu nhập lại không khớp.');
            valid = false;
        }

        const genderSelected = [...genderInputs].some(input => input.checked);
        if (!genderSelected) {
            showError(genderInputs[0], 'Vui lòng chọn giới tính.');
            valid = false;
        }

        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'Vui lòng đồng ý với các điều khoản và điều kiện.');
            valid = false;
        }

        if (!valid) {
            e.preventDefault();
        } else {
            alert("Đăng ký thành công!");
        }
    });
});
