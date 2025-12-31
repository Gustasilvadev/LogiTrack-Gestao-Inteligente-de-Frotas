package com.projeto.logitrack.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    @Autowired
    private UserAuthenticationFilter userAuthenticationFilter;

    // Endpoints do swagger
    public static final String[] SWAGGER_ENDPOINTS = {
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-ui",
            "/swagger-ui/**",
            "/swagger-ui.html",
    };

    // Endpoints que não requerem autenticação
    public static final String[] ENDPOINTS_SEM_AUTENTICACAO = {
            "/api/users/loginUser"
    };

    public static final String[] ENDPOINTS_COMPARTILHADOS = {
            "/api/users/{id}/status",
            "/api/carriers/{id}/status",
            "/api/users/update/{id}"
    };

    public static final String[] ENDPOINTS_MANAGER = {
            "/api/users/createOperator",
            "/api/users/listTeam",
            "/api/users/deleteUserById/**",
            "/api/vehicles/createVehicle",
            "/api/vehicles/deleteVehicleById/**",
            "/api/history/deleteHistoryById/**",

    };

    // Endpoints que requerem autenticação básica
    public static final String[] ENDPOINTS_AUTENTICADOS = {
            "/usuario/teste/autenticacao"
    };

    // Endpoints exclusivos para clientes
    public static final String[] ENDPOINTS_OPERATOR = {
            "/api/vehicles/listVehicles",
            "/api/vehicles/listVehicleById/**",
            "/api/vehicles/updateVehicleStatusById/**", // Operador move o caminhão
            "/api/history/listHistoryByCarrier",
            "/api/carriers/myCarrier"
    };

    // Endpoints exclusivos para administradores
    public static final String[] ENDPOINTS_ADMIN = {
            "/api/carriers/createCarrier",
            "/api/carriers/listCarrier",
            "/api/carriers/listCarrierActive",
            "/api/carriers/listCarrierById/**",
            "/api/carriers/updateCarrierById/**",
            "/api/carriers/deleteCarrierById/**",
            "/api/users/listAllManagerOperators",
            "/api/users/createManager",
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(SWAGGER_ENDPOINTS).permitAll()
                        .requestMatchers(ENDPOINTS_SEM_AUTENTICACAO).permitAll()
                        .requestMatchers(ENDPOINTS_COMPARTILHADOS).hasAnyRole("ADMIN", "MANAGER")
                        .requestMatchers(ENDPOINTS_MANAGER).hasRole("MANAGER")
                        .requestMatchers(ENDPOINTS_OPERATOR).hasAnyRole("MANAGER", "OPERATOR")
                        .requestMatchers(ENDPOINTS_ADMIN).hasRole("ADMIN")
                        .requestMatchers(ENDPOINTS_AUTENTICADOS).authenticated()
                        .anyRequest().denyAll()
                )
                .addFilterBefore(userAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}