package com.projeto.logitrack.dto.response;

public class JwtTokenResponse {

    private String token;

    public JwtTokenResponse() {
    }

    public JwtTokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
