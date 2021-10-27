import Product from "../models/Products.models";
import { getPagination } from "../libs/getPagination"; // se importa la funcion de paginacion 


//rastreo todos los datos
export const findGetAllproducts = async (req, res) => {
    try {
      console.log("Ruta ok")
      // se crea el query, que es como un parametro extra de la url. Por lo tanto lo primero es extraer los valores a travez del query siendo size = limit, page = offset
      const { page, size } = req.query; 
      //El getPagination recibe el size y el page y devuelve un limit y un offset, para validar si devuelve algo.
      const { limit, offset } = getPagination(page, size);
      const product = await Product.paginate({}, { offset, limit });
      res.json({
        totalItems: product.totalDocs,
        products: product.docs,
        TotalPages: product.totalPages,
        currentPage: product.page - 1
      }); 
      console.log(req.query);
      console.log(product);
    } catch (error) {
      res.status(500).json({
        message: error.message || "Uups something goes wrong retriving the users",
      });
    }
  };

  //creo producto
export const createProduct = async (req, res) => {
    try {
      const {productBarCode} = req.body;
      const product = await Product.findOne({productBarCode});
      if (!productBarCode) {
        res.json("Please Write Barcode.");
      }else{
        if(product){
            res.json("This Barcode was already created");
        }else{
        const newproduct = new Product({
        productBarCode: req.body.productBarCode,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        price: req.body.price,
        storage: req.body.storage,
        });
        const saveproduct = await newproduct.save();
        console.log(saveproduct); // solo de prueba, en teoria se podria dejar desde el await
        res.json("New product created");
        }
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || "Uups something goes wrong creating the product",
      });
    }
  };

  export const findProduct = async (req, res) => {
    try {
      const {productBarCode} = req.body;
      const product = await Product.findOne({productBarCode});
      console.log(product)
      if(!product){
        res.json("This product does not exist.");
      }else{
        let response = [];
        response.push({
            _id: product._id,
            productBarCode: product.productBarCode,
            productName: product.productName,
            productDescription: product.productDescription,
            price: product.price,
            storage: product.storage,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
          })
        console.log(response);
        res.json(response);
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || "Uups something goes wrong searching the user",
      });
    }
  };
  

  //Elimino producto por ID
  export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.body;
        const product = await Product.findOne({id});
        if(!id){
            res.json("This product does not exist.");
        }else{
            const { id } = req.params;
            const detelted = await Product.findByIdAndDelete(id);
            console.log(detelted);
            res.json({
            message: "Product were deleted successfully",
            });
        }
    } catch (error) {
      res.status(500).json({
        message: error.message || `Cannot delete user with id: ${id}`,
      });
    }
  };

  export const updateProduct = async (req, res) => {
    try {
        const {id} = req.body;
        const product = await Product.findOne({id});
        console.log(product)
        if(!product){
            res.json("This product does not exist.");
        }else{
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({
        message: " Product were updated successfully",
        });
      }
      
    } catch (error) {
      res.status(500).json({
        message: error.message || "Uups something goes wrong searching the user",
      });
    }
  };