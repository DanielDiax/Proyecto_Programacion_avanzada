import { request, Router } from "express";
import * as taskCtrl from "../controllers/task.controller";

const router = Router();

// hay que tener en cuenta la posicion de las rutas para que no hagan match,
//es decir todas las que tienen algo mas todas las rutas llevan a api/task/id <--- asi este sea un numero
// o un texto como profile o login el programa creera que todos son id.
// teniendo esto en cuenta las consultas con id deben ir de ultimo

router.get("/", taskCtrl.findGetAllTask);

router.get("/:profile", taskCtrl.findAllTrueUsers);

router.post("/", taskCtrl.createUser);

router.post("/:login", taskCtrl.findOneUser);

router.get("/:id", taskCtrl.findOneTask);

router.delete("/:id", taskCtrl.deleteTask);

router.put("/:id", taskCtrl.updateUser);

export default router;
