import React, {useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
  TextField
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import Comments from './Comments';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Cards({publicacion,id,color }) {

  const [expanded, setExpanded] = useState(false);
  const [update, setUpdate] = useState(false);
  const handleExpandClick = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const handleSubmmit = (e) => {
    e.preventDefault();
    // console.log("submit")
    // console.log(e.target[0].value)

    let data = {
      id_publicacion: id,
      comentario: e.target[0].value,
      registro_academico: cookies.get('usuario').registro_academico,
    }

    fetch('http://localhost:4200/comentario', {
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
          setUpdate(!update);
        });
      }
      response.json().then(function (data) {
        alert("Err al comentar",data.msg);
      });
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });
    
    e.target.reset();
  }

  const name = publicacion.NombreCompleto
  const fechaOld = new Date(publicacion.fecha);
  const opcionesDeFormato = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const fecha = fechaOld.toLocaleDateString('es-ES', opcionesDeFormato);
  const tipo = publicacion.tipo;
  const nombre = publicacion.nombre;
  const mensaje = publicacion.mensaje;

  return (
    <>
      <Card sx={{ maxWidth: "100%", marginBottom: "4%" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ width: "5px", bgcolor: `${tipo === 1 ? "#FF4A4A" : "#D04AFF"}` }} />
          <CardContent style={{ marginTop: "0%", paddingLeft: "16px" }}>
            
            <Link to={`/perfil/${publicacion.registro_academico}`} style={{textDecoration:"none",color:"black"}}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: color}}
                  alt={name}
                  src="/broken-image.jpg"
                />
              }
              title={name}
              subheader={fecha}
              style={{ marginLeft: "-6%" }}
            />
            </Link>

            <Typography variant="h6" color="text.secondary">
              {tipo === 1 ? "Curso" : "Catedratico"} - "{nombre}"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mensaje}
            </Typography>
          </CardContent>
        </Box>

        <CardActions disableSpacing>
          <IconButton onClick={handleExpandClick}>
            <AddCommentIcon />
          </IconButton>
          <IconButton >
            <ShareIcon />
          </IconButton>
        </CardActions>

        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Avatar alt={cookies.get('usuario').nombres} src="/static/images/avatar/1.jpg" sx={{ mr: 1, my: 0.5, bgcolor: "#3A92FD" }} style={{ marginLeft: "2%" }} />
          <form onSubmit={handleSubmmit} style={{ display: 'flex', width: "90%" }} >
            <TextField id="input-with-sx" label="Comenta algo" variant="standard" multiline
              maxRows={4} fullWidth />
            <IconButton aria-label="fingerprint" type='submit'>
              <SendIcon sx={{ color: "#1569FB" }} />
            </IconButton>
          </form>
        </Box>

        <Comments expanded={expanded} id={id} update={update} />

        <Divider />
        <IconButton onClick={handleExpandClick} >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        {expanded ? "Ver menos" : "Ver mas"}
      </Card>

    </>
  );
}