console.log('Modificar controller loaded');

document.addEventListener("DOMContentLoaded", () => {
    let boton_mod = document.querySelector('#boton_mod');

    boton_mod.addEventListener('click', (event) => {
        event.preventDefault();
        registrarUsuario();
    });
})

function registrarUsuario() {
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3000/modificar/changeUser', true);

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
        }
    };
}