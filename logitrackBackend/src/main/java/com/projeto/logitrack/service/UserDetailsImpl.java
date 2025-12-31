package com.projeto.logitrack.service;

import com.projeto.logitrack.entity.User;
import com.projeto.logitrack.enums.LogicalStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {

    private User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRole()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().toString()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // O usuário só pode logar se estiver ATIVO
        return user.getLogicalStatus() == LogicalStatus.ATIVO;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Se estiver INATIVO (0), APAGADO (-1), a conta está "travada"
        return user.getLogicalStatus() != LogicalStatus.APAGADO;
    }

}
