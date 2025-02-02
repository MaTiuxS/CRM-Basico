import { Router } from 'express';
import { nuevoCliente, mostrarClientes, mostrarCliente, actualizarCliente, eliminarCliente } from '../handlers/clienteHandlers.js';

import { nuevoProducto, subirArchivo, mostrarProductos, mostrarProducto, actualizarProducto, eliminarProducto } from '../handlers/productoHandlers.js'

import { nuevoPedido, mostrarPedidos, mostrarPedido, actualizarPedido, eliminarPedido } from '../handlers/pedidoHandlers.js'

const router = Router();

//* Clientes
router.post('/clientes', nuevoCliente)

router.get('/clientes', mostrarClientes )

router.get('/clientes/:idCliente', mostrarCliente )

router.put('/clientes/:idCliente', actualizarCliente)

router.delete('/clientes/:idCliente', eliminarCliente)

//* Productos
router.post('/productos', 
    subirArchivo,
    nuevoProducto 
)
router.get('/productos', mostrarProductos )
router.get('/productos/:idProducto', mostrarProducto )
router.put('/productos/:idProducto', subirArchivo, actualizarProducto )
router.delete('/productos/:idProducto', eliminarProducto )


//* Pedidos
router.post('/pedidos', nuevoPedido )
router.get('/pedidos', mostrarPedidos )
router.get('/pedidos/:idPedido', mostrarPedido )
router.put('/pedidos/:idPedido', actualizarPedido )
router.delete('/pedidos/:idPedido', eliminarPedido )

export default router