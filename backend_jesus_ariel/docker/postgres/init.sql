CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    correo VARCHAR(160) NOT NULL UNIQUE,
    telefono VARCHAR(40),
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE libros (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(180) NOT NULL,
    autor VARCHAR(140) NOT NULL,
    isbn VARCHAR(30) NOT NULL UNIQUE,
    categoria VARCHAR(80) NOT NULL,
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prestamos (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    libro_id BIGINT NOT NULL,
    fecha_prestamo DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_devolucion DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'PRESTADO',
    CONSTRAINT fk_prestamos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_prestamos_libro FOREIGN KEY (libro_id) REFERENCES libros(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_prestamos_estado CHECK (estado IN ('PRESTADO', 'DEVUELTO', 'CANCELADO')),
    CONSTRAINT chk_prestamos_fechas CHECK (fecha_devolucion IS NULL OR fecha_devolucion >= fecha_prestamo)
);

CREATE INDEX idx_prestamos_usuario ON prestamos(usuario_id);
CREATE INDEX idx_prestamos_libro ON prestamos(libro_id);
CREATE INDEX idx_libros_categoria ON libros(categoria);

INSERT INTO usuarios (nombre, correo, telefono) VALUES
('Ana Gomez', 'ana.gomez@biblioteca.com', '3001112233'),
('Carlos Ruiz', 'carlos.ruiz@biblioteca.com', '3012223344'),
('Laura Martinez', 'laura.martinez@biblioteca.com', '3023334455');

INSERT INTO libros (titulo, autor, isbn, categoria, disponible) VALUES
('Cien anios de soledad', 'Gabriel Garcia Marquez', '9780307474728', 'Novela', TRUE),
('El principito', 'Antoine de Saint-Exupery', '9780156012195', 'Infantil', TRUE),
('Clean Code', 'Robert C. Martin', '9780132350884', 'Programacion', TRUE);

INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES
(1, 1, CURRENT_DATE - INTERVAL '5 days', NULL, 'PRESTADO'),
(2, 3, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE - INTERVAL '2 days', 'DEVUELTO'),
(3, 2, CURRENT_DATE - INTERVAL '1 day', NULL, 'PRESTADO');
