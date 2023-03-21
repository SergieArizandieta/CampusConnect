const datos = require("./data/datos.json");

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { format } = require('date-fns');

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
   console.log(registro_academico, password,"hola");
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
            apellidos: results[0].apellidos
         });
      } else {
         res.status(401).json({
            msg: "Usuario y contraseña incorrectos",
         });
      }
   });
});

app.post("/registro", (req, res) => {
   const { registro_academico, nombres, apellidos, password, correo } = req.body;
   console.log(registro_academico, nombres, apellidos, password, correo);

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
   console.log(registro_academico, correo);
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
})

app.post("/publicacion", (req, res) => {
   const { tipo, registro_academico, nombre,mensaje } = req.body;
   const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
   const sql = `INSERT INTO publicacion (tipo, fecha, registro_academico, nombre,mensaje) VALUES ('${tipo}', '${fecha}', ${registro_academico}, '${nombre}','${mensaje}')`;
   console.log(sql);
   connection.query(
      sql,
      [tipo, fecha, registro_academico, nombre,mensaje],
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
         console.log(results);
         res.status(200).json({
            msg: "Publicaciones obtenidas correctamente",
            publicaciones: results
         });
      } else {
         res.status(401).json({
            msg: "Error al obtener publicaciones",
         });
      }
   });
   
});
module.exports = app;
