import { Paper } from "@mui/material";

const Aprobados = ({cursosAprobados,carnet}) => {
   return (
      <Paper elevation={10} style={{ width: "80%", marginTop: "5%", paddingBottom: "0.5%", paddingTop: "0.02%" }}>
      <h2>Cursos Asignados:</h2>
      <table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Creditos</th>
          </tr>
        </thead>
        <tbody>
          {cursosAprobados.map((curso, index) => {
            if (index === cursosAprobados.length - 1) {
              return (
                <tr key={`${carnet}${index}`}>
                  <td><b>{curso.nombre}</b></td>
                  <td><b> {curso.creditos}</b></td>
                </tr>
              )
            }
            return (
              <tr key={`${carnet}${index}`}>
                <td>{curso.nombre}</td>
                <td>{curso.creditos}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </Paper>
   );
}

export default Aprobados;