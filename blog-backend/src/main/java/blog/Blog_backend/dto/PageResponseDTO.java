package blog.Blog_backend.dto;

import org.springframework.data.domain.Page;

import java.util.List;

/** Formato estável de paginação para o front (evita serializar PageImpl direto). */
public record PageResponseDTO<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
    public static <T> PageResponseDTO<T> of(Page<T> page) {
        return new PageResponseDTO<>(page.getContent(), page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages());
    }
}