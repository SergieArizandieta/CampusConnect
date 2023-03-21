import React, { useState } from 'react';
import 
{ 
   AppBar,
   Button,
   Divider,
   FormControl,
   InputLabel,
   OutlinedInput,
   Paper,
   TextField,
   Typography,
   InputAdornment,
   IconButton 
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo_azul.png'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function SingIn() {
   const [showPassword, setShowPassword] = useState(false);

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e.target[0].value);
      console.log(e.target[2].value);
      if (e.target[0].value === "" || e.target[2].value === "")
         return alert("No se permiten campos vacios");


      let data = {
         registro_academico: e.target[0].value,
         password: e.target[2].value
      }

      const json = JSON.stringify(data);

      fetch(`http://localhost:4200/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: json
      })
      .then(function (response) {
         if (response.status === 200) {
            return response.json().then(function (data) {
               alert(data.msg);
              
               cookies.set('usuario', 
               {
                  registro_academico: data.registro_academico,
                  nombres: data.nombres,
                  correo: data.correo,
                  apellidos: data.apellidos
               }
               , 
               { path: '/' });

               window.location.reload()
            });
         }
         response.json().then(function (data) {
            alert(data.msg);
         });
      })
      .catch(function (error) {
         console.log(error);
      });

   }

   return (
      <div className="singin">
         <img src={logo} height="18%" alt='logo'/>
         <br />
         <AppBar position="static" style={{ width: "36.9%", borderRadius: "0%", marginBottom: "-1.7%" }}>
            <center>
               <SchoolIcon />
            </center>
         </AppBar>

         <Paper style={{ width: "37%", paddingTop: "1.5%", paddingBottom: "2%" }} elevation={10} >

            <center>
               <Typography variant="h5" component="h1" >
                  Ingresa tu Cuenta
               </Typography>
               <br />
               <Divider />
               <div>
                  <form onSubmit={handleSubmit}>
                     <TextField id="outlined-basic" label="Registro Academico" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />

                     <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ width: "80%", marginTop: "5%" }}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                           id="outlined-adornment-password"
                           type={showPassword ? 'text' : 'password'}
                           endAdornment={
                              <InputAdornment position="end">
                                 <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                 >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                 </IconButton>
                              </InputAdornment>
                           }
                           label="Password"
                        />
                     </FormControl>

                     <br />
                     <Link to="/ResetPass" >
                        <Typography style={{ fontSize: 11.5, textAlign: 'left', marginLeft: "10%", marginTop: "2%", marginBottom: "2%" }}>
                           ¿Has olvidado tu contraseña?
                        </Typography>
                     </Link>

                     <Link to="/SingUp" >
                        <Typography style={{ fontSize: 11.5, textAlign: 'left', marginLeft: "10%", marginTop: "2%", marginBottom: "2%" }}>
                           ¿No tienes una cuenta?
                        </Typography>
                     </Link>
                     <Button variant="contained" style={{ width: "80%", marginTop: "2%" }} type="submit">Iniciar Sesion</Button>
                  </form>
               </div>

            </center>
         </Paper>
      </div>
   );
}

