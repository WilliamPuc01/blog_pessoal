package blog.Blog_backend.util;

import java.text.Normalizer;
import java.util.Locale;

public final class SlugUtil {

    private SlugUtil() {
    }

    /** "Olá, Mundo! Spring Boot" -> "ola-mundo-spring-boot" */
    public static String toSlug(String input) {
        if (input == null) return "";
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");          // remove acentos
        return normalized.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9\\s-]", "")    // remove pontuação
                .trim()
                .replaceAll("[\\s-]+", "-");         // espaços -> hífen
    }
}