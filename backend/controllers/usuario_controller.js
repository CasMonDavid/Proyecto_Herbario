const connection = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [result] = await connection.query('SELECT * FROM investigadores WHERE correo_electronico = ? AND contrasena = ?', [email, password]);
    if (result.length > 0) {
      res.json({ success: true, data: result[0] });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al iniciar sesión");
  }
};

exports.createUser = async (req,res, next)=>{
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
};

exports.editUserById = async (req, res) => {
    const id = req.params.id;
    const { nombre, correo_electronico, contrasena } = req.body;

    if (nombre === undefined || correo_electronico === undefined || contrasena === undefined) {
        return res.status(400).json({ message: 'Faltan campos requeridos en el cuerpo de la solicitud' });
    }
    
    try{
        const [result] = await connection.execute(
            'UPDATE investigadores SET nombre = ?, correo_electronico = ?, contrasena = ?, codigo_acceso = ? WHERE id_investigador = ?',
        [nombre, correo_electronico, contrasena, 123456789, id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Error al actualizar la planta");
    }
}

exports.getUserById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const [result] = await connection.execute("SELECT * FROM investigadores WHERE id_investigador = ?",[id]);
        if (result.length === 0) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.json(result[0]);
    }catch(err){
        console.log(err);
        res.status(500).send("Error al obtener al usuario");
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const [result] = await connection.query('SELECT * FROM investigadores');
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error al obtener la lista de investigadores");
    }
};