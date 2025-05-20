const connection = require('../../../config/db');

exports.getAllFamilias = async (req, res, next) => {
    try {
        const [result] = await connection.query('SELECT * FROM familias');
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener la lista de familias");
    }
};

exports.getFamiliasById = async (req, res, next) => {
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
};