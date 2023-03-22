import React from "react";
import { Button, Paper, TextField, Avatar } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

const EditPerfil = ({ handleSubmmit, registro_academico, nombres, apellidos, correo, password, edit, setNombres, setApellidos, setCorreo, setPassword, EsMiPerfil, handleEdit }) => {

   return (
      <>
         <Avatar alt={nombres} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100, fontSize: "300%", bgcolor: "#3A92FD" }} style={{ marginBottom: "-10.5%", marginTop: "2%" }} />

         <Paper elevation={10} style={{ width: "50%", marginTop: "5%", paddingBottom: "1%", paddingTop: "5%" }}>
            <h1>Perfil</h1>
            <form onSubmit={handleSubmmit}>
               <TextField
                  id="standard-basic"
                  label="Registro Academico"
                  variant="standard"
                  InputProps={{
                     readOnly: true,
                  }}
                  value={registro_academico}
                  style={{ width: "80%" }}
               />
               <br /><br />
               <TextField
                  id="standard-basic"
                  label="Nombre"
                  variant="standard"
                  InputProps={{
                     readOnly: !edit,
                  }}
                  value={nombres}
                  style={{ width: "80%" }}
                  onChange={(e) => setNombres(e.target.value)}
               />
               <br /><br />
               <TextField
                  id="standard-basic"
                  label="Apellidos"
                  variant="standard"
                  InputProps={{
                     readOnly: !edit,
                  }}
                  value={apellidos}
                  style={{ width: "80%" }}
                  onChange={(e) => setApellidos(e.target.value)}
               />
               <br /><br />
               <TextField
                  id="standard-basic"
                  label="Correo"
                  variant="standard"
                  InputProps={{
                     readOnly: !edit,
                  }}
                  value={correo}
                  style={{ width: "80%" }}
                  onChange={(e) => setCorreo(e.target.value)}
               />
               <br /><br />

               {EsMiPerfil &&
                  <>
                     <TextField
                        id="standard-basic"
                        label="Contraseña"
                        variant="standard"
                        InputProps={{
                           readOnly: !edit,
                        }}
                        value={password}
                        style={{ width: "80%" }}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                     <br /><br />
                  </>
               }

               {EsMiPerfil ?
                  edit ?
                     <>
                        <Button variant="outlined" startIcon={<ClearIcon />} style={{ marginRight: "2%" }} onClick={handleEdit}>
                           Cancelar
                        </Button>

                        <Button variant="contained" endIcon={<SaveIcon />} type="submit">
                           Guardar
                        </Button>
                     </>
                     :
                     <Button variant="outlined" startIcon={<EditIcon />} onClick={handleEdit}>
                        Editar
                     </Button>
                  :
                  <></>
               }
            </form>
         </Paper>
      </>
   );
}

export default EditPerfil;