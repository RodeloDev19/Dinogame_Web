console.log('Register controller loaded');

document.addEventListener("DOMContentLoaded", () => {
    let boton_register = document.querySelector('#boton_register');

    boton_register.addEventListener('click', (event) => {
        event.preventDefault();
        registrarUsuario();
    });
})

function registrarUsuario() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/register/newUser', true);

    xhr.setRequestHeader('Content-type', 'application/json');

    let data = {
        name: document.querySelector('#name').value,
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
            window.location.href = '/leaderboard';
        }
    };
}