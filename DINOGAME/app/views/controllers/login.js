console.log('Login controller loaded');

document.addEventListener("DOMContentLoaded", () => {
    let boton_login = document.querySelector('#boton_login');

    boton_login.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Login button clicked');
        validarLogin();
    });
})

function validarLogin() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/login/validate', true);

    xhr.setRequestHeader('Content-type', 'application/json');

    let data = {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value
    };

    let jsonData = JSON.stringify(data);

    xhr.send(jsonData);

    xhr.onload = () => {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            let response = (xhr.responseText);
            console.log(response);
        }
    };
}