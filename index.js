import express from "express";
import cors from "cors";

import { PORT } from "./config/config.js";
import { sequelize } from "./db/conexion.js";

// Modelos
import "./models/PonenteModel.js";
import "./models/EstadoEventoModel.js";
import "./models/TipoEventoModel.js";
import "./models/EspacioModel.js";
import "./models/CategoriaModel.js";
import "./models/OrganizadorModel.js";
import "./models/EstadoEspacioModel.js";
import "./models/EventoModel.js";

// Seeders
import { tipoEventoSeed } from "./seeders/tipoEventoSeed.js";
import { estadoEventoSeed } from "./seeders/estadoEventoSeed.js";
import { estadoEspacioSeed } from "./seeders/estadoEspacioSeed.js";

// Routers
import ponenteRouter from "./routes/PonenteRouter.js";
import espacioRouter from "./routes/EspacioRouter.js";
import categoriaRouter from "./routes/CategoriaRouter.js";
import organizadorRouter from "./routes/OrganizadorRouter.js";
import eventoRouter from "./routes/EventoRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", ponenteRouter);
app.use("/api", espacioRouter);
app.use("/api", categoriaRouter);
app.use("/api", organizadorRouter);
app.use("/api", eventoRouter);

// Ruta principal
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
    console.error(error);
  }
};

main();