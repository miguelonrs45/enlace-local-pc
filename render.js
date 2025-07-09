const {ipcRenderer} = require('electron');
const qrcode = require('qrcode');

// Obtener el elemento HTML donde se mostrará la IP
const ipDiv = document.getElementById('ipDisplay');
const qrCanvas = document.getElementById('qrCanvas');

ipcRenderer.invoke('get-ip').then((ip) =>{
    console.log('La Ip es ', ip);
    // Mostrar la IP en el elemento HTML
    ipDiv.textContent = `Tu IP local es: ${ip}`;

    // Generar el código QR con la IP
    const urlConPuerto = `http://${ip}:3000`;
    qrcode.toCanvas(qrCanvas, urlConPuerto, function (error) {
        if (error) {
            console.error('Error generando el código QR:', error);
        } else {
            console.log('Código QR generado con éxito');
            console.log('El código generado en el canvas es: ', urlConPuerto);
        }
    });
});
