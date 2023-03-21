import React from 'react';
import { AppBar, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import logo from '../imgs/logo_azul.png'
import { Link } from 'react-router-dom';

export default function ResetPass() {

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target[0].value);
      console.log(e.target[2].value);
      
      let data = {
         registro_academico: e.target[0].value,
         correo: e.target[2].value
      }

      const json = JSON.stringify(data);

      fetch(`http://localhost:4200/reposicion_password`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: json
      }).then(function (response) {
         return response.json();
      }).then(function (data) {
         alert(data.msg);
      });
   }

   return (
      <div className="singin">
         <img src={logo} height="18%" alt='logo' />
         <br />
         <AppBar position="static" style={{ width: "36.9%", borderRadius:"0%", marginBottom: "-1.7%"}}>
            <center>
               <SchoolIcon/>
               </center>
         </AppBar>

         <Paper style={{ width: "37%", paddingTop: "1.5%", paddingBottom: "2%" }} elevation={10} >
            
            <center>
               <Typography variant="h5" component="h1" >
                 Recupera tu Contraseña
               </Typography>
               <br />
               <Divider/>
               <div>
                  <form onSubmit={handleSubmit}>
                  <TextField id="outlined-basic" label="Registro Academico" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />

                  <TextField id="outlined-basic" label="Correo" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />

                  <br/>
    
                  
                  <Link to="/SingIn" >
                  <Typography style={{fontSize:11.5,textAlign: 'left',marginLeft:"10%",marginTop:"4%",marginBottom:"2%"}}>
                     ¿Ya recordaste tu contraseña?
                  </Typography>
                  </Link>
                  <Button variant="contained" style={{width:"80%",marginTop:"2%"}} type="submit">Recuperar Contraseña</Button>
                  </form>
               </div>

            </center>
         </Paper>
      </div>
   );
}

