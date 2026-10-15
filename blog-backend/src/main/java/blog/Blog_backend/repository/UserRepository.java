package blog.Blog_backend.repository;

import blog.Blog_backend.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    // Busca um usuário pelo e-mail (usado no login/autenticação)
    Optional<User> findByEmail(String email);

    // Verifica se um e-mail já está cadastrado
    boolean existsByEmail(String email);
}