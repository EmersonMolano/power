package com.biblioteca.dto;

import com.biblioteca.entity.EstadoPrestamo;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record PrestamoRequest(
    @NotNull(message = "El usuario es obligatorio")
    Long usuarioId,

    @NotNull(message = "El libro es obligatorio")
    Long libroId,

    LocalDate fechaPrestamo,
    LocalDate fechaDevolucion,
    EstadoPrestamo estado
) {
}
