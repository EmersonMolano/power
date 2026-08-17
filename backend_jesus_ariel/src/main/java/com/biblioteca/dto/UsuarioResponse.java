package com.biblioteca.dto;

import java.time.LocalDateTime;

public record UsuarioResponse(
    Long id,
    String nombre,
    String correo,
    String telefono,
    LocalDateTime creadoEn
) {
}
