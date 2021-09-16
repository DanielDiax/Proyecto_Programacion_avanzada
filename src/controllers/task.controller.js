import { request } from 'express'
import Task from '../models/Task'

//rastreo todos los datos
export const findGetAllTask = async (req, res)=>{
    try{
        const tasks = await Task.find()
        res.json(tasks)
    }catch(error){
        res.status(500).json({
            message: error.message || "Uups something goes wrong retriving the users"
        })
    }
    
 }

 //creo usuarios
 export const createUser = async (req, res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message: "Email and password cannot be empty"});
    }
    try {
        const newuser = new Task({
            email: req.body.email, 
            password: req.body.password,
            profile: req.body.profile ? req.body.profile : false // compruebo existencia de profile con operador ternario
        });
        const saveuser = await newuser.save();
        console.log(saveuser); // solo de prueba, en teoria se podria dejar desde el await
        res.json('New task created')
    } catch(error){
        res.status(500).json({
            message: error.message || "Uups something goes wrong creating the user"
        })
    }
}

//rastreo un dato por id
export const findOneTask = async (req, res) => {
    const task = await Task.findById(req.params.id)
    console.log(task)
    res.json(task)
}

// Rastreo un dato por email -- falta condicionar la busqueda
export const findOneUser = async (req, res) => {
    const task = await Task.findOne(req.params.email)
    console.log(task);
    res.json(task)
}

//eliminar un dato por metodo delete a travez del parametro id
export const deleteTask = async (req, res)=>{
    const task = await Task.findByIdAndDelete(req.params.id)
    res.json({
        message: " User were deleted successfully"
    });
}

export const findAllTrueUsers = async (req, res) => {// aca busco de nuevo todas las tareas/usuarios pero solo devuelvo los que son true
    const tasks = await Task.find({profile: true})
    res.json(tasks)
}

export const updateUser = async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body) // En este ejemplo se actualiza lo que esta en request params id por lo que se envia desde req.body
    res.json({
        message: " User were updated successfully"
    });
}


