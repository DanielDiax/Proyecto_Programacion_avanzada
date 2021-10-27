import { config } from "dotenv";
config();

export default {
  mongodbURL: process.env.MONGODB_URI || "mongodb+srv://jdanieldiax:Hanna.2020_01_01@cluster0.lfvma.mongodb.net/TestDB",
};


//mongodb://localhost/TestDB //Local