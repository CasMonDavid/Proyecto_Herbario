const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"", //DEBEN PONER SU CONTRASEÑA, SI NO TIENEN DEJENLO COMO ESTA
    database:"herbario"
});

// FUNCION PARA INGRESAR ADMINISTRADORES (no testeado)
app.post("/create",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.query('INSERT INTO administradores(nombre, correo_electronico, contrasena) VALUES(?,?,?)',[name,email,password],
        (err,result)=>{
            if (err){
                console.log(err);
            }else{
                res.send("Administrador registrado con exito!!")
            }
        }
    );
});

app.listen(3001,()=>{
    console.log("Ejecutandose por el puerto 3001")
})