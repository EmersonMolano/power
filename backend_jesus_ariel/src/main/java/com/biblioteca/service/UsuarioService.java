package com.biblioteca.service;

import com.biblioteca.dto.UsuarioRequest;
import com.biblioteca.dto.UsuarioResponse;
import com.biblioteca.entity.Usuario;
import com.biblioteca.exception.RecursoNoEncontradoException;
import com.biblioteca.exception.ReglaNegocioException;
import com.biblioteca.mapper.UsuarioMapper;
import com.biblioteca.repository.UsuarioRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<UsuarioResponse> buscarTodos() {
        return usuarioRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))
            .stream()
            .map(UsuarioMapper::toResponse)
            .toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse buscarPorId(Long id) {
        return UsuarioMapper.toResponse(obtenerEntidad(id));
    }

    @Transactional
    public UsuarioResponse crear(UsuarioRequest request) {
        validarCorreoDisponible(request.correo(), null);
        Usuario usuario = UsuarioMapper.toEntity(request);
        return UsuarioMapper.toResponse(usuarioRepository.save(usuario));
    }

    @Transactional
    public UsuarioResponse actualizar(Long id, UsuarioRequest request) {
        Usuario usuario = obtenerEntidad(id);
        validarCorreoDisponible(request.correo(), id);
        UsuarioMapper.updateEntity(usuario, request);
        return UsuarioMapper.toResponse(usuario);
    }

    @Transactional
    public void eliminar(Long id) {
        Usuario usuario = obtenerEntidad(id);
        usuarioRepository.delete(usuario);
    }

    private Usuario obtenerEntidad(Long id) {
        return usuarioRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con id " + id));
    }

    private void validarCorreoDisponible(String correo, Long idActual) {
        boolean existe = idActual == null
            ? usuarioRepository.existsByCorreoIgnoreCase(correo)
            : usuarioRepository.existsByCorreoIgnoreCaseAndIdNot(correo, idActual);

        if (existe) {
            throw new ReglaNegocioException("Ya existe un usuario con el correo " + correo);
        }
    }
}
