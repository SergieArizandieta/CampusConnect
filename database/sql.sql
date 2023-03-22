use proyecto;
INSERT INTO usuario VALUES (202000111,'nombre','c@gmail.com','123','apellidos');
SELECT * FROM usuario;
SELECT password FROM usuario WHERE registro_academico = 202000119 AND correo = 'c2@gmail.coms';
SELECT * FROM publicacion;

SELECT p.id_publicacion,p.tipo,p.fecha,CONCAT(u.nombres,' ',u.apellidos) as NombreCompleto,p.registro_academico,p.nombre,p.mensaje
FROM publicacion as p
INNER JOIN usuario as u ON u.registro_academico = p.registro_academico;

INSERT INTO publicacion (tipo, registro_academico, nombre,mensaje) VALUES ('1', 202000110, 'AAA','maAAAla');

SELECT * FROM comentario;
INSERT INTO comentario (id_publicacion, registro_academico, comentario) VALUES (3, 202000110, 'asdasdasd');

SELECT c.id_comentario,CONCAT(u.nombres,' ',u.apellidos) as NombreCompleto,c.registro_academico,c.comentario,c.fecha
FROM comentario as c
INNER JOIN usuario as u ON u.registro_academico = c.registro_academico
WHERE c.id_publicacion = 3;

SELECT * FROM usuario WHERE registro_academico = 202000110;

UPDATE usuario SET nombres = 'sergie', apellidos = 'arizandietra', correo = 'sergie@gmail.com', password = '1111' WHERE registro_academico = 202000110;
UPDATE usuario SET nombres = 'nombre', apellidos = 'apellido', correo = 'c@gmail.com', password = '1234'  WHERE registro_academico = 202000110;

SELECT * FROM curso;

SELECT * FROM aprobados;
INSERT INTO aprobados (registro_academico, codigo) VALUES (202000110, 968);

(
SELECT curso.nombre, curso.creditos
FROM curso
JOIN aprobados ON curso.codigo = aprobados.codigo
WHERE aprobados.registro_academico = 202000110
)
UNION
(
SELECT 'Total', SUM(curso.creditos)
FROM curso
JOIN aprobados ON curso.codigo = aprobados.codigo
WHERE aprobados.registro_academico = 202000110
);






CREATE TABLE usuario (
    registro_academico INT NOT NULL ,
    nombres VARCHAR(100) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    PRIMARY KEY(registro_academico)
);

CREATE TABLE curso (
    codigo INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    creditos INT NOT NULL,
    PRIMARY KEY(codigo)
);

CREATE TABLE aprobados (
    registro_academico INT NOT NULL,
    codigo INT NOT NULL,
    FOREIGN KEY ( codigo ) REFERENCES curso ( codigo ),
    FOREIGN KEY ( registro_academico ) REFERENCES usuario ( registro_academico )
);

CREATE TABLE comentario (
    id_comentario INT NOT NULL AUTO_INCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    registro_academico INT NOT NULL,
    id_publicacion INT NOT NULL,
    comentario VARCHAR(300) NOT NULL,
    PRIMARY KEY(id_comentario),
    FOREIGN KEY ( id_publicacion ) REFERENCES publicacion ( id_publicacion ),
    FOREIGN KEY ( registro_academico ) REFERENCES usuario ( registro_academico )
);


CREATE TABLE publicacion (
    id_publicacion INT NOT NULL AUTO_INCREMENT,
    tipo INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    registro_academico INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    mensaje VARCHAR(300) NOT NULL,
    PRIMARY KEY(id_publicacion),
    FOREIGN KEY ( registro_academico ) REFERENCES usuario ( registro_academico )
);



SELECT * FROM curso;
DELETE FROM curso;
