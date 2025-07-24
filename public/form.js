// Este script se ejecuta cuando el formulario es enviado
// y evita que la página se recargue al enviar el formulario.
// Recogo los datos del formulario con id 'dataForm', y creo un evento cuando se manda el formulario   
const socket = io();
const form = document.getElementById('dataForm');

form.addEventListener('submit', function(event){
    event.preventDefault(); // Evita que la página se recargue
    
    // Recojo los datos del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    console.log('Datos del formulario:', formData);

    // Enviar los datos al servidor
    // fetch('/enviarDatos', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Respuesta del servidor:', data);
    //     // Aquí podrías mostrar un mensaje de éxito al usuario
    //     // Por ejemplo: alert('¡Mensaje enviado correctamente!');
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     // Aquí podrías mostrar un mensaje de error al usuario
    //     // Por ejemplo: alert('Error al enviar el mensaje');
    // });
    // Emitir los datos al servidor usando Socket.IO
    socket.emit('datos-tiempo-real', formData);
    console.log('Datos enviados en tiempo real:', formData);
});