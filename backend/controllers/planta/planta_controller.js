const connection = require('../../config/db');

exports.getAllPlantas = async (req, res) => {
  try {
    const [result] = await connection.query('SELECT * FROM plantas');
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al obtener la lista de plantas");
  }
};

exports.editPlantaById = async (req, res) => {
    const id = req.params.id;
    const {
      nombre_cientifico,
      nombre_comun,
      taxon,
      familia,
      colector,
      fecha,
      fecha_registro,
      localidad,
      habitat,
      fotografia,
      id_investigador
    } = req.body;

    if (
        !nombre_cientifico || !nombre_comun ||
        !taxon || !familia ||
        !colector || !fecha ||
        !fecha_registro || !localidad ||
        !habitat || !id_investigador
    ) {
        return res.status(400).json({ message: 'Faltan campos requeridos en el cuerpo de la solicitud' });
    }

    try {
        const formattedFecha = new Date(fecha).toISOString().split('T')[0];
        const formattedFechaRegistro = new Date(fecha_registro).toISOString().split('T')[0];
        
        const [result] = await connection.execute(
            `UPDATE plantas SET 
              nombre_cientifico = ?, 
              nombre_comun = ?, 
              taxon = ?, 
              familia = ?, 
              colector = ?, 
              fecha_recoleccion = ?, 
              fecha_registro = ?, 
              localidad = ?, 
              habitat = ?, 
              fotografia = ?, 
              id_investigador = ? 
            WHERE id_planta = ?`,
            [
              nombre_cientifico,
              nombre_comun,
              taxon,
              familia,
              colector,
              formattedFecha,
              formattedFechaRegistro,
              localidad,
              habitat,
              fotografia,
              id_investigador,
              id
            ]
        );

        if (result.affectedRows > 0) {
            res.json({ message: 'Planta actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Planta no encontrada' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al actualizar la planta");
    }
};


exports.getPlantaById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT plantas.*, investigadores.nombre AS nombre_investigador FROM plantas JOIN investigadores ON plantas.id_investigador = investigadores.id_investigador WHERE id_planta = ?",[id]);
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
};

exports.createPlanta = async (req, res) => {
    const id = req.params.id;
    const {nombre_cientifico, nombre_comun, taxon, familia, colector, fecha, fecha_registro, localidad, habitat, id_investigador } = req.body;
    const fotografia = req.file ? req.file.path : null;

    if (
        nombre_cientifico === undefined || nombre_comun === undefined ||
        taxon === undefined || familia === undefined ||
        colector === undefined || fecha === undefined ||
        localidad === undefined || habitat === undefined ||
        fotografia === undefined || id_investigador === undefined
    ) {
        return res.status(400).json({ message: 'Faltan campos requeridos en el cuerpo de la solicitud' });
    }
    
    try{
        //const formattedDate = new Date(fecha).toISOString().split('T')[0];
        const [result] = await connection.execute(
            'INSERT INTO plantas(nombre_cientifico, nombre_comun, taxon, familia, colector, fecha_recoleccion, fecha_registro, localidad, habitat, fotografia, id_investigador) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
        [nombre_cientifico, nombre_comun, taxon, familia, colector, fecha, fecha_registro, localidad, habitat, fotografia, id_investigador]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Planta creada correctamente' });
        } else {
            res.status(404).json({ message: 'Ocurrio un error al momento de crear la planta' });
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Error al crear la planta");
    }
};