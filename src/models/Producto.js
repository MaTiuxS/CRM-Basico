import mongoose, { Schema } from "mongoose";


const ProductoSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    }
})


const Productos = mongoose.model('Productos', ProductoSchema )

export default Productos;