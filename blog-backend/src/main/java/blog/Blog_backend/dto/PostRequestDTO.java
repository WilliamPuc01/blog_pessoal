package blog.Blog_backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class PostRequestDTO {

    @NotBlank(message = "O título é obrigatório")
    private String title;

    @NotBlank(message = "O slug é obrigatório")
    private String slug;

    private String summary;

    @NotBlank(message = "O conteúdo é obrigatório")
    private String content;

    private String coverImage;
    private String status;
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

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAuthorId() { return authorId; }
    public void setAuthorId(String authorId) { this.authorId = authorId; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getCategorySlug() { return categorySlug; }
    public void setCategorySlug(String categorySlug) { this.categorySlug = categorySlug; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}