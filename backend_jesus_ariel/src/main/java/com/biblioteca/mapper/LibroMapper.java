package com.biblioteca.mapper;

import com.biblioteca.dto.LibroRequest;
import com.biblioteca.dto.LibroResponse;
import com.biblioteca.entity.Libro;

public final class LibroMapper {

    private LibroMapper() {
    }

    public static Libro toEntity(LibroRequest request) {
        Libro libro = new Libro();
        updateEntity(libro, request);
        return libro;
    }

    public static void updateEntity(Libro libro, LibroRequest request) {
        libro.setTitulo(request.titulo());
        libro.setAutor(request.autor());
        libro.setIsbn(request.isbn());
        libro.setCategoria(request.categoria());
        libro.setDisponible(request.disponible() == null ? libro.isDisponible() : request.disponible());
    }

    public static LibroResponse toResponse(Libro libro) {
        return new LibroResponse(
            libro.getId(),
            libro.getTitulo(),
            libro.getAutor(),
            libro.getIsbn(),
            libro.getCategoria(),
            libro.isDisponible(),
            libro.getCreadoEn()
        );
    }
}
