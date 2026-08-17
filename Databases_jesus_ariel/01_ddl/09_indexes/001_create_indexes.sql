CREATE INDEX idx_usuarios_correo ON usuarios(correo);
CREATE INDEX idx_libros_titulo ON libros(titulo);
CREATE INDEX idx_prestamos_usuario ON prestamos(usuario_id);
CREATE INDEX idx_prestamos_libro ON prestamos(libro_id);
