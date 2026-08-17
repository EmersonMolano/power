package com.biblioteca.mapper;

import com.biblioteca.dto.UsuarioRequest;
import com.biblioteca.dto.UsuarioResponse;
import com.biblioteca.entity.Usuario;

public final class UsuarioMapper {

    private UsuarioMapper() {
    }

    public static Usuario toEntity(UsuarioRequest request) {
        Usuario usuario = new Usuario();
        updateEntity(usuario, request);
        return usuario;
    }

    public static void updateEntity(Usuario usuario, UsuarioRequest request) {
        usuario.setNombre(request.nombre());
        usuario.setCorreo(request.correo());
        usuario.setTelefono(request.telefono());
    }

    public static UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
            usuario.getId(),
            usuario.getNombre(),
            usuario.getCorreo(),
            usuario.getTelefono(),
            usuario.getCreadoEn()
        );
    }
}
