import React, {useState} from 'react';
import { AppBar, Button, Divider, Paper, TextField, Typography,FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo_azul.png'

export default function SingUp() {
   const [showPassword, setShowPassword] = useState(false);

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };
   const handleSubmit = (e) => {
      e.preventDefault();
  
      console.log(e.target[0].value);
      console.log(e.target[2].value);
      console.log(e.target[4].value);
      console.log(e.target[6].value);
      console.log(e.target[9].value);
      

      let data = {  
         registro_academico: e.target[0].value,
         nombres: e.target[2].value,
         apellidos: e.target[4].value,
         password: e.target[6].value,
         correo: e.target[9].value
      }
      console.log(data);
      

      fetch(`http://localhost:4200/registro`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify( data)
      }).then(function (response) {
         return response.json();
      }
      ).then(function (data) {
         alert(data.msg);
      }
      );

      e.target.reset();
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

                     <TextField id="outlined-basic" type="email" label="Correo Electronico" variant="outlined" style={{ width: "80%", marginTop: "5%" }} />

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

