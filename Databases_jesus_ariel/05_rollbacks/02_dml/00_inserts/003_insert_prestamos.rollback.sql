DELETE FROM prestamos
WHERE (usuario_id, libro_id, estado) IN (
    (1, 1, 'PRESTADO'),
    (2, 3, 'PRESTADO'),
    (3, 2, 'DEVUELTO')
);
