import React, { useState } from 'react';
import 
{ 
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function DialogCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('female');

  const [name, setName] = useState('');
  const [mensaje, setMensaje] = useState('');
  

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setMensaje('');
  };

  const hanldeSend = (e) => {
    e.preventDefault();
    console.log("Nombre",name);
    console.log("tipo",value);
    console.log("mensaje",mensaje);

    if(name === '') return  alert('Ingresa un nombre');

    if(mensaje === '') return alert('Ingresa un mensaje');

    let data = {
      
      tipo: value,
      registro_academico: cookies.get('usuario').registro_academico,
      nombre: name,
      mensaje: mensaje
    }

    fetch('http://localhost:4200/publicacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      if (response.status === 200) {
        return response.json().then(function (data) {
          alert(data.msg);
          handleClose();
          window.location.reload();
        });
      } 
      response.json().then(function (data) {
        alert(data.msg);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }



  return (
    <div style={{marginBottom:"2.5%"}} >
      <center>
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleIcon />} >
        Crear publicación
        </Button>
      </center>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogTitle id="alert-dialog-title">
          <center>
            <b>
              Crear publicación </b>
          </center>
        </DialogTitle>
        <Divider />

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¡Alerta! Asegúrate de que el contenido que compartes es apropiado y respetuoso para todos.
          </DialogContentText>
        </DialogContent>

        <Divider />

        <FormControl style={{ marginLeft: "5%", marginTop: "2%" }}>
          <FormLabel id="demo-radio-buttons-group-label">Tipo:</FormLabel>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Curso"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Curso" />
            <FormControlLabel value="2" control={<Radio />} label="Catedratico" />
          </RadioGroup>
        </FormControl>


        <Divider />

        <form
          style={{ marginLeft: "5%", marginRight: "5%" }}
        >
          <TextField
            id="outlined-basic"
            label={`Nombre del: ${value === "1" ? "Curso" : "Catedratico"}`}
            variant="outlined"
            style={{ marginTop: "2%" }}
            fullWidth 
            onChange={(e) =>  setName(e.target.value)}
            />

          <br />
          <TextField
            id="outlined-multiline-flexible"
            label="Mensaje"
            multiline
            maxRows={4}
            style={{ marginTop: "4%" }}
            fullWidth
            onChange={(e) =>  setMensaje(e.target.value)}
          />
         
        </form>
        <DialogActions>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClose}>
              Eliminar
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} onClick={hanldeSend} >
              Publicar
            </Button>
          </DialogActions>

      </Dialog>
    </div>
  );
}