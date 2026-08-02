import express from "express";
import cors from "cors";

import { PORT } from "./config/config.js";
import { sequelize } from "./db/conexion.js";

import { PonenteModel } from "./models/PonenteModel.js";
import { EstadoEventoModel } from "./models/EstadoEventoModel.js";
import { TipoEventoModel } from "./models/TipoEventoModel.js";

import { tipoEventoSeed } from "./seeders/tipoEventoSeed.js";
import { estadoEventoSeed } from "./seeders/estadoEventoSeed.js";
import { estadoEspacioSeed } from "./seeders/estadoEspacioSeed.js";

import ponenteRouter from "./routes/PonenteRouter.js";
import categoriaRouter from "./routes/CategoriaRouter.js";
import organizadorRouter from "./routes/OrganizadorRouter.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", ponenteRouter);
app.use("/api", categoriaRouter);
app.use("/api", organizadorRouter);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "API Sistema de Gestión de Eventos Universitarios",
  });
});

const main = async () => {
  try {
    await sequelize.authenticate();

    console.log("Base de datos conectada.");

    await sequelize.sync({ alter: false });

    await tipoEventoSeed();
    await estadoEventoSeed();
    await estadoEspacioSeed();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
