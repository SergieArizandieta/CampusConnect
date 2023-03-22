const datos = require("./data/datos.json");

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

//DB
const mysql = require("mysql2");

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "SerchiBoi502@",
   database: "proyecto",
});

connection.connect((error) => {
   if (error) {
      console.error("Error de conexión: " + error.stack);
      return;
   }
   console.log("Conectado a la base de datos MySQL.");
});

// ROUTES
app.get("/", (req, res) => {
   datos.forEach((curso) => {
      const sql = `INSERT INTO curso (codigo, nombre, creditos) VALUES ('${curso.codigo}', '${curso.nombre}', ${curso.creditos})`;
      connection.query(sql, (error, results) => {
         if (error) throw error;
         console.log(`Curso ${curso.name} insertado correctamente`);
      });
   });

   res.status(200).json({
      msg: "Sergie Daniel Arizandieta Yol - SOPES 1ER SEM 2022",
   });
});

app.post("/login", (req, res) => {
   const { registro_academico, password } = req.body;
   const sql = `SELECT * FROM usuario WHERE registro_academico = ${registro_academico} AND password = '${password}'`;
   connection.query(sql, (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
         res.status(200).json({
            msg: "Usuario y contraseña correctos",
            registro_academico: results[0].registro_academico,
            nombres: results[0].nombres,
            correo: results[0].correo,
            // password: results[0].password,
            apellidos: results[0].apellidos,
         });
      } else {
         res.status(401).json({
            msg: "Usuario y contraseña incorrectos",
         });
      }
   });
});

app.post("/registro", (req, res) => {
   const { registro_academico, nombres, apellidos, password, correo } =
      req.body;
   const sql = `INSERT INTO usuario (registro_academico, password, nombres, apellidos, correo) VALUES (${registro_academico}, '${password}', '${nombres}', '${apellidos}', '${correo}')`;

   connection.query(
      sql,
      [registro_academico, password, nombres, apellidos, correo],
      (error, results, fields) => {
         if (error) {
            return res.status(401).json({
               msg: "No se ha podido registrar, registro academico ya existe",
            });
         }
         res.status(200).json({
            msg: "Se ha registrado exitosamente",
         });
      }
   );
});

app.post("/reposicion_password", (req, res) => {
   const { registro_academico, correo } = req.body;
   const sql = `SELECT password FROM usuario WHERE registro_academico = ${registro_academico} AND correo = '${correo}';`;
   connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
         res.status(200).json({
            msg: `Contraseña: '${results[0].password}'`,
         });
      } else {
         res.status(401).json({
            msg: "Usuario o correo incorrectos",
         });
      }
   });
});

app.post("/publicacion", (req, res) => {
   const { tipo, registro_academico, nombre, mensaje } = req.body;
   const sql = `INSERT INTO publicacion (tipo, registro_academico, nombre,mensaje) VALUES ('${tipo}', ${registro_academico}, '${nombre}','${mensaje}')`;
   connection.query(
      sql,
      [tipo, registro_academico, nombre, mensaje],
      (error, results, fields) => {
         if (error) {
            return res.status(401).json({
               msg: "No se ha podido publicar",
            });
         }
         res.status(200).json({
            msg: "Se ha publicado exitosamente",
         });
      }
   );
});

app.get("/publicaciones", (req, res) => {
   const sql = `
   SELECT p.id_publicacion,p.tipo,p.fecha,CONCAT(u.nombres,' ',u.apellidos) as NombreCompleto,p.registro_academico,p.nombre,p.mensaje
   FROM publicacion as p
   INNER JOIN usuario as u ON u.registro_academico = p.registro_academico;
   `;
   connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
         res.status(200).json({
            msg: "Publicaciones obtenidas correctamente",
            publicaciones: results,
         });
      } else {
         res.status(401).json({
            msg: "Error al obtener publicaciones",
         });
      }
   });
});

app.post("/comentario", (req, res) => {
   const { id_publicacion, registro_academico, comentario } = req.body;
   const sql = `INSERT INTO comentario (id_publicacion, registro_academico, comentario) VALUES (${id_publicacion}, ${registro_academico}, '${comentario}')`;
   connection.query(
      sql,
      [id_publicacion, registro_academico, comentario],
      (error, results, fields) => {
         if (error) {
            return res.status(401).json({
               msg: "No se ha podido comentar",
            });
         }
         res.status(200).json({
            msg: "Se ha comentado exitosamente",
         });
      }
   );
});

app.post("/comentarios", (req, res) => {
   const { id_publicacion } = req.body;
   const sql = `
   SELECT c.id_comentario,CONCAT(u.nombres,' ',u.apellidos) as NombreCompleto,c.registro_academico,c.comentario,c.fecha
   FROM comentario as c
   INNER JOIN usuario as u ON u.registro_academico = c.registro_academico
   WHERE c.id_publicacion = ${id_publicacion};`;
   connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
         res.status(200).json({
            msg: "Comentarios obtenidos correctamente",
            comentarios: results,
         });
      } else {
         res.status(200).json({
            msg: "No hay Comentarios",
            comentarios: [],
         });
      }
   });
});

app.get("/usuario/:carnet", (req, res) => {
   const { carnet } = req.params;
   const sql = `SELECT * FROM usuario WHERE registro_academico = ${carnet};`;

   connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
         res.status(200).json({
            msg: "Datos obtenidos correctamente",
            datos: results,
         });
      } else {
         res.status(401).json({
            msg: `No se encontro al usuario con registro academido: ${carnet} `,
         });
      }
   });
});

app.put("/actualizar_usuario", (req, res) => {
   const { registro_academico, nombres, apellidos, correo, password } =
      req.body;
   const sql = `UPDATE usuario SET nombres = '${nombres}', apellidos = '${apellidos}', correo = '${correo}', password = '${password}'  WHERE registro_academico = ${registro_academico};`;
   connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
         res.status(200).json({
            msg: "Datos actualizados correctamente",
         });
      } else {
         res.status(401).json({
            msg: "Error al actualizar datos",
         });
      }
   });
});

app.get("/cursos", (req, res) => {
   const sql = `SELECT * FROM curso;`;
   connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
         res.status(200).json({
            msg: "Cursos obtenidos correctamente",
            cursos: results,
         });
      } else {
         res.status(401).json({
            msg: "Error al obtener cursos",
         });
      }
   });
});

app.post("/inscribir_curso", (req, res) => {
   const { registro_academico, codigo } = req.body;
   const sql = `INSERT INTO aprobados (registro_academico, codigo) VALUES (${registro_academico}, ${codigo});`;
   connection.query(
      sql,
      [registro_academico, codigo],
      (error, results, fields) => {
         if (error) {
            return res.status(401).json({
               msg: "No se ha podido inscribir",
            });
         }
         res.status(200).json({
            msg: "Se ha inscrito exitosamente",
         });
      }
   );
});

app.get("/cursos_aprobados/:carnet", (req, res) => {
   const { carnet } = req.params;
   const sql = `
   (
      SELECT curso.nombre, curso.creditos
      FROM curso
      JOIN aprobados ON curso.codigo = aprobados.codigo
      WHERE aprobados.registro_academico = ${carnet}
      )
      UNION
      (
      SELECT 'Total', SUM(curso.creditos)
      FROM curso
      JOIN aprobados ON curso.codigo = aprobados.codigo
      WHERE aprobados.registro_academico = ${carnet}
      );
      `;

   connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
         res.status(200).json({
            msg: "Cursos ganados obtenidos correctamente",
            cursos_ganados: results,
         });
      } else {
         res.status(401).json({
            msg: "Error al obtener cursos ganados",
         });
      }
   });
});

module.exports = app;
