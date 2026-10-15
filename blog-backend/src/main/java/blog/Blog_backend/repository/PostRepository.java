package blog.Blog_backend.repository;

import blog.Blog_backend.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    // Busca um post pelo seu slug único
    Optional<Post> findBySlug(String slug);

    // Lista todos os posts criados por um determinado autor
    List<Post> findByAuthorId(String authorId);

    // Lista posts por status (ex: "PUBLISHED", "DRAFT")
    List<Post> findByStatus(String status);
}