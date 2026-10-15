package blog.Blog_backend.repository;

import blog.Blog_backend.entities.Post;
import blog.Blog_backend.entities.enums.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    Optional<Post> findBySlug(String slug);

    // Usado na área pública: só retorna se estiver publicado
    Optional<Post> findBySlugAndStatus(String slug, PostStatus status);

    boolean existsBySlug(String slug);

    List<Post> findByAuthorId(String authorId);

    Page<Post> findByStatus(PostStatus status, Pageable pageable);

    Page<Post> findByStatusAndCategorySlug(PostStatus status, String categorySlug, Pageable pageable);

    Page<Post> findByStatusAndTagsContaining(PostStatus status, String tag, Pageable pageable);
}