import { Router } from "express";
import * as productCtrl from "../controllers/products.controller"


const router = Router();


router.get("/searchproducts", productCtrl.findGetAllproducts);

router.post("/searchproductsbyshop", productCtrl.findProductsByShop);

router.post("/newproduct", productCtrl.createProduct);

router.post("/findproduct", productCtrl.findProduct);

router.delete("/deleteproduct/:id", productCtrl.deleteProduct);

router.put("/updateproduct/:id", productCtrl.updateProduct);



export default router;