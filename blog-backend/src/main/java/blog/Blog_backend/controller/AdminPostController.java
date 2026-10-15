package blog.Blog_backend.controller;

import blog.Blog_backend.dto.PostRequestDTO;
import blog.Blog_backend.entities.Post;
import blog.Blog_backend.services.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/posts")
public class AdminPostController {

    private final PostService postService;

    public AdminPostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<Post> cadastrar(@Valid @RequestBody PostRequestDTO dto) {
        Post novoPost = postService.salvar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPost);
    }

    @GetMapping
    public ResponseEntity<List<Post>> listarTodos() {
        return ResponseEntity.ok(postService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(postService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> alterar(@PathVariable String id, @Valid @RequestBody PostRequestDTO dto) {
        Post postAtualizado = postService.alterar(id, dto);
        return ResponseEntity.ok(postAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable String id) {
        postService.remover(id);
        return ResponseEntity.noContent().build();
    }
}