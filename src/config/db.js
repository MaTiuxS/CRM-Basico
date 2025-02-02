import mongoose from "mongoose";

export const connectDB = async() => {
    
    try {
        const { connection } = await mongoose.connect('mongodb://127.0.0.1:27017/CRM')

        console.log(`Conectado a la Base de datos ${ connection.host } : ${ connection.port }`)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}