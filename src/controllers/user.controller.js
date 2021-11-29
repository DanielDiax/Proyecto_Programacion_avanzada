import User from "../models/Users.model";
import { getPagination } from "../libs/getPagination"; // se importa la funcion de paginacion 

//rastreo todos los datos
export const findAllUser = async (req, res) => {
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
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user){
      let response = {
        message: 'The Email is already in use.',
        icon: 'warning'
      }
      res.json(response);
    }
    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      password: req.body.password,
      profile: req.body.profile == "true" ? req.body.profile : false, // compruebo existencia de profile con operador ternario
      shopName: req.body.shopName
    });
    const saveuser = await newuser.save();
    console.log(saveuser); // solo de prueba, en teoria se podria dejar desde el await
    let response = {
      message: 'New user created',
      icon: 'success'
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message|| "Uups something goes wrong creating the user",
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
    console.log(user)
    if(!user){
      console.log("This Email does not exist.");
      res.json("This Email does not exist.");
    }else{
      let response = [];
      response.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          country: user.country,
          city: user.city,
          profile: user.profile,
          shopName: user.shopName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        })
      console.log(response);
      res.json(response);
    }
    if(user == null){
      res.json("No hay datos.");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong searching the user",
    });
  }
};

//eliminar un dato por metodo delete a travez del parametro id
export const deleteUser = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      res.json("This User does not exist.");
      console.log("This User does not exist.");
    }else{
      const { id } = req.params;
      const detelted = await User.findByIdAndDelete(id);
      console.log(detelted);
      res.json({
      message: " User were deleted successfully",
    });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || `Cannot delete user with id: ${id}`,
    });
  }
};

export const findAllTrueUsers = async (req, res) => {
  // aca busco de nuevo todas los usuarios pero solo devuelvo los que son true
  try {
    //const {profile} = req.body;
    const users = await User.find({profile: true});
    if(!users){
      console.log("Don't have sellers.");
      res.json("Don't have sellers.");
    }else{
      let response = [];
        users.forEach(element => {
          response.push({
            _id: element._id,
            name: element.name,
            email: element.email,
            country: element.country,
            city: element.city,
            profile: element.profile,
            shopName: element.shopName,
            createdAt: element.createdAt,
            updatedAt: element.updatedAt
          })
        });
      res.json(response);
    }
    if(users == null){
      res.json("No hay datos.");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong searching the user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {id} = req.body;
    const user = await User.findOne({id});
    console.log(user)
    if(!user){
      res.json({message: "This user does not exist."});
    }else{
      await User.findByIdAndUpdate(req.params.id, req.body); // En este ejemplo se actualiza lo que esta en request params id por lo que se envia desde req.body
      res.json({
      message: " User were updated successfully",
      });
    }
    
  } catch (error) {
    res.status(500).json({
      message: error.message || "Uups something goes wrong searching the user",
    });
  }
};
