const connection = require('../config/db');

exports.create = async (req,res) => { // post localhost:4000/descubrimiento/comentario/crear
    try {
        const contenido = req.body.contenido; // COMENTARIO
        const id_descubrimiento = req.body.id_descubrimiento; // ID DEL DESCUBRIMIENTO
        const id_investigador = req.body.id_investigador; // ID DEL INVESTIGADOR

        const [descubrimiento] = await connection.query("SELECT * FROM descubrimientos_plantas WHERE id = ?",[id_descubrimiento]);
        if (descubrimiento.length === 0) return res.status(404).json({message: "El descubrimiento vinculado no existe."});
        const [investigador] = await connection.query("SELECT * FROM investigadores WHERE id_investigador = ?",[id_investigador]);
        if (investigador.length === 0) return res.status(404).json({message: "El investigador vinculado no existe."});

        const [result] = await connection.query("INSERT INTO comentarios_descu(comentario, fecha, id_descubrimiento, id_investigador) VALUES(?,NOW(),?,?)",
                                                [contenido, id_descubrimiento, id_investigador]);
        res.status(200).send("Comentario registrado con éxito!!");
    }catch (err){
        console.log(err);
        res.status(500).send("Ocurrio un error en el servidor al querer crear el comentario");
    }

};

exports.update = async (req,res) => { // put localhost:4000/descubrimiento/comentario/actualizar
    try {
        const id_comentario = req.body.id_comentario; // ID COMENTARIO
        const id_investigador = req.body.id_investigador; // ID INVESTIGADOR
        const contenido = req.body.contenido; // COMENTARIO
        

        const [comentario] = await connection.query("SELECT * FROM comentarios_descu WHERE id = ?",[id_comentario]);
        if (comentario.length === 0) return res.status(404).json({message: "El comentario vinculado no existe."});
        const [investigador] = await connection.query("SELECT * FROM investigadores WHERE id_investigador = ?",[id_investigador]);
        if (investigador.length === 0) return res.status(404).json({message: "El investigador vinculado no existe."});
        const [autoria] = await connection.query("SELECT * FROM comentarios_descu WHERE id = ? AND id_investigador = ?",[id_comentario, id_investigador]);
        if (autoria.length === 0) return res.status(404).json({message: "Error: no puedes editar un comentario con otro investigador que no sea el dueño."});

        const [result] = await connection.query("UPDATE comentarios_descu SET comentario = ? WHERE id = ?",
                                                [contenido, id_comentario]);
        res.status(200).send("Comentario actualizado con éxito!!");

    } catch (error) {
        console.log(err);
        res.status(500).send("Ocurrio un error en el servidor al querer actualizar el comentario");
    }
};

exports.delete = async (req,res) => {
    
};

exports.getById = async (req,res) => { // get localhost:4000/descubrimiento/comentario/getbyid/:id
    try {
        const id = req.params.id;

        const [comentario] = await connection.query("SELECT * FROM comentarios_descu WHERE id = ?",[id]);
        if (comentario.length === 0) return res.status(404).json({message: "No se encontró ningún comentario."});

        res.status(200).json(comentario[0]);
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Ocurrio un error en el servidor al querer buscar el comentario");
    }
    
};

exports.getByIdDescubrimiento = async (req,res) => {
    
};