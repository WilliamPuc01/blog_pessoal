package blog.Blog_backend.repository;

import blog.Blog_backend.entities.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    Optional<Project> findBySlug(String slug);

    List<Project> findByAuthorId(String authorId);

    // Lista projetos destacados na tela inicial (featured = true)
    List<Project> findByFeaturedTrue();
}