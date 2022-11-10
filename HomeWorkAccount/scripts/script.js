window.onload = function () {
    let elementPassword = document.getElementById('password');
    let elementRepeatPassword = document.getElementById('repeatPassword');
    let arrayTextField = document.getElementsByClassName('account-text-field');
    let checkAgree = document.getElementById('agree');
    let mainButton = document.getElementById('button-singUp');
    let userName = document.getElementById('userName');

    function alertMessage(element, message) {
        alert(message);
        element.focus();
        element.parentElement.style.borderColor = 'red';
    }

    function checkPassword(elementPassword, elementRepeatPassword) {
        if (elementPassword.value.length < 8) {
            alertMessage(elementPassword, 'Пароль должен содержать не менее 8 символов');
            return false;
        }

        if (elementRepeatPassword && elementPassword.value !== elementRepeatPassword.value) {
            alertMessage(elementRepeatPassword, 'Пароли не совпадают');
            return false;
        }
        return true;

    }

    function checkTextField(array) {
        for (let i = 0; i < array.length; i++) {
            let inputField = array[i].lastElementChild;
            if (inputField.value.replace(/\s/g, '') === '') {
                alertMessage(inputField, `Заполните "${array[i].firstElementChild.innerText}"`);
                return false;
            }
        }
        return true;
    }

    function goToLogIn(){
        document.getElementById('main-form-title').innerText = 'Log in to the system';
        let arrayFieldRemove = document.querySelectorAll('.account-field-remove');

        arrayFieldRemove.forEach((item) => {
            item.remove();
        })
        elementPassword.onchange = null;
        mainButton.innerText = 'Sign In';
        mainButton.removeEventListener('click', validateRegistrForm);
        mainButton.addEventListener('click', validateLogInForm);
    }

    function validateRegistrForm () {
        if (!checkTextField(arrayTextField)) {
            return;
        }

        if(!checkPassword(elementPassword, elementRepeatPassword)){
            return;
        }

        if (!checkAgree.checked) {
            alert('Необходимо ваше согласие с условиями');
            return;
        }

        document.getElementById('popup').classList.remove('close');
    }

    function validateLogInForm() {
        if (!checkTextField(arrayTextField)) {
            return;
        } else {
            alert(`Добро пожаловать, ${userName.value}!`);
        }
    }

    document.getElementById('fullName').addEventListener('keydown', function (e) {
        if (!isNaN(parseInt(e.key))) {
            e.preventDefault();
        }
    })

    document.getElementById('userName').onkeydown = (e) => {
        if (e.key === '.' || e.key === ',') {
            return false;
        }
    }

    checkAgree.onclick = function (e) {
        if (e.target.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен');
        }
    }

    mainButton.addEventListener('click', validateRegistrForm);

    for (let i = 0; i < arrayTextField.length; i++) {
        arrayTextField[i].lastElementChild.addEventListener('input', (e) => {
            if (e.target.parentElement.style.borderColor === 'red') {
                e.target.parentElement.style.borderColor = "#C6C6C4";
            }
        })
    }

    elementPassword.onchange = (e) => {
        checkPassword(e.target);
    }

    document.getElementById('button-popup').onclick = (e) => {
        e.target.parentElement.parentElement.classList.add('close');
        for (let i = 1; i < arrayTextField.length; i++) {
            arrayTextField[i].lastElementChild.value = '';
        }
        checkAgree.checked = false;
        goToLogIn();
    }

    document.getElementById('link-account').onclick = goToLogIn;

}