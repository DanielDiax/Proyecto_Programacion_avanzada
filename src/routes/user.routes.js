import { request, Router } from "express";
import * as userCtrl from "../controllers/user.controller";

const router = Router();

// hay que tener en cuenta la posicion de las rutas para que no hagan match,
//es decir todas las que tienen algo mas todas las rutas llevan a api/task/id <--- asi este sea un numero
// o un texto como profile o login el programa creera que todos son id.
// teniendo esto en cuenta las consultas con id deben ir de ultimo

router.get("/", userCtrl.findGetAllUser);

router.get("/:id", userCtrl.findOneUser);

router.get("/:profile", userCtrl.findAllTrueUsers);

router.post("/", userCtrl.createUser);

router.post("/login", userCtrl.findUser);

router.delete("/:id", userCtrl.deleteUser);

router.put("/:id", userCtrl.updateUser);

export default router;
