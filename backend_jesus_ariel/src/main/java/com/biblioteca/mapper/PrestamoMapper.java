package com.biblioteca.mapper;

import com.biblioteca.dto.PrestamoRequest;
import com.biblioteca.dto.PrestamoResponse;
import com.biblioteca.entity.EstadoPrestamo;
import com.biblioteca.entity.Libro;
import com.biblioteca.entity.Prestamo;
import com.biblioteca.entity.Usuario;
import java.time.LocalDate;

public final class PrestamoMapper {

    private PrestamoMapper() {
    }

    public static Prestamo toEntity(
        PrestamoRequest request,
        Usuario usuario,
        Libro libro,
        EstadoPrestamo estado
    ) {
        Prestamo prestamo = new Prestamo();
        prestamo.setFechaPrestamo(
            request.fechaPrestamo() == null ? LocalDate.now() : request.fechaPrestamo()
        );
        updateEntity(prestamo, request, usuario, libro, estado);
        return prestamo;
    }

    public static void updateEntity(
        Prestamo prestamo,
        PrestamoRequest request,
        Usuario usuario,
        Libro libro,
        EstadoPrestamo estado
    ) {
        prestamo.setUsuario(usuario);
        prestamo.setLibro(libro);
        if (request.fechaPrestamo() != null) {
            prestamo.setFechaPrestamo(request.fechaPrestamo());
        }
        prestamo.setFechaDevolucion(request.fechaDevolucion());
        prestamo.setEstado(estado);
    }

    public static PrestamoResponse toResponse(Prestamo prestamo) {
        return new PrestamoResponse(
            prestamo.getId(),
            prestamo.getUsuario().getId(),
            prestamo.getUsuario().getNombre(),
            prestamo.getLibro().getId(),
            prestamo.getLibro().getTitulo(),
            prestamo.getFechaPrestamo(),
            prestamo.getFechaDevolucion(),
            prestamo.getEstado()
        );
    }
}
