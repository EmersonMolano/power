package com.biblioteca.dto;

import java.time.LocalDateTime;

public record LibroResponse(
    Long id,
    String titulo,
    String autor,
    String isbn,
    String categoria,
    boolean disponible,
    LocalDateTime creadoEn
) {
}
