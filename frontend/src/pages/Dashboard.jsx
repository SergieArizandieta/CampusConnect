import React, {useState,useEffect} from "react";
import Filter from "../components/Filter";
import DialogCreate from "../components/DialogCreate";
import Cards from "../components/Cards";

export default  function Dashboard() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [value, setValue] = useState('5');
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('http://localhost:4200/publicaciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(function (response) {
      if (response.status === 200) {
        return response.json().then(function (data) {
          setPublicaciones(data.publicaciones);
          console.log(data.publicaciones);
        });
      } 
      response.json().then(function (data) {
        alert(data.msg);
      });
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });

  }, [])

  return (
   <div className="container">
   <div className="sidebar">
     <Filter value={value} setValue={setValue} setName={setName} />
   </div>
   <div className="main">
    <DialogCreate/>
    {
      publicaciones.map((publicacion) => {
        if(value === "1" && publicacion.tipo === 1){
          return <Cards publicacion={publicacion} key={publicacion.id_publicacion}/>
        }else if(value === "2" && publicacion.tipo === 2){
          return <Cards publicacion={publicacion} key={publicacion.id_publicacion}/>
        }else if(value === "3" && publicacion.tipo === 1 && publicacion.nombre.toLowerCase().includes(name.toLowerCase())){
          return <Cards publicacion={publicacion} key={publicacion.id_publicacion}/>
        }else if(value === "4" && publicacion.tipo === 2 && publicacion.nombre.toLowerCase().includes(name.toLowerCase())){
          return <Cards publicacion={publicacion} key={publicacion.id_publicacion}/>
        }else if(value === "5"){
          return <Cards publicacion={publicacion} key={publicacion.id_publicacion}/>
        }
        return null;
      })
    }

   </div>
 </div>
  );
}

