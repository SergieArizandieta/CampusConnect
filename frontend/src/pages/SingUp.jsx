import React from 'react';
import { AppBar, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo_azul.png'

export default function SingUp() {

   const handleSubmit = (e) => {
      e.preventDefault();
  
      console.log(e.target[0].value);
      console.log(e.target[2].value);
      console.log(e.target[4].value);
      console.log(e.target[6].value);
      console.log(e.target[8].value);

      let data = {  
         registro_academico: e.target[0].value,
         nombres: e.target[2].value,
         apellidos: e.target[4].value,
         password: e.target[6].value,
         correo: e.target[8].value
      }

      const json = JSON.stringify(data);

      fetch(`http://localhost:4200/registro`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: json
      }).then(function (response) {
         return response.json();
      }
      ).then(function (data) {
         alert(data.msg);
      }
      );
   }

   return (
      <div className="singup">
         <img src={logo} height="15%" alt='logo' />
         <br />
         <AppBar position="static" style={{ width: "36.9%", borderRadius: "0%", marginBottom: "-1.7%" }}>
            <center>
               <SchoolIcon />
            </center>
         </AppBar>

         <Paper style={{ width: "37%", paddingTop: "1.5%", paddingBottom: "2%" }} elevation={10} >

            <center>
               <Typography variant="h5" component="h1" >
                  Registrate
               </Typography>
               <br />
               <Divider />
               <div>
                  <form onSubmit={handleSubmit} >
                     <TextField id="outlined-basic" label="Registro Academico" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />
                     <TextField id="outlined-basic" label="Nombres" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />
                     <TextField id="outlined-basic" label="Apellidos" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />
                     <TextField id="outlined-basic" label="Contraseña" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />
                     <TextField id="outlined-basic" label="Correo Electronico" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />
                     <Link to="/SingIn" >
                        <Typography style={{ fontSize: 11.5, textAlign: 'left', marginLeft: "10%", marginTop: "4.5%", marginBottom: "2%" }}>
                           ¿Ya tienes una cuenta?
                        </Typography>
                     </Link>

                     <Button variant="contained" style={{ width: "80%", marginTop: "2%" }} type="submit" >Registrarme</Button>

                  </form>

                  <br />

               </div>

            </center>
         </Paper>
      </div>
   );
}

