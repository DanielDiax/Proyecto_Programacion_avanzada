import { Schema, model } from "mongoose";
var mongoose = require("mongoose");
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    productBarCode: {
        type: Number,
        required: true,
      },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    storage: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

productSchema.plugin(mongoosePaginate);
export default model("Product", productSchema);
