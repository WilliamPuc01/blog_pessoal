package blog.Blog_backend.controller;

import blog.Blog_backend.dto.PostRequestDTO;
import blog.Blog_backend.dto.PostResponseDTO;
import blog.Blog_backend.services.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/** CRUD de posts do admin (inclui rascunhos). Proteger com JWT no próximo passo. */
@RestController
@RequestMapping("/api/admin/posts")
public class AdminPostController {

    private final PostService postService;

    public AdminPostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<PostResponseDTO> cadastrar(@Valid @RequestBody PostRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.salvar(dto));
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> listarTodos() {
        return ResponseEntity.ok(postService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(postService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDTO> alterar(@PathVariable String id, @Valid @RequestBody PostRequestDTO dto) {
        return ResponseEntity.ok(postService.alterar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable String id) {
        postService.remover(id);
        return ResponseEntity.noContent().build();
    }
}