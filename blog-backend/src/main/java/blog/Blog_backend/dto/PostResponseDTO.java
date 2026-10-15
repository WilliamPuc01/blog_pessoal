package blog.Blog_backend.dto;

import blog.Blog_backend.entities.Category;
import blog.Blog_backend.entities.Post;
import blog.Blog_backend.entities.enums.PostStatus;

import java.util.Date;
import java.util.List;

/** Detalhe do post. Nunca expõe a entidade User (que tem passwordHash). */
public record PostResponseDTO(
        String id,
        String title,
        String slug,
        String summary,
        String content,
        String coverImage,
        PostStatus status,
        AuthorDTO author,
        Category category,
        List<String> tags,
        Date publishedAt,
        Date createdAt,
        Date updatedAt
) {
    public PostResponseDTO(Post p) {
        this(p.getId(), p.getTitle(), p.getSlug(), p.getSummary(), p.getContent(),
                p.getCoverImage(), p.getStatus(),
                p.getAuthor() != null ? new AuthorDTO(p.getAuthor()) : null,
                p.getCategory(), p.getTags(), p.getPublishedAt(), p.getCreatedAt(), p.getUpdatedAt());
    }
}