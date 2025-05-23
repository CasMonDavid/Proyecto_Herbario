const connection = require('../config/db');

exports.createPost = async (req, res) => {
    const { nombre, latitud, longitud, descripcion, fecha, usuario_id } = req.body;
    const fotografia = req.file ? req.file.filename : null;

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
            status: true,
            message: 'Error al registrar el descubrimiento'
        })
    }
}

exports.editPost = async (req, res) => {

};

exports.getPostById = async (req, res) => {

};

exports.getPostAll = async (req, res) => {
    try {
        const [descubrimientos] = await connection.query('SELECT * FROM descubrimientos_plantas');
        res.json(descubrimientos);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: true,
            message: 'Error al obtener los descubrimientos'
        })
    }
};

exports.deletePost = async (req, res) => {

};