const connection = require('../../../config/db');

exports.getHabitatById = async (req, res, next) => {
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
};