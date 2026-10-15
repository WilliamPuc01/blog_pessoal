package blog.Blog_backend.services;

import blog.Blog_backend.dto.PageResponseDTO;
import blog.Blog_backend.dto.PostRequestDTO;
import blog.Blog_backend.dto.PostResponseDTO;
import blog.Blog_backend.dto.PostSummaryDTO;
import blog.Blog_backend.entities.Category;
import blog.Blog_backend.entities.Post;
import blog.Blog_backend.entities.User;
import blog.Blog_backend.entities.enums.PostStatus;
import blog.Blog_backend.exceptions.ConflictException;
import blog.Blog_backend.exceptions.ResourceNotFoundException;
import blog.Blog_backend.repository.PostRepository;
import blog.Blog_backend.repository.UserRepository;
import blog.Blog_backend.util.SlugUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PostService {

    private static final int MAX_PAGE_SIZE = 50;

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // ===================== ÁREA PÚBLICA =====================

    public PageResponseDTO<PostSummaryDTO> listarPublicados(int page, int size, String category, String tag) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), MAX_PAGE_SIZE),
                Sort.by(Sort.Direction.DESC, "publishedAt"));

        Page<Post> posts;
        if (category != null && !category.isBlank()) {
            posts = postRepository.findByStatusAndCategorySlug(PostStatus.PUBLISHED, category, pageable);
        } else if (tag != null && !tag.isBlank()) {
            posts = postRepository.findByStatusAndTagsContaining(PostStatus.PUBLISHED, tag, pageable);
        } else {
            posts = postRepository.findByStatus(PostStatus.PUBLISHED, pageable);
        }
        return PageResponseDTO.of(posts.map(PostSummaryDTO::new));
    }

    public PostResponseDTO buscarPublicadoPorSlug(String slug) {
        Post post = postRepository.findBySlugAndStatus(slug, PostStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Post não encontrado"));
        return new PostResponseDTO(post);
    }

    // ===================== ÁREA ADMIN =====================

    public PostResponseDTO salvar(PostRequestDTO dto) {
        Post post = new Post();
        aplicarDados(post, dto);
        post.setSlug(gerarSlugUnico(dto.getSlug(), dto.getTitle(), null));

        if (dto.getAuthorId() != null) {
            User author = userRepository.findById(dto.getAuthorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Autor não encontrado"));
            post.setAuthor(author);
        }

        Date agora = new Date();
        post.setCreatedAt(agora);
        post.setUpdatedAt(agora);

        return new PostResponseDTO(postRepository.save(post));
    }

    public List<PostResponseDTO> listarTodos() {
        return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream().map(PostResponseDTO::new).toList();
    }

    public PostResponseDTO buscarPorId(String id) {
        return new PostResponseDTO(buscarEntidade(id));
    }

    public PostResponseDTO alterar(String id, PostRequestDTO dto) {
        Post post = buscarEntidade(id);
        aplicarDados(post, dto);

        // Só mexe no slug se o admin mandou um novo explicitamente
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            post.setSlug(gerarSlugUnico(dto.getSlug(), dto.getTitle(), post.getId()));
        }

        post.setUpdatedAt(new Date());
        return new PostResponseDTO(postRepository.save(post));
    }

    public void remover(String id) {
        postRepository.delete(buscarEntidade(id));
    }

    // ===================== AUXILIARES =====================

    private Post buscarEntidade(String id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post não encontrado"));
    }

    /** Campos comuns entre criar e alterar. */
    private void aplicarDados(Post post, PostRequestDTO dto) {
        post.setTitle(dto.getTitle());
        post.setSummary(dto.getSummary());
        post.setContent(dto.getContent());
        post.setCoverImage(dto.getCoverImage());
        post.setTags(dto.getTags() != null ? normalizarTags(dto.getTags()) : new ArrayList<>());

        if (dto.getCategoryName() != null && !dto.getCategoryName().isBlank()) {
            String catSlug = (dto.getCategorySlug() != null && !dto.getCategorySlug().isBlank())
                    ? SlugUtil.toSlug(dto.getCategorySlug())
                    : SlugUtil.toSlug(dto.getCategoryName());
            post.setCategory(new Category(dto.getCategoryName().trim(), catSlug));
        } else {
            post.setCategory(null);
        }

        PostStatus novoStatus = dto.getStatus() != null ? dto.getStatus() : PostStatus.DRAFT;
        // Preenche publishedAt na primeira vez que o post é publicado
        if (novoStatus == PostStatus.PUBLISHED && post.getPublishedAt() == null) {
            post.setPublishedAt(new Date());
        }
        post.setStatus(novoStatus);
    }

    private List<String> normalizarTags(List<String> tags) {
        return tags.stream()
                .filter(t -> t != null && !t.isBlank())
                .map(SlugUtil::toSlug)
                .distinct()
                .toList();
    }

    /**
     * Usa o slug informado (ou o título) e, se já existir em outro post,
     * acrescenta -2, -3...
     */
    private String gerarSlugUnico(String slugInformado, String titulo, String idAtual) {
        String base = SlugUtil.toSlug(
                slugInformado != null && !slugInformado.isBlank() ? slugInformado : titulo);
        if (base.isBlank()) {
            throw new ConflictException("Não foi possível gerar um slug válido");
        }

        String candidato = base;
        int i = 2;
        while (slugEmUsoPorOutro(candidato, idAtual)) {
            candidato = base + "-" + i++;
        }
        return candidato;
    }

    private boolean slugEmUsoPorOutro(String slug, String idAtual) {
        return postRepository.findBySlug(slug)
                .map(p -> !p.getId().equals(idAtual))
                .orElse(false);
    }
}