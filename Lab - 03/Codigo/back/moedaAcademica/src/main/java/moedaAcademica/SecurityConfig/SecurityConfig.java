package moedaAcademica.SecurityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // desabilita proteção CSRF para permitir POST via ferramentas como Postman
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // permite todas as rotas
            )
            .httpBasic().disable()
            .formLogin().disable();
        return http.build();
    }
}
