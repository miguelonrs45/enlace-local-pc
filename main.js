const { app,BrowserWindow} = require ('electron');
const os = require('os'); // Importar el módulo 'os' para obtener información del sistema
const { ipcMain} = require('electron'); // Importar ipcMain para manejar la comunicación entre procesos

// Importar electron-reload para recargar la aplicación automáticamente
require('electron-reload')
    (__dirname,
    {
    electron: require('path').join(__dirname, 'node_modules', '.bin', 'electron.cmd') // Ruta al ejecutable de Electron
    } 
);

// Definir una función que crea la ventana
function createWindow () {
        const win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
  }
    });
    // Cargar el archivo HTML en la ventana
    win.loadFile('index.html');

}
// Ejecutar la función cuando la app está lista
app.whenReady().then(createWindow);

function getLocalIp(){
    const interfaces = os.networkInterfaces();
    console.log(interfaces);
}
// Llamar a la función para obtener la IP local
getLocalIp();

// Función para obtener la dirección IP de las interfaces de red
// Esta función recorre las interfaces de red y devuelve la primera dirección IPv4 no interna encontrada
function getInterfaces(){
    const interfaces = os.networkInterfaces();
	for (let name in interfaces){
        for (let net of interfaces[name]){
            if (net.family === 'IPv4' && !net.internal) {
                const address = net.address;
                console.log(`Interface: ${name}, Address: ${net.address}`);
                return address;
            }
        }
	}
    return null;
}
// Llamar a la función para obtener las interfaces de red
getInterfaces();

// Creamos una especie de telefono para que cuando en el render neceite la ip llame a este archivo y esta funcion para sacar la ip del backend al frontend    
ipcMain.handle('get-ip', () => {
   const address =  getInterfaces();    
   return address;
})

// Importar express y crear un servidor Express 
const express = require('express');
const appExpress = express();

// Configurar middleware //
// Servir archivos estáticos desde la carpeta public
appExpress.use(express.static('public'));
// Para leer datos JSON automáticamente con UTF-8
appExpress.use(express.json({ charset: 'utf-8' }));
// Para leer datos de formularios con tildes
appExpress.use(express.urlencoded({ extended: true, charset: 'utf-8' }));

const PUERTO = 3000; // Puerto en el que escuchará el servidor Express

appExpress.get('/', (req, res) => {
    res.send('¡Hola! Esta es la app de tu PC, conectada por red local.');
});

appExpress.post('/enviarDatos', (req, res) => {
    // Configurar respuesta como UTF-8
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    console.log('Datos recibidos del móvil:', req.body);
    
    res.json({message: 'Datos recibidos correctamente'});
});

appExpress.listen(PUERTO, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PUERTO}`);
});
