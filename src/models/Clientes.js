import mongoose, {Schema } from "mongoose";

const clienteSchema = new Schema({
    nombre: {
        type: String, 
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    telefono: {
        type: String,
        trim: true
    }
})

const Clientes = mongoose.model('Clientes', clienteSchema)


export default Clientes