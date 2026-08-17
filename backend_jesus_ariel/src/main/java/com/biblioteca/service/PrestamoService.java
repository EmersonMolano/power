package com.biblioteca.service;

import com.biblioteca.dto.PrestamoRequest;
import com.biblioteca.dto.PrestamoResponse;
import com.biblioteca.entity.EstadoPrestamo;
import com.biblioteca.entity.Libro;
import com.biblioteca.entity.Prestamo;
import com.biblioteca.entity.Usuario;
import com.biblioteca.exception.RecursoNoEncontradoException;
import com.biblioteca.exception.ReglaNegocioException;
import com.biblioteca.mapper.PrestamoMapper;
import com.biblioteca.repository.LibroRepository;
import com.biblioteca.repository.PrestamoRepository;
import com.biblioteca.repository.UsuarioRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PrestamoService {

    private final PrestamoRepository prestamoRepository;
    private final UsuarioRepository usuarioRepository;
    private final LibroRepository libroRepository;

    @Transactional(readOnly = true)
    public List<PrestamoResponse> buscarTodos() {
        return prestamoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))
            .stream()
            .map(PrestamoMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public PrestamoResponse buscarPorId(Long id) {
        return PrestamoMapper.toResponse(obtenerPrestamo(id));
    }

    @Transactional
    public PrestamoResponse crear(PrestamoRequest request) {
        Usuario usuario = obtenerUsuario(request.usuarioId());
        Libro libro = obtenerLibro(request.libroId());
        EstadoPrestamo estado = resolverEstado(request.estado(), EstadoPrestamo.PRESTADO);
        LocalDate fechaPrestamo = request.fechaPrestamo() == null ? LocalDate.now() : request.fechaPrestamo();

        validarFechas(fechaPrestamo, request.fechaDevolucion());
        validarDisponibilidadParaPrestamo(libro, estado, false);

        Prestamo prestamo = PrestamoMapper.toEntity(request, usuario, libro, estado);
        aplicarDisponibilidad(libro, estado);
        return PrestamoMapper.toResponse(prestamoRepository.save(prestamo));
    }

    @Transactional
    public PrestamoResponse actualizar(Long id, PrestamoRequest request) {
        Prestamo prestamo = obtenerPrestamo(id);
        Usuario usuario = obtenerUsuario(request.usuarioId());
        Libro libroAnterior = prestamo.getLibro();
        Libro libroNuevo = obtenerLibro(request.libroId());
        EstadoPrestamo estadoNuevo = resolverEstado(request.estado(), prestamo.getEstado());
        LocalDate fechaPrestamo = request.fechaPrestamo() == null
            ? prestamo.getFechaPrestamo()
            : request.fechaPrestamo();
        boolean mismoLibro = Objects.equals(libroAnterior.getId(), libroNuevo.getId());
        boolean libroPrestadoPorEsteRegistro = mismoLibro && prestamo.getEstado() == EstadoPrestamo.PRESTADO;

        validarFechas(fechaPrestamo, request.fechaDevolucion());
        validarDisponibilidadParaPrestamo(libroNuevo, estadoNuevo, libroPrestadoPorEsteRegistro);

        if (!mismoLibro && prestamo.getEstado() == EstadoPrestamo.PRESTADO) {
            libroAnterior.setDisponible(true);
        }

        PrestamoMapper.updateEntity(prestamo, request, usuario, libroNuevo, estadoNuevo);
        aplicarDisponibilidad(libroNuevo, estadoNuevo);
        return PrestamoMapper.toResponse(prestamo);
    }

    @Transactional
    public void eliminar(Long id) {
        Prestamo prestamo = obtenerPrestamo(id);
        if (prestamo.getEstado() == EstadoPrestamo.PRESTADO) {
            prestamo.getLibro().setDisponible(true);
        }
        prestamoRepository.delete(prestamo);
    }

    private Prestamo obtenerPrestamo(Long id) {
        return prestamoRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Prestamo no encontrado con id " + id));
    }

    private Usuario obtenerUsuario(Long id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con id " + id));
    }

    private Libro obtenerLibro(Long id) {
        return libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro no encontrado con id " + id));
    }

    private EstadoPrestamo resolverEstado(EstadoPrestamo estadoSolicitado, EstadoPrestamo estadoPorDefecto) {
        return estadoSolicitado == null ? estadoPorDefecto : estadoSolicitado;
    }

    private void validarFechas(LocalDate fechaPrestamo, LocalDate fechaDevolucion) {
        if (fechaDevolucion != null && fechaDevolucion.isBefore(fechaPrestamo)) {
            throw new ReglaNegocioException("La fecha de devolucion no puede ser anterior a la fecha de prestamo");
        }
    }

    private void validarDisponibilidadParaPrestamo(
        Libro libro,
        EstadoPrestamo estado,
        boolean libroPrestadoPorEsteRegistro
    ) {
        if (estado == EstadoPrestamo.PRESTADO && !libroPrestadoPorEsteRegistro && !libro.isDisponible()) {
            throw new ReglaNegocioException("El libro " + libro.getTitulo() + " no esta disponible para prestamo");
        }
    }

    private void aplicarDisponibilidad(Libro libro, EstadoPrestamo estado) {
        libro.setDisponible(estado != EstadoPrestamo.PRESTADO);
    }
}
