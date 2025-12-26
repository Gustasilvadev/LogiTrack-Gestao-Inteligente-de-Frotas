package com.projeto.logitrack.dto.response;

public class JwtTokenResponse {

    private String token;
    private String nome;
    private String email;
    private String roleName;

    // Construtor vazio para o Jackson (JSON)
    public JwtTokenResponse() {
    }

    public JwtTokenResponse(String token, String nome, String email, String roleName) {
        this.token = token;
        this.nome = nome;
        this.email = email;
        this.roleName = roleName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}