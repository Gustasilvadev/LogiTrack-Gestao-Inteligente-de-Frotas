package com.projeto.logitrack.config;

import com.projeto.logitrack.entity.User;
import com.projeto.logitrack.repository.UserRepository;
import com.projeto.logitrack.service.JwtTokenService;
import com.projeto.logitrack.service.UserDetailsImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
public class UserAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = recoveryToken(request);

        if (token != null) {
            try {
                String subject = jwtTokenService.getSubjectFromToken(token);

                User user = userRepository.findByEmail(subject)
                        .orElseThrow(() -> new RuntimeException("Usuário não encontrado no banco de dados."));

                UserDetailsImpl userDetails = new UserDetailsImpl(user);

                // CORREÇÃO CRÍTICA: Passamos o objeto 'userDetails' como principal, não apenas a String username.
                // Isso permite que o @AuthenticationPrincipal funcione no Controller.
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // Em caso de token inválido ou erro, limpamos o contexto por segurança
                SecurityContextHolder.clearContext();
                // Opcional: Você pode enviar um erro customizado aqui se quiser interromper a requisição
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoveryToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Forma mais limpa que o replace
        }
        return null;
    }
}