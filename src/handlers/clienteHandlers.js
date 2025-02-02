import Clientes from "../models/Clientes.js";


export const nuevoCliente = async(req, res, next) => {
    
    try {
        const cliente = new Clientes(req.body);
 
        await cliente.save();
    
        res.json({ msj: "Se agrego un nuevo cliente"});
        
    } catch (error) {
        console.log(error.message)
    }
    
}

export const mostrarClientes = async(req, res) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes)
    } catch (error) {
        console.log(error.message)
    }
}

export const mostrarCliente = async(req, res, next) => {
    
    try {
        const cliente = await Clientes.findById(req.params.idCliente);
        
        if (!cliente) {
            res.json({msj: "Este cliente no existe"})
            next();
        }
    
        res.json(cliente)
        
    } catch (error) {
        console.log(error.message)
    }
}

export const actualizarCliente = async(req, res) => {
 
    try {
        const cliente = await Clientes.findByIdAndUpdate({ _id: req.params.idCliente }, req.body, {
            new: true
        });

        res.json(cliente)

    } catch (error) {
        console.log(error.message)
    }
}

export const eliminarCliente = async(req, res) => {

    try {
        const cliente = await Clientes.findByIdAndDelete({ _id: req.params.idCliente})

        res.json({msj: "El cliente se elimino"})
    } catch (error) {
        console.log(error.message)
    }
}