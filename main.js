const { app,BrowserWindow} = require ('electron');
const os = require('os'); // Importar el módulo 'os' para obtener información del sistema
const { ipcMain} = require('electron'); // Importar ipcMain para manejar la comunicación entre procesos
const http = require('http'); // Importar el módulo http para crear un servidor HTTP
const { Server } = require('socket.io'); // Importar Socket.IO para la comunicación en tiempo real

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

const path = require('path');
// Ruta para servir el archivo HTML principal
// Esta ruta se usa para servir el archivo index.html cuando se accede a la raíz del servidor
// path.join(): Construye rutas de archivos correctamente
// __dirname: Variable especial = directorio actual del archivo
// 'public': Carpeta dentro del directorio actual
// 'index.html': Archivo dentro de la carpeta public
appExpress.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

appExpress.post('/enviarDatos', (req, res) => {
    // Configurar respuesta como UTF-8
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    console.log('Datos recibidos del móvil:', req.body);
    
    res.json({message: 'Datos recibidos correctamente'});
});

// Crear un servidor HTTP usando Express
// Esto permite que Socket.IO funcione correctamente con Express
const server = http.createServer(appExpress);

// Esscuchando usando el servidor HTTP en el puerto especificado
server.listen(PUERTO, () => {
    console.log(`Servidor HTTP escuchando en http://localhost:${PUERTO}`);
})
// Crear una instancia de Socket.IO y asociarla al servidor HTTP
const io = new Server(server);

// Manejar eventos de conexión y desconexión de Socket.IO
// io: Servidor completo → Solo escucha nuevas 'connection'
// socket: Conexión específica → Puede escuchar su propio 'disconnect'
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado', socket.id);
    });
    // Escuchar el evento 'datos-tiempo-real' enviado desde el cliente
    socket.on('datos-tiempo-real', (data) => {
    console.log('Datos recibidos en tiempo real:', data);
    // Aquí podrías procesar los datos recibidos en tiempo real
    });
});
