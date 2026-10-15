package blog.Blog_backend.services;



import blog.Blog_backend.dto.UserRequestDTO;
import blog.Blog_backend.dto.UserResponseDTO;
import blog.Blog_backend.entities.User;
import blog.Blog_backend.entities.enums.Role;
import blog.Blog_backend.exceptions.ConflictException;
import blog.Blog_backend.exceptions.ResourceNotFoundException;
import blog.Blog_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDTO salvar(UserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new ConflictException("E-mail já cadastrado");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        // Em um ambiente de produção, utilize PasswordEncoder (ex: BCrypt) antes de salvar
        user.setPasswordHash(dto.getPassword());
        user.setRole(dto.getRole() != null ? dto.getRole() : Role.ADMIN);
        user.setCreatedAt(new Date());

        User userSalvo = userRepository.save(user);
        return new UserResponseDTO(userSalvo);
    }

    public List<UserResponseDTO> listarTodos() {
        return userRepository.findAll()
                .stream()
                .map(UserResponseDTO::new)
                .collect(Collectors.toList());
    }

    public UserResponseDTO buscarPorId(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        return new UserResponseDTO(user);
    }
}