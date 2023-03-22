import  React,{useEffect,useState} from 'react';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';


const Elment = (fecha_ccr, nombre, comentario,id,registro_academico) => {
  const fechaOld = new Date(fecha_ccr);

  const opcionesDeFormato = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  const fecha = fechaOld.toLocaleDateString('es-ES', opcionesDeFormato);

  return (
    <ListItem alignItems="flex-start" style={{ width: "100%" }} key={id}>
      <Link to={`/perfil/${registro_academico}`} style={{ textDecoration: "none", color: "black" }}>
       
      <ListItemAvatar>
        <Avatar alt={nombre} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      </Link>
      <ListItemText
        primary={`${nombre}`}
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {` - ${comentario}`}
          </Typography>
        }
      />
     
      <Typography
        sx={{ display: 'inline' }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        {`${fecha}`}

      </Typography>
    </ListItem>
  )
}

export default function Comments({ expanded, id,update }) {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    let data = {
      id_publicacion: id,
    }

    fetch('http://localhost:4200/comentarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(function (response) {
      if (response.status === 200) {
        return response.json().then(function (data) {
          console.log("comentarios",data);
          setComentarios(data.comentarios);
        });
      }
      response.json().then(function (data) {
        console.log("Err al obtener comentario",data.msg);
      });
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });

  }, [id , update ])

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        comentarios.map((item,index) => {
            if (!expanded && index > 0)
              return null
            const elemnt = [];
            elemnt.push(<Divider key={`${item.id_comentario}D`}/>)
            elemnt.push(Elment(item.fecha, item.NombreCompleto, item.comentario,item.id_comentario,item.registro_academico))
            return (elemnt)
          }
        )
      }
    </List>
  );
}