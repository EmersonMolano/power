CREATE TABLE prestamos (
    id BIGSERIAL PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    libro_id BIGINT NOT NULL,
    fecha_prestamo DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_devolucion DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'PRESTADO',
    CONSTRAINT fk_prestamos_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT fk_prestamos_libro
        FOREIGN KEY (libro_id) REFERENCES libros(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT chk_prestamos_estado
        CHECK (estado IN ('PRESTADO', 'DEVUELTO', 'CANCELADO')),
    CONSTRAINT chk_prestamos_fechas
        CHECK (fecha_devolucion IS NULL OR fecha_devolucion >= fecha_prestamo)
);
