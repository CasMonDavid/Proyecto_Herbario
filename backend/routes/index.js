const express = require("express");
const connection = require("../config/db");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

//local: http://localhost:3000
//railway: https://proyectoherbario-production.up.railway.app

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}
app.use(cors(corsOption));
app.use(express.json());

app.get("/", (req, res) => {
    res.send({msg:"Hola mundo!"});
});

app.get("/plantas/getall", async (req, res, next) => {
    try {
        const [result] = await connection.query('SELECT * FROM plantas');
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener la lista de plantas");
    }
});

app.get("/editar/:id", async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT * FROM plantas WHERE id_planta = ?",[id]);
        if (result.length === 0) {
            return res.status(404).send("Planta no encontrada");
        }
        const planta = result[0];
        planta.fecha_recoleccion = new Date(planta.fecha_recoleccion).toISOString().split('T')[0];
        res.json(planta);
    }catch(err){
        console.log(err);
        res.status(500).send("Error al obtener la planta");
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

app.get("/getfamilias", async (req, res, next) => {
    try {
        const [result] = await connection.query('SELECT * FROM familias');
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener la lista de plantas");
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

app.post('/registrarplanta', async (req, res) => {
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
            'INSERT INTO plantas(numero_catalago, id_ocurrencia, nombre_cientifico, nombre_comun, taxon, id_familia, id_colector, fecha_recoleccion, id_localidad, id_habitat, fotografia, id_investigador) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
        [numero_catalogo, id_ocurrencia, nombre_cientifico, nombre_comun, taxon, id_familia, id_colector, fecha, id_localidad, id_habitat, fotografia, id_investigador]);

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

app.post("/iniciarsesion/investigador", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const [result] = await connection.query('SELECT * FROM investigadores WHERE correo_electronico = ? AND contrasena = ?', [email, password]);
        if (result.length > 0) {
            res.json({ success: true, data: result[0] });
        } else {
            res.json({ success: false });
        }
    } catch(err) {
        console.log(err);
        res.status(500).send("Error al iniciar sesión");
    }
});

app.post("/registrar/user",async (req,res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const [result] = await connection.query('INSERT INTO investigadores(nombre, correo_electronico, contrasena, codigo_acceso) VALUES(?,?,?,?)',[name,email,password,123456789]);
        res.send("Investigador registrado con éxito!!");
    }catch(err) {
        console.log(err);
        res.status(500).send("Error al registrar administrador");
    }

});

app.post("/createAdmin",async (req,res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const [result] = await connection.query('INSERT INTO administradores(nombre, correo_electronico, contrasena) VALUES(?,?,?)',[name,email,password]);
        res.send("Administrador registrado con éxito!!");
    }catch(err) {
        console.log(err);
        res.status(500).send("Error al registrar administrador");
    }

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

module.exports = app;