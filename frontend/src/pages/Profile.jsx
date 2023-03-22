
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EditPerfil from "../components/EditPerfil";
import AsignarCurso from "../components/AsignarCurso";
import Aprobados from "../components/Aprobados";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Profile() {
  const { carnet } = useParams()

  const perfil = cookies.get('usuario');
  const [EsMiPerfil, setEsMiPerfil] = useState(false);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [cursosAprobados, setCursosAprobados] = useState([]);

  const [nombres, setNombres] = useState("Juan");
  const [apellidos, setApellidos] = useState("Perez");
  const [correo, setCorreo] = useState("a@mail.com");
  const [password, setPassword] = useState("123456");

  const [nombresOriginales, setNombresOriginales] = useState("Juan");
  const [apellidosOriginales, setApellidosOriginales] = useState("Perez");
  const [correoOriginales, setCorreoOriginales] = useState("");
  const [passwordOriginales, setPasswordOriginales] = useState("");

  const registro_academico = carnet;

  const [edit, setEdit] = useState(false);
  const [codigo, setCodigo] = useState("");

  //handle para cunado hablite y desahbilite la edicion
  const handleEdit = (update = true) => {
    console.log("edit")
    setEdit(!edit);
    if (update && edit) {
      console.log("set originales")
      setNombres(nombresOriginales);
      setApellidos(apellidosOriginales);
      setCorreo(correoOriginales);
      setPassword(passwordOriginales);
    }
  }

  //Submit para cambiar valores de perfil
  const handleSubmmit = (e) => {
    console.log("submit")
    console.log(e.target[0].value)

    let data = {
      registro_academico: registro_academico,
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      password: password,
    }

    fetch(`http://localhost:4200/actualizar_usuario`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.status === 200) {
          return response.json().then(function (data) {
            alert(data.msg);
            handleEdit(false);
            setNombresOriginales(nombres);
            setApellidosOriginales(apellidos);
            setCorreoOriginales(correo);
            setPasswordOriginales(password);
          });
        }
        response.json().then(function (data) {
          alert(data.msg);
          handleEdit();
        });
      }
      )
      .catch((error) => {
        console.error('Error al actulizar person', error);
      });


  }

  //obtener el valor del combobox
  const handleChange = (event) => {
    setCodigo(event.target.value);
  }

  //Submit para asignar curso
  const handleSubmmit2 = (e) => {
    e.preventDefault();
    // console.log("submit2")
    // console.log(e.target[0].value)

    let data = {
      registro_academico: perfil.registro_academico,
      codigo: e.target[0].value
    }

    fetch(`http://localhost:4200/inscribir_curso`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.status === 200) {
          return response.json().then(function (data) {
            alert(data.msg);
            window.location.reload();
          });
        }
        response.json().then(function (data) {
          alert(data.msg);
        });
      }
      )
      .catch((error) => {
        console.error('Error al asignar curso', error);
      }
      );
  }

  useEffect(() => {

    // console.log(carnet, ' - ', perfil.registro_academico);
    if (perfil.registro_academico === parseInt(carnet)) {
      setEsMiPerfil(true);
    }

    //--------------------Obtener datos de usuario--------------------
    fetch(`http://localhost:4200/usuario/${carnet}`)
      .then(function (response) {
        if (response.status === 200) {
          return response.json().then(function (data) {
            // console.log(data.datos[0]);
            // console.log(data.datos[0].nombres);
            // console.log(data.datos[0].apellidos);
            // console.log(data.datos[0].correo);
            // console.log(data.datos[0].password);

            setNombres(data.datos[0].nombres);
            setApellidos(data.datos[0].apellidos);
            setCorreo(data.datos[0].correo);
            setPassword(data.datos[0].password);

            setNombresOriginales(data.datos[0].nombres);
            setApellidosOriginales(data.datos[0].apellidos);
            setCorreoOriginales(data.datos[0].correo);
            setPasswordOriginales(data.datos[0].password);

          });
        }
        response.json().then(function (data) {
          // alert(data.msg);
          setNoEncontrado(true);
        });
      })
      .catch((error) => {
        console.error('Error al obtener datos de usuario', error);
      });

    //--------------------Obtener cursos --------------------
    fetch(`http://localhost:4200/cursos`)
      .then(function (response) {
        if (response.status === 200) {
          return response.json().then(function (data) {
            // console.log(data.cursos);
            setCursos(data.cursos);
          });
        }
        response.json().then(function (data) {
          alert(data.msg);
        });
      }
      )
      .catch((error) => {
        console.error('Error al obtener crusos', error);
      });

    //--------------------Obtener cursos aprobados --------------------
    fetch(`http://localhost:4200/cursos_aprobados/${carnet}`)
      .then(function (response) {
        if (response.status === 200) {
          return response.json().then(function (data) {
            // console.log(data.cursos_ganados);
            setCursosAprobados(data.cursos_ganados);
          });
        }
        response.json().then(function (data) {
          setCursosAprobados([]);
        });
      })
      .catch((error) => {
        console.error('Error al obtener aprobados de usuario', error);
      });


  }, [carnet, perfil.registro_academico])

  function encontrado(){
    if(noEncontrado){
      return(
        <div className="nofound">

        </div>
      )
    }else{
      return(
        <center>

        <EditPerfil
          registro_academico={registro_academico}
          nombres={nombres}
          apellidos={apellidos}
          correo={correo}
          password={password}
          edit={edit}
          EsMiPerfil={EsMiPerfil}
          setNombres={setNombres}
          setApellidos={setApellidos}
          setCorreo={setCorreo}
          setPassword={setPassword}
          handleSubmmit={handleSubmmit}
          handleEdit={handleEdit}
        />

        {EsMiPerfil &&
          <AsignarCurso
            handleSubmmit2={handleSubmmit2}
            codigo={codigo}
            handleChange={handleChange}
            cursos={cursos}
          />
        }

       <Aprobados cursosAprobados={cursosAprobados} carnet={carnet}/>
       <br /><br /><br />
      </center>
      )
    }
  }

  return (
    <>
      {encontrado()}
     
    
    </>
  );
}
