package blog.Blog_backend.controller;

import blog.Blog_backend.entities.Category;
import blog.Blog_backend.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> listarCategorias() {
        return ResponseEntity.ok(categoryService.listarCategorias());
    }

    @GetMapping("/tags")
    public ResponseEntity<List<String>> listarTags() {
        return ResponseEntity.ok(categoryService.listarTags());
    }
}