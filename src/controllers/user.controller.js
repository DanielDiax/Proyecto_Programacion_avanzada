import User from "../models/Users.model";
import { getPagination } from "../libs/getPagination"; // se importa la funcion de paginacion 

//rastreo todos los datos
export const findGetAllUser = async (req, res) => {
  try {
    // se crea el query, que es como un parametro extra de la url. Por lo tanto lo primero es extraer los valores a travez del query siendo size = limit, page = offset
    const { page, size } = req.query; 
    //El getPagination recibe el size y el page y devuelve un limit y un offset, para validar si devuelve algo.
    const { limit, offset } = getPagination(page, size);

    const users = await User.paginate({}, { offset, limit });
    res.json({
      totalItems: users.totalDocs,
      users: users.docs,
      TotalPages: users.totalPages,
      currentPage: users.page - 1
    }); 
    console.log(req.query);
    console.log(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong retriving the users",
    });
  }
};

//creo usuarios
export const createUser = async (req, res) => {
  try {
    const newuser = new User({
      email: req.body.email,
      password: req.body.password,
      profile: req.body.profile ? req.body.profile : false, // compruebo existencia de profile con operador ternario
    });
    const saveuser = await newuser.save();
    console.log(saveuser); // solo de prueba, en teoria se podria dejar desde el await
    res.json("New user created");
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong creating the user",
    });
  }
};

//rastreo un dato por id
export const findOneUser = async (req, res) => {
  try {
    const {id} = req.body;
    const user = await User.findOne({id});
    console.log(user);
    let response = [];
    response.push({
        _id: user._id,
        email: user.email,
        profile: user.profile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })
    console.log(response);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong searching the user",
    });
  }
};

// Rastreo un dato por email
export const findUser = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    console.log(user);
    let response = [];
    response.push({
        _id: user._id,
        email: user.email,
        profile: user.profile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      })
    console.log(response);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong searching the user",
    });
  }
};

//eliminar un dato por metodo delete a travez del parametro id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const detelted = await User.findByIdAndDelete(id);
    console.log(detelted);
    res.json({
      message: " User were deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || `Cannot delete user with id: ${id}`,
    });
  }
};

export const findAllTrueUsers = async (req, res) => {
  // aca busco de nuevo todas las tareas/usuarios pero solo devuelvo los que son true
  try {
    const users = await User.find({ profile: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong searching the user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body); // En este ejemplo se actualiza lo que esta en request params id por lo que se envia desde req.body
    res.json({
      message: " User were updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong searching the user",
    });
  }
};
