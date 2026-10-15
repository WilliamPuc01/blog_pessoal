package blog.Blog_backend.services;



import blog.Blog_backend.dto.PostRequestDTO;
import blog.Blog_backend.entities.Category;
import blog.Blog_backend.entities.Post;
import blog.Blog_backend.entities.User;
import blog.Blog_backend.repository.PostRepository;
import blog.Blog_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post salvar(PostRequestDTO dto) {
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setSlug(dto.getSlug());
        post.setSummary(dto.getSummary());
        post.setContent(dto.getContent());
        post.setCoverImage(dto.getCoverImage());
        post.setStatus(dto.getStatus());
        post.setTags(dto.getTags());

        if (dto.getCategoryName() != null && dto.getCategorySlug() != null) {
            post.setCategory(new Category(dto.getCategoryName(), dto.getCategorySlug()));
        }

        if (dto.getAuthorId() != null) {
            User author = userRepository.findById(dto.getAuthorId())
                    .orElseThrow(() -> new RuntimeException("Autor não encontrado"));
            post.setAuthor(author);
        }

        Date agora = new Date();
        post.setCreatedAt(agora);
        post.setUpdatedAt(agora);

        return postRepository.save(post);
    }

    public List<Post> listarTodos() {
        return postRepository.findAll();
    }

    public Post buscarPorId(String id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));
    }

    public Post alterar(String id, PostRequestDTO dto) {
        Post post = buscarPorId(id);
        post.setTitle(dto.getTitle());
        post.setSlug(dto.getSlug());
        post.setSummary(dto.getSummary());
        post.setContent(dto.getContent());
        post.setCoverImage(dto.getCoverImage());
        post.setStatus(dto.getStatus());
        post.setTags(dto.getTags());
        post.setUpdatedAt(new Date());

        return postRepository.save(post);
    }

    public void remover(String id) {
        Post post = buscarPorId(id);
        postRepository.delete(post);
    }
}
