const connection = require('../../config/db');
const fs = require("fs");
const path = require("path");

// Obtener todas las plantas
exports.getAllPlantas = async (req, res) => {
  try {
    const [result] = await connection.query('SELECT * FROM plantas');
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al obtener la lista de plantas");
  }
};

// Obtener planta por id (para info o para editar)
exports.getPlantaById = async (req, res) => {
  const id = req.params.id;

  if (!id){
      return res.status(400).json({message: 'No llego ningún id'});
  }

  try {
    const [result] = await connection.execute(
      `SELECT plantas.*, investigadores.nombre AS nombre_investigador 
       FROM plantas 
       JOIN investigadores ON plantas.id_investigador = investigadores.id_investigador 
       WHERE id_planta = ?`, [id]
    );
    if (result.length === 0) {
      return res.status(404).send("Planta no encontrada");
    }
    const planta = result[0];
    planta.fecha_recoleccion = new Date(planta.fecha_recoleccion).toISOString().split('T')[0];
    planta.fecha_registro = new Date(planta.fecha_registro).toISOString().split('T')[0];
    res.json(planta);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al obtener la planta");
  }
};

exports.updatePlantaById = async (req, res) => {
  try {
    const id = req.params.id;
    const { // Datos limpios
      nombre_cientifico,
      nombre_comun,
      taxon,
      familia,
      colector,
      fecha,
      localidad,
      habitat,
      id_investigador
    } = req.body;


    if (!id){
        return res.status(400).json({message: 'No llego ningún id'});
    }

    const [planta] = await connection.query("SELECT * FROM plantas WHERE id_planta = ?",[id]);
    if (planta.length === 0){
        return res.status(404).json({message: 'El id de la planta no se enceuntra en la base de datos.'});
    }

    // Si llegó un archivo nuevo lo tomamos de multer y eliminamos el anterior, si no usamos el anterior
    if(req.file){
      const imagenAnterior = planta[0].fotografia;
      const rutaBase = path.join(__dirname,"../../");
      const rutaArchivo = path.join(rutaBase,imagenAnterior);
      if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
    }
    const fotografia = req.file ? req.file.path : req.body.fotografia;

    const formattedFecha = new Date(fecha).toISOString().split('T')[0];

    const [result] = await connection.execute(
      `UPDATE plantas SET
         nombre_cientifico   = ?,
         nombre_comun        = ?,
         taxon               = ?,
         familia             = ?,
         colector            = ?,
         fecha_recoleccion   = ?,
         localidad           = ?,
         habitat             = ?,
         fotografia          = ?,
         id_investigador     = ?
       WHERE id_planta = ?`,
      [
        nombre_cientifico,
        nombre_comun,
        taxon,
        familia,
        colector,
        formattedFecha,
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
    console.error(err);
    res.status(500).send("Error al actualizar la planta");
  }
};

exports.createPlanta = async (req, res) => {
  try {
    const fotografia = req.file ? req.file.path : null;
    const { nombre_cientifico, nombre_comun, taxon, familia, colector, fecha, fecha_registro, localidad, habitat, id_investigador } = req.body;

    const formattedFecha = new Date(fecha).toISOString().split('T')[0];
    const formattedFechaRegistro = new Date(fecha_registro).toISOString().split('T')[0];

    const [result] = await connection.execute(
      `INSERT INTO plantas(nombre_cientifico, nombre_comun, taxon, familia, colector, fecha_recoleccion, fecha_registro, localidad, habitat, fotografia, id_investigador)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre_cientifico, nombre_comun, taxon, familia, colector, formattedFecha, formattedFechaRegistro, localidad, habitat, fotografia, id_investigador]
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Planta creada correctamente' });
    } else {
      res.status(500).json({ message: 'Ocurrió un error al crear la planta' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al crear la planta");
  }
};

exports.deletePlanta = async (req, res) => {
    const id = req.params.id;

    if (!id){
        return res.status(400).json({message: 'No llego ningún id'});
    }

    const [planta] = await connection.query("SELECT * FROM plantas WHERE id_planta = ?",[id]);
    if (planta.length === 0){
        return res.status(404).json({message: 'El id de la planta no se enceuntra en la base de datos.'});
    }

    const imagen = planta[0].fotografia;
    const rutaBase = path.join(__dirname,"../../");
    const rutaArchivo = path.join(rutaBase,imagen);
    
    try {
      await connection.query("DELETE FROM plantas WHERE id_planta = ?", [id])
      // Borra el archivo fisico si existe
      if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
      res.json({
          status: true,
          message: 'Planta eliminado con éxito'
      })
    } catch (err) {
        console.error(err);
        res.status(500).send("Ocurrio un error en el servidor al intentar eliminar la planta");
    } 

};

exports.searchPlanta = async (req, res) => {
  const { q } = req.body;

  if (!q) return res.status(400).json({message: 'No llego ningún dato'});

  try {
    const like = `%${q}%`

    console.log("Q: "+like)

    const [rows] = await connection.query(
      `
      SELECT * FROM plantas
      WHERE id_planta LIKE ?
      OR nombre_cientifico LIKE ?
      OR nombre_comun LIKE ?
      OR taxon LIKE ?
      OR familia LIKE ?
      OR colector LIKE ?
      `,
      [like, like, like, like, like, like]
    )

    res.json(rows);

  }catch(err){
    console.error("Error en la búsqueda: ", err);
    res.status(500).json({ menssage: "Error interno en el servidor" });
  }

};