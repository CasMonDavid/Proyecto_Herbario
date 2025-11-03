const connection = require('../config/db');

exports.create = async (req,res) => { // post localhost:4000/descubrimiento/comentario/crear
    try {
        const contenido = req.body.contenido; // COMENTARIO
        const id_objetivo = req.body.id_objetivo; // ID DEL OBJETIVO descubrimiento o comentario
        const id_investigador = req.body.id_investigador; // ID DEL INVESTIGADOR
        const tipo = req.body.tipo; // TIPO DE OBJETIVO descubrimiento o comentario

        if(tipo === "descubrimiento"){
            const [descubrimiento] = await connection.query("SELECT * FROM descubrimientos_plantas WHERE id = ?",[id_objetivo]);
            if (descubrimiento.length === 0) return res.status(404).json({message: "El descubrimiento vinculado no existe."});
            const [investigador] = await connection.query("SELECT * FROM investigadores WHERE id_investigador = ?",[id_investigador]);
            if (investigador.length === 0) return res.status(404).json({message: "El investigador vinculado no existe."});

            const [result] = await connection.query("INSERT INTO comentarios_descu(comentario, fecha, id_descubrimiento, id_investigador) VALUES(?,NOW(),?,?)",
                                                    [contenido, id_objetivo, id_investigador]);
        }else if(tipo === "comentario"){
            const [comentario] = await connection.query("SELECT * FROM comentarios_descu WHERE id = ?",[id_objetivo]);
            if (comentario.length === 0) return res.status(404).json({message: "El descubrimiento vinculado no existe."});
            const [investigador] = await connection.query("SELECT * FROM investigadores WHERE id_investigador = ?",[id_investigador]);
            if (investigador.length === 0) return res.status(404).json({message: "El investigador vinculado no existe."});

            const [result] = await connection.query("INSERT INTO comentarios_descu(comentario, fecha, id_comentario_padre, id_investigador) VALUES(?,NOW(),?,?)",
                                                    [contenido, id_objetivo, id_investigador]);
        }else {
            res.status(404).send("Tipo de objetivo no encontrado: debe de ser llenado como [descubrimiento] o [comentario]");
        }

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

exports.delete = async (req,res) => { // get localhost:4000/descubrimiento/comentario/delete
    try {
        const id_comentario = req.body.id_comentario;
        const id_investigador = req.body.id_investigador;

        const [investigador] = await connection.query("SELECT * FROM investigadores WHERE id_investigador = ?",[id_investigador]);
        if (investigador.length === 0) return res.status(404).json({message: "El investigador vinculado no existe."});
        const [comentario] = await connection.query("SELECT * FROM comentarios_descu WHERE id = ? AND id_investigador = ?",[id_comentario, id_investigador]);
        if (comentario.length === 0) return res.status(404).json({message: "No se encontró ningún comentario ligado al investigador."});

        await connection.query("DELETE FROM comentarios_descu WHERE id = ? AND id_investigador = ?",[id_comentario, id_investigador]);

        res.status(200).json({});
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Ocurrio un error en el servidor al querer eliminar el comentario");
    }
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

exports.getByIdDescubrimiento = async (req,res) => { // get localhost:4000/descubrimiento/comentario/getByIdDescubrimiento/:id
    try {
        const id = req.params.id;

        const [descubrimiento] = await connection.query("SELECT * FROM descubrimientos_plantas WHERE id = ?",[id]);
        if (descubrimiento.length === 0) return res.status(404).json({message: "No se encontró el descubrimiento."});

        const [comentarios] = await connection.query(
            `
                WITH RECURSIVE todos_comentarios AS (
                    SELECT 
                    c.id, 
                    c.comentario, 
                    c.id_comentario_padre,
                    i.nombre AS autor
                    FROM comentarios_descu AS c
                    INNER JOIN investigadores AS i 
                    ON c.id_investigador = i.id_investigador
                    WHERE c.id_descubrimiento = ?

                    UNION ALL

                    SELECT 
                    h.id,
                    h.comentario,
                    h.id_comentario_padre,
                    i2.nombre AS autor
                    FROM comentarios_descu AS h
                    INNER JOIN investigadores AS i2 
                    ON h.id_investigador = i2.id_investigador
                    INNER JOIN todos_comentarios AS tc 
                    ON tc.id = h.id_comentario_padre
                )
                SELECT * FROM todos_comentarios ORDER BY id ASC;
            `,
            [id]
        );


        // ---- Convertimos los resultados en árbol ----
        const mapa = {};
        comentarios.forEach(c => {
            mapa[c.id] = { 
                id: c.id,
                comentario: c.comentario,
                autor: c.autor,
                id_comentario_padre: c.id_comentario_padre,
                respuestas: []
            };
        });

        const arbol = [];

        comentarios.forEach(c => {
        if (c.id_comentario_padre) {
            mapa[c.id_comentario_padre]?.respuestas.push(mapa[c.id]);
        } else {
            arbol.push(mapa[c.id]);
        }
        });

        if (comentarios.length === 0){
            return res.status(200).json({});
        }else{
            res.status(200).json(arbol);
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).send("Ocurrio un error en el servidor al querer buscar los comentarios del descubrimiento.");
    }
};