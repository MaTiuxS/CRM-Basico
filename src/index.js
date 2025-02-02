import server from './server.js';

const port = 5000

server.listen( port, () => {
    console.log(`Servidor conectado en el puerto: ${ port }`)
})

