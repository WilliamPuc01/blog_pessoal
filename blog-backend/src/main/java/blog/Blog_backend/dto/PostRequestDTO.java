package blog.Blog_backend.dto;

import blog.Blog_backend.entities.enums.PostStatus;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class PostRequestDTO {

    @NotBlank(message = "O título é obrigatório")
    private String title;

    // Opcional: se vier vazio, é gerado a partir do título
    private String slug;

    private String summary;

    @NotBlank(message = "O conteúdo é obrigatório")
    private String content;

    private String coverImage;

    // Se não vier, o post é criado como DRAFT
    private PostStatus status;

    // Temporário: quando tiver JWT, o autor sai do usuário logado
    private String authorId;

    private String categoryName;
    private String categorySlug;
    private List<String> tags;

    public PostRequestDTO() {
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public PostStatus getStatus() { return status; }
    public void setStatus(PostStatus status) { this.status = status; }

    public String getAuthorId() { return authorId; }
    public void setAuthorId(String authorId) { this.authorId = authorId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getCategorySlug() { return categorySlug; }
    public void setCategorySlug(String categorySlug) { this.categorySlug = categorySlug; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}