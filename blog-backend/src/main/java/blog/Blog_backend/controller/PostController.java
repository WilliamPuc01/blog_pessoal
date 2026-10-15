package blog.Blog_backend.controller;

import blog.Blog_backend.dto.PageResponseDTO;
import blog.Blog_backend.dto.PostResponseDTO;
import blog.Blog_backend.dto.PostSummaryDTO;
import blog.Blog_backend.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Rotas públicas de posts: só retornam posts PUBLISHED. */
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // GET /api/posts?page=0&size=10&category=java&tag=spring
    @GetMapping
    public ResponseEntity<PageResponseDTO<PostSummaryDTO>> listar(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tag) {
        return ResponseEntity.ok(postService.listarPublicados(page, size, category, tag));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PostResponseDTO> buscarPorSlug(@PathVariable String slug) {
        return ResponseEntity.ok(postService.buscarPublicadoPorSlug(slug));
    }
}