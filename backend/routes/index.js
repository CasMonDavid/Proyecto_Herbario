const express = require("express");
const connection = require("../config/db");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const plantaController = require('../controllers/planta/planta_controller');
const usuarioController = require('../controllers/usuario_controller');
const administradorController = require('../controllers/admin_controller')

//local: http://localhost:3000
//railway: https://proyectoherbario-production.up.railway.app

const corsOption = {
    origin: 'https://proyectoherbario-production.up.railway.app',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOption));
app.use(express.json());

app.get("/", (req, res) => {
    res.send({msg:"Hola mundo!"});
});

// ENVIADO AL CONTROLADOR
app.get("/plantas/getall", plantaController.getAllPlantas);
// ENVIADO AL CONTROLADOR
app.get("/editar/:id", plantaController.editPlantaById);
// ENVIADO AL CONTROLADOR
app.get("/informacion/:id", plantaController.getPlantaById);

app.get("/familia/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT * FROM familias WHERE id_familia = ?",[id]);
        if (result.length === 0) {
            return res.status(404).send("Planta no encontrada");
        }
        res.json(result[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Error al obtener la planta");
    }
});

app.get("/colector/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT * FROM colector WHERE id_colector = ?",[id]);
        if (result.length === 0) {
            return res.status(404).send("Planta no encontrada");
        }
        res.json(result[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Error al obtener la planta");
    }
});

app.get("/localidad/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT * FROM localidad WHERE id_localidad = ?",[id]);
        if (result.length === 0) {
            return res.status(404).send("Planta no encontrada");
        }
        res.json(result[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Error al obtener la planta");
    }
});

app.get("/habitat/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT * FROM habitat WHERE id_habitat = ?",[id]);
        if (result.length === 0) {
            return res.status(404).send("Planta no encontrada");
        }
        res.json(result[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Error al obtener la planta");
    }
});

app.get("/usuarioedit/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT * FROM investigadores WHERE id_investigador = ?",[id]);
        if (result.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.json(result[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Error al obtener al usuario");
    }
});

app.get("/plantasadmin/getall", async (req, res, next) => {
    try {
        const [result] = await connection.query('SELECT * FROM plantas');
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener la lista de plantas");
    }
});

app.get("/administrarusuarios/getall", async (req, res, next) => {
    try {
        const [result] = await connection.query('SELECT * FROM investigadores');
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener la lista de investigadores");
    }
});

//NO ESTA EN USO
app.get("/getfamilias", async (req, res, next) => {
    try {
        const [result] = await connection.query('SELECT * FROM familias');
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener la lista de familias");
    }
});

app.put('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const { numero_catalogo, id_ocurrencia, nombre_cientifico, nombre_comun, taxon, id_familia, id_colector, fecha, id_localidad, id_habitat, fotografia, id_investigador } = req.body;

    if (
        numero_catalogo === undefined || id_ocurrencia === undefined ||
        nombre_cientifico === undefined || nombre_comun === undefined ||
        taxon === undefined || id_familia === undefined ||
        id_colector === undefined || fecha === undefined ||
        id_localidad === undefined || id_habitat === undefined ||
        fotografia === undefined || id_investigador === undefined
    ) {
        return res.status(400).json({ message: 'Faltan campos requeridos en el cuerpo de la solicitud' });
    }
    
    try{
        const formattedDate = new Date(fecha).toISOString().split('T')[0];
        const [result] = await connection.execute(
            'UPDATE plantas SET numero_catalago = ?, id_ocurrencia = ?, nombre_cientifico = ?, nombre_comun = ?, taxon = ?, id_familia = ?, id_colector = ?, fecha_recoleccion = ?, id_localidad = ?, id_habitat = ?, fotografia = ?, id_investigador = ? WHERE id_planta = ?',
        [numero_catalogo, id_ocurrencia, nombre_cientifico, nombre_comun, taxon, id_familia, id_colector, fecha, id_localidad, id_habitat, fotografia, id_investigador, id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Planta actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Planta no encontrada' });
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Error al actualizar la planta");
    }
});

// ENVIADO AL CONTROLADOR
app.put('/usuarioedit/:id', usuarioController.editUserById);

// ENVIADO AL CONTROLADOR
app.post('/registrarplanta', plantaController.createPlanta);

// ENVIADO AL CONTROLADOR
app.post("/iniciarsesion/investigador", usuarioController.login);

// ENVIADO AL CONTROLADOR
app.post("/registrar/user", usuarioController.createUser);

//NO ESTA EN USO, ENVIADO AL CONTROLADOR
app.post("/createAdmin", administradorController.createAdmin);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

module.exports = router;