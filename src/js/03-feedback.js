import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formItems = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

formItems.form.addEventListener('submit', onFormSubmit);
formItems.form.addEventListener('input', throttle(onFormInput, 500));

let dataForm = {};

function onFormInput(evt) {
    const { name, value } = evt.target;
    dataForm[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm))
}

function onFormSubmit(evt) {
    evt.preventDefault();
    if (formItems.input.value.trim() === '' || formItems.textarea.value.trim() === '') {
     return alert('Треба заповнити поля');
    }
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(dataForm);
    dataForm = {};
}
refillFields(); 
function refillFields() {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (savedData) {
        const { email, message } = savedData;
        if (email) {
            formItems.input.value = email;
            dataForm.email = email;
        }
        if (message) {
            formItems.textarea.value = message;
            dataForm.message = message
        }
    }
}




