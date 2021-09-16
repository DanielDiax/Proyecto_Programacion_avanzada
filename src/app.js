//aca estoy importando la coneccion con express

import express from "express";
import morgan from "morgan";
import cors from "cors";
import TaskRoutes from "./routes/task.routes";

const app = express();
//settings
app.set("port", process.env.PORT || 3000);

//middlewares
const corsOptions = {} // Esto en caso de que quiera limitar las direcciones con acceso
app.use(cors(corsOptions))
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false})); // Esto en caso de que express resiva una peticion que llegue desde formularios en html desde cualquier app

//routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.use("/api/tasks", TaskRoutes);

export default app;
