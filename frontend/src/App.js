import './App.css';
import {useState} from 'react';
import Axios from "axios";
import Menu from "./components/menu/menu"
import DescripcionPP from "./components/descripcionPP/descripcion"
import Mapa from "./components/mapa/mapa"

function App() {

  /*const [name,setName] = useState("");
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
  }*/

  return (
    <div className="App">
      <div className="datos">
        <Menu></Menu>
        <DescripcionPP></DescripcionPP>
        <Mapa></Mapa>
      </div>
    </div>
  );
}

export default App;