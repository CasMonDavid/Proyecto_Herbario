const connection = require('../config/db');

exports.createAdmin = async (req,res, next)=>{
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
};