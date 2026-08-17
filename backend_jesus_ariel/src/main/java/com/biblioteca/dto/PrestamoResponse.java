package com.biblioteca.dto;

import com.biblioteca.entity.EstadoPrestamo;
import java.time.LocalDate;

public record PrestamoResponse(
    Long id,
    Long usuarioId,
    String usuarioNombre,
    Long libroId,
    String libroTitulo,
    LocalDate fechaPrestamo,
    LocalDate fechaDevolucion,
    EstadoPrestamo estado
) {
}
