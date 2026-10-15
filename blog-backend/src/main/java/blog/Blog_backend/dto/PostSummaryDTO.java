package blog.Blog_backend.dto;

import blog.Blog_backend.entities.Category;
import blog.Blog_backend.entities.Post;

import java.util.Date;
import java.util.List;

/** Item da listagem pública (sem o content, que pode ser grande). */
public record PostSummaryDTO(
        String id,
        String title,
        String slug,
        String summary,
        String coverImage,
        AuthorDTO author,
        Category category,
        List<String> tags,
        Date publishedAt
) {
    public PostSummaryDTO(Post p) {
        this(p.getId(), p.getTitle(), p.getSlug(), p.getSummary(), p.getCoverImage(),
                p.getAuthor() != null ? new AuthorDTO(p.getAuthor()) : null,
                p.getCategory(), p.getTags(), p.getPublishedAt());
    }
}