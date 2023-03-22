import {  Button, FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import React from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';

const AsignarCurso = ({handleSubmmit2,codigo,handleChange,cursos}) => {

   return (
      <Paper elevation={10} style={{ width: "50%", marginTop: "5%", paddingBottom: "1.2%", paddingTop: "0.02%" }} >
      <h2>Asignarme Cursos:</h2>

      <form onSubmit={handleSubmmit2}>
        <FormControl style={{ width: "80%" }}>
          <InputLabel id="demo-simple-select-label">Curso</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={codigo}
            label="Curso"
            onChange={handleChange}
          >
            {
              cursos.map((curso) => {
                return <MenuItem value={curso.codigo} key={curso.codigo}>{curso.nombre}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <br /> <br />
        <Button variant="contained" endIcon={<AddBoxIcon />} type="submit">
          Asignar
        </Button>
      </form>
    </Paper>
   );
}

export default AsignarCurso;