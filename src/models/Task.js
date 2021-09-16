import { Schema, model } from "mongoose";
var mongoose = require("mongoose");

const taskSchema = new Schema(
  {
    email: {
      // de esta manera puedo dar las condiciones de los parametros
      type: String,
      required: true,
      trim: true, // el trim por ejemplo quita los espacios que trae un parametro de tipo texto
    },
    password: {
      type: String,
      trim: true,
    },
    profile: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false, // Esto para evitar los datos adicionales que se crean como el __V
    timestamps: true, //Cuando creo un nuevo dato van a aparecer las propiedades que aparecen abajo, y asi se la fecha de creacion y actualizacion
    /*  createdAt 
        updateAd */
  }
);

export default model("Task", taskSchema);
