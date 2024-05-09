console.log('Login controller loaded');

document.addEventListener("DOMContentLoaded", () => {
    let boton_login = document.querySelector('#boton_login');

    boton_login.addEventListener('click', (event) => {
        event.preventDefault();
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
            document.getElementById('error-message').textContent = xhr.responseText;
        } else {
            const response = (xhr.responseText);
            const data = JSON.parse(response);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem("username", data.username);
            window.location.href = '/index';
        }
    };

    xhr.onerror = () => {
        // Manejo de errores de red u otros errores técnicos
        document.getElementById('error-message').textContent = 'Error en la conexión con el servidor';
    };
}