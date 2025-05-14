const express = require("express");
const connection = require("../config/db");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const plantaController = require('../controllers/planta/planta_controller');
const habitatController = require('../controllers/planta/caracteristicas/habitat_controller');
const colectorController = require('../controllers/planta/caracteristicas/colector_controller');
const familiaController = require('../controllers/planta/caracteristicas/familia_controller');
const localidadController = require('../controllers/planta/caracteristicas/localidad_controller');

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
// ENVIADO AL CONTROLADOR
app.get("/familia/:id", familiaController.getFamiliasById);
// ENVIADO AL CONTROLADOR
app.get("/colector/:id", colectorController.getColectorById);

app.get("/localidad/:id", localidadController.getLocalidadById);

// ENVIADO AL CONTROLADOR
app.get("/habitat/:id", habitatController.getHabitatById);
// ENVIADO AL CONTROLADOR
app.get("/usuarioedit/:id", usuarioController.getUserById);

// ENVIADO AL CONTROLADOR* redundante
app.get("/plantasadmin/getall", plantaController.getAllPlantas);

app.get("/administrarusuarios/getall", usuarioController.getAllUsers);

//NO ESTA EN USO, ENVIADO AL CONTROLADOR
app.get("/getfamilias", familiaController.getAllFamilias);

app.put('/editar/:id', plantaController.editPlantaById);

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