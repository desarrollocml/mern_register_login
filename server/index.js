require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

//Coneccion a Base de Datos
connection();

//middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Escuchando puerto ${port}`));
