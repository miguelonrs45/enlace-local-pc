// Este script se ejecuta cuando el formulario es enviado
// y evita que la página se recargue al enviar el formulario.
// Recogo los datos del formulario con id 'dataForm', y creo un evento cuando se manda el formaulario   
// para que no se recargue la página.
const form = document.getElementById('dataForm');

form.addEventListener('submit', function(event){
    event.preventDefault(); // Evita que la página se recargue
    // Recogo los datos del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    console.log('Datos del formulario:', formData);


});