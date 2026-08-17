package com.biblioteca.service;

import com.biblioteca.dto.LibroRequest;
import com.biblioteca.dto.LibroResponse;
import com.biblioteca.entity.Libro;
import com.biblioteca.exception.RecursoNoEncontradoException;
import com.biblioteca.exception.ReglaNegocioException;
import com.biblioteca.mapper.LibroMapper;
import com.biblioteca.repository.LibroRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LibroService {

    private final LibroRepository libroRepository;

    @Transactional(readOnly = true)
    public List<LibroResponse> buscarTodos() {
        return libroRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))
            .stream()
            .map(LibroMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public LibroResponse buscarPorId(Long id) {
        return LibroMapper.toResponse(obtenerEntidad(id));
    }

    @Transactional
    public LibroResponse crear(LibroRequest request) {
        validarIsbnDisponible(request.isbn(), null);
        Libro libro = LibroMapper.toEntity(request);
        return LibroMapper.toResponse(libroRepository.save(libro));
    }

    @Transactional
    public LibroResponse actualizar(Long id, LibroRequest request) {
        Libro libro = obtenerEntidad(id);
        validarIsbnDisponible(request.isbn(), id);
        LibroMapper.updateEntity(libro, request);
        return LibroMapper.toResponse(libro);
    }

    @Transactional
    public void eliminar(Long id) {
        Libro libro = obtenerEntidad(id);
        libroRepository.delete(libro);
    }

    private Libro obtenerEntidad(Long id) {
        return libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro no encontrado con id " + id));
    }

    private void validarIsbnDisponible(String isbn, Long idActual) {
        boolean existe = idActual == null
            ? libroRepository.existsByIsbnIgnoreCase(isbn)
            : libroRepository.existsByIsbnIgnoreCaseAndIdNot(isbn, idActual);

        if (existe) {
            throw new ReglaNegocioException("Ya existe un libro con el ISBN " + isbn);
        }
    }
}
