import './App.css';
import {useState} from 'react';
import Axios from "axios";

function App() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const addAdmin = ()=>{
    Axios.post("https://backherbario-production-7369.up.railway.app/create",{
      name:name,
      email:email,
      password:password
    }).then(()=>{
      alert("Sesión iniciada");
    })
  }

  return (
    <div className="App">
      <div className="datos">
        <h1>Herbario</h1><br/>

        <h2>Registrar administrador</h2>

        <label>Nombre: <input
        onChange={(event)=>{
          setName(event.target.value);
        }}
        type="text"></input></label><br/>

        <label>Correo: <input
        onChange={(event)=>{
          setEmail(event.target.value);
        }}
        type="text"></input></label><br/>

        <label>Contraseña: <input
        onChange={(event)=>{
          setPassword(event.target.value);
        }}
        type="password"></input></label><br/>

        <button onClick={addAdmin}>Añadir</button>
      </div>
    </div>
  );
}

export default App;