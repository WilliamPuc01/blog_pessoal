package blog.Blog_backend.services;

import blog.Blog_backend.entities.Category;
import blog.Blog_backend.entities.Post;
import blog.Blog_backend.entities.enums.PostStatus;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

/**
 * Categoria e tags ficam embutidas nos posts (não têm coleção própria),
 * então as listagens são feitas com "distinct" na coleção de posts.
 */
@Service
public class CategoryService {

    private final MongoTemplate mongoTemplate;

    public CategoryService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<Category> listarCategorias() {
        Query publicados = new Query(Criteria.where("status").is(PostStatus.PUBLISHED)
                .and("category").ne(null));
        return mongoTemplate.findDistinct(publicados, "category", Post.class, Category.class)
                .stream()
                .distinct()
                .sorted(Comparator.comparing(Category::getName, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    public List<String> listarTags() {
        Query publicados = new Query(Criteria.where("status").is(PostStatus.PUBLISHED));
        return mongoTemplate.findDistinct(publicados, "tags", Post.class, String.class)
                .stream()
                .sorted()
                .toList();
    }
}