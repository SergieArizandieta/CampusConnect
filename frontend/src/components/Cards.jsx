import * as React from 'react';

import { 
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Box } from '@mui/system';

export default function Cards({publicacion}) {

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
    <Card sx={{ maxWidth: "100%",marginBottom:"4%" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ width: "5px", bgcolor: `${tipo === 1 ? "#FF4A4A": "#D04AFF"}` }} />
        <CardContent style={{ marginTop: "0%", paddingLeft: "16px" }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: "#1569FB" }}
                alt={name}
                src="/broken-image.jpg"
              />
            }
            title={name}
            subheader={fecha}
          />
          <Typography variant="h6" color="text.secondary">
          {tipo === 1 ? "Curso": "Catedratico"} - "{nombre}"
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mensaje}
          </Typography>
          
        </CardContent>
        
      </Box>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AddCommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>

  );
}