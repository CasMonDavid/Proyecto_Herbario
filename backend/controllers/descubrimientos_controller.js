const connection = require('../config/db');

exports.createPost = async (req, res) => {
    const { nombre, latitud, longitud, descripcion, usuario_id } = req.body;
    const fotografia = req.file ? req.file.filename : null;
    const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        await connection.query(
            'INSERT INTO descubrimientos_plantas (nombre, latitud, longitud, descripcion, fecha, usuario_id, fotografia) VALUES (?,?,?,?,?,?,?)',
            [nombre, latitud, longitud, descripcion, fecha, usuario_id, fotografia]
        );
        res.json({
            status: true,
            message: 'Descubrimiento realizado con éxito'
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: 'Error al registrar el descubrimiento'
        })
    }
}

exports.updatePost = async (req, res) => {
    const id = req.params.id;
    const { nombre, latitud, longitud, descripcion } = req.body;
    const fotografia = req.file && req.file.filename ? req.file.filename : req.body.fotografia;

    let query = `UPDATE descubrimientos_plantas SET nombre = ?, latitud = ?, longitud = ?, descripcion = ?`;
    let params = [nombre, latitud, longitud, descripcion];

    if (req.file) {
        query += `, fotografia = ?`;
        params.push(req.file.filename);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    try {
        const [result] = await connection.execute(query, params);

        if (result.affectedRows > 0) {
            res.json({ message: 'Descubrimiento actualizado correctamente' });
        } else {
            res.status(404).json({message: 'Error al actualizar el descubrimiento'});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al intentar actualizar el descubrimiento");
    }

};

exports.getPostById = async (req, res) => {
    try {
        const id = req.params.id;

        const [descubrimiento] = await connection.execute('SELECT * FROM descubrimientos_plantas WHERE id = ?', [id]);
        if (descubrimiento.length === 0) {
            return res.status(404).send("Descubrimiento no encontrado");
        }
        res.json(descubrimiento[0]);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: 'Error al obtener el descubrimiento'
        })
    }
};

exports.getPostAll = async (req, res) => {
    try {
        const [descubrimientos] = await connection.query('SELECT * FROM descubrimientos_plantas');
        res.json(descubrimientos);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: 'Error al obtener los descubrimientos'
        })
    }
};

exports.deletePost = async (req, res) => {
    const id = req.params.id;

    if (!id){
        return res.status(400).json({message: 'No llego ningún id'});
    }

    try {
        await connection.query("DELETE FROM descubrimientos_plantas WHERE id = ?", [id])
        res.json({
            status: true,
            message: 'Descubrimiento eliminado con éxito'
        })
    } catch (err) {
        console.error(err);
        res.status(500).send("Ocurrio un error en el servidor al intentar eliminar el descubrimiento");
    }
};