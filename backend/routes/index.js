const express = require("express");
const connection = require("../config/db");
const router = express.Router();

const cors = require("cors");

router.use(cors());
router.use(express.json());

// FUNCION PARA INGRESAR ADMINISTRADORES (no testeado)
router.post("/create",async (req,res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const [result] = await connection.query('INSERT INTO administradores(nombre, correo_electronico, contrasena) VALUES(?,?,?)',[name,email,password],
        (err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.send("Administrador registrado con exito!!")
            }
        }
    );
});

module.exports = router;