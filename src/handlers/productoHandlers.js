import Productos from '../models/Producto.js'
import multer from 'multer';
import { nanoid } from 'nanoid';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';


export const nuevoProducto = async(req, res) => {
    const producto = new Productos(req.body)
    
    try {
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({msj: "Se agrego un nuevo producto"})

    } catch (error) {
        console.log(error.message);
    }
}



//? Configuracion del mulder para subida de archivos 

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const MIMETYPES = ['image/jpeg', 'image/png'];

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: join( CURRENT_DIR, '../../uploads'),
        filename: (req, file, cb) => {
            const fileExtension = extname( file.originalname );
            // const filename = file.originalname.split(fileExtension)[0];
            cb(null, `${nanoid()}${fileExtension}`)
        },
    }),
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes( file.mimetype)) cb(null, true); else cb(new Error('Formato no valido'), false);
        
    },
    limits: {
        fileSize: 10000000
    }
})

// Sube un archivo 
export const subirArchivo = async(req, res, next) => {
    multerUpload.single('imagen')( req, res, (error) => {
        if (error) {
            return res.status(400).json({ msj: error.message }); // Evita múltiples respuestas
        }
        
        next();
    });

}

export const mostrarProductos = async(req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error.message);
        next();
    }
}

export const mostrarProducto = async(req, res, next) => {
    try {
        const producto = await Productos.findById(req.params.idProducto)

        if (!producto) {
            res.json({msj: "Este producto no existe"})
            next();
        }
    
        res.json(producto);

    } catch (error) {
        console.log(error.message)
        next();
    }
}

export const actualizarProducto = async(req, res, next)=> {
    try {

        
        
        let nuevoProducto = req.body;

        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }
        
        const producto = await Productos.findByIdAndUpdate({ _id: req.params.idProducto}, req.body, { new: true});

        res.json(producto)
    } catch (error) {
        console.log(error.message)
        next();
    }
}


export const eliminarProducto = async(req, res, next) => {
    try {
        await Productos.findByIdAndDelete({ _id: req.params.idProducto})

        res.json({msj: "Eliminado correctamente"})
    } catch (error) {
        console.log(error.message)
        next();
    }
}