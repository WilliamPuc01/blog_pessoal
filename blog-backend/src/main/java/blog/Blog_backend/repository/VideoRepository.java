package blog.Blog_backend.repository;

import blog.Blog_backend.entities.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {

    // Busca pelo ID único do YouTube
    Optional<Video> findByYoutubeId(String youtubeId);
}