
import Pedidos from "../models/Pedido.js";

export const nuevoPedido = async(req, res, next) => {

    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();
        res.json({msj: "Se agrego un nuevo pedido"})
    } catch (error) {
        console.log(error.message)
        next()
    }
}

export const mostrarPedidos = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos)
    } catch (error) {
        console.log(error.message)
        next();
    }
}

export const mostrarPedido = async(req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    if (!pedido) {
        res.json({msj: "Ese pedido no existe"})
        return next();
    }
    try {
        
        res.json(pedido)
    } catch (error) {
        console.log(error.message)
        next();
    }
}

export const actualizarPedido = async(req, res, next) => {

    try {
        let pedido = await Pedidos.findByIdAndUpdate({_id: req.params.idPedido}, req.body, {new: true}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });

        res.json(pedido);
    } catch (error) {
        console.log(error.message)
        next();
    }
}

export const eliminarPedido = async(req, res, next) => {
    try {
        const pedido = await Pedidos.findByIdAndDelete({ _id: req.params.idPedido})
        res.json({msj: "Pedido eliminado correctamente"})
    } catch (error) {
        console.log(error.message)
        next();
    }
}