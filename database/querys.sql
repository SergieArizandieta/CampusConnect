use proyecto;
SELECT * FROM usuario;

CREATE TABLE usuario (
    registro_academico INT NOT NULL AUTO_INCREMENT,
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

CREATE TABLE publicacion (
    id_publicacion INT NOT NULL AUTO_INCREMENT,
    tipo INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    registro_academico INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    mensaje VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_publicacion),
    FOREIGN KEY ( registro_academico ) REFERENCES usuario ( registro_academico )
);

CREATE TABLE comentario (
    id_comentario INT NOT NULL AUTO_INCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    registro_academico INT NOT NULL,
    id_publicacion INT NOT NULL,
    comentario VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_comentario),
    FOREIGN KEY ( id_publicacion ) REFERENCES publicacion ( id_publicacion ),
    FOREIGN KEY ( registro_academico ) REFERENCES usuario ( registro_academico )
);

-- SELECT * FROM curso;
-- DELETE FROM curso;
-- SELECT * FROM usuario;
-- ------------------------
