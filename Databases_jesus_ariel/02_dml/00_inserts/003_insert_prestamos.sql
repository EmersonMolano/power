INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES
(1, 1, CURRENT_DATE - INTERVAL '5 days', NULL, 'PRESTADO'),
(2, 3, CURRENT_DATE - INTERVAL '12 days', NULL, 'PRESTADO'),
(3, 2, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE - INTERVAL '10 days', 'DEVUELTO');
