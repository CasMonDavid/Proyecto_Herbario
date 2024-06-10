const express = require("express");
const connection = require("../config/db");
const router = express.Router();
const port = process.env.PORT || 3001;

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

module.exports = router;