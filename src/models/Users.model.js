import { Schema, model } from "mongoose";
var mongoose = require("mongoose");
import  mongoosePaginate  from "mongoose-paginate-v2";

const userSchema = new Schema(
  {
    email: {
      // de esta manera puedo dar las condiciones de los parametros
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true, // el trim por ejemplo quita los espacios que trae un parametro de tipo texto
    },
    password: {
      type: String,
      trim: true,
    },
    profile: {
      type: Boolean,
      /* required: false, */
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

userSchema.plugin(mongoosePaginate);
export default model("User", userSchema);
