// Configuraciones basicas de coneccion al servidor 

import  mongoose  from "mongoose";
import config from './config'

(async () =>{
    try{
        const db = await mongoose.connect(config.mongodbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false, // Esto es para corregir un error al realizar el put en las peticiones.
        })
        console.log('database is connected to:', db.connection.name)
    }catch(error){
        console.error(error)
    }

    
})();