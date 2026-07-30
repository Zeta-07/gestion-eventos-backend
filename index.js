import express from "express";
import cors from "cors";

import { PORT } from "./config/config.js";
import { sequelize } from "./db/conexion.js";
import { PonenteModel } from "./models/PonenteModel.js";
import ponenteRouter from "./router/ponenteRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", ponenteRouter);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "API Sistema de Gestión de Eventos Universitarios"
    });
});

const main = async () => {

    try {

        await sequelize.authenticate();

        console.log("Base de datos conectada.");

        await sequelize.sync({ alter: false });

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });

    } catch (error) {

        console.log(error);

    }

}

main();