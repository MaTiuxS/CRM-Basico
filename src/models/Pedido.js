import mongoose, { Schema } from "mongoose";

const PedidoSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    }, 
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

const Pedidos = mongoose.model('Pedidos', PedidoSchema );

export default Pedidos;