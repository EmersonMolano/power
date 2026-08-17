package com.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LibroRequest(
    @NotBlank(message = "El titulo es obligatorio")
    @Size(max = 180, message = "El titulo no puede superar 180 caracteres")
    String titulo,

    @NotBlank(message = "El autor es obligatorio")
    @Size(max = 140, message = "El autor no puede superar 140 caracteres")
    String autor,

    @NotBlank(message = "El ISBN es obligatorio")
    @Size(max = 30, message = "El ISBN no puede superar 30 caracteres")
    String isbn,

    @NotBlank(message = "La categoria es obligatoria")
    @Size(max = 80, message = "La categoria no puede superar 80 caracteres")
    String categoria,

    Boolean disponible
) {
}
