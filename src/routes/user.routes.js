import { request, Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import {validateCreateUser,validateEliminateUser, validateUpdateUser, validateOneUser } from '../validators/user.validator'

import * as validations from "../validators/user.validator"
/* import {validateCreateUser} from ('../validators/user.validator') */

const router = Router();

// hay que tener en cuenta la posicion de las rutas para que no hagan match,
//es decir todas las que tienen algo mas todas las rutas llevan a api/users/id <--- asi este sea un numero
// o un texto como profile o login el programa creera que todos son id.
// teniendo esto en cuenta las consultas con id deben ir de ultimo

router.get("/", userCtrl.findAllUser);

router.post("/user", userCtrl.findOneUser);

router.get("/sellerprofile", userCtrl.findAllTrueUsers);

router.post("/",validateCreateUser, userCtrl.createUser);

router.post('/login',validateOneUser, userCtrl.findUser);

router.delete("/:id", userCtrl.deleteUser);

router.put("/update/:id",validateUpdateUser, userCtrl.updateUser);

export default router;
