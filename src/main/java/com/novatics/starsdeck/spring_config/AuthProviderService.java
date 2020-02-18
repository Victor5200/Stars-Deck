//TODO : a implmentar spring security

/*
package com.novatics.starsdeck.spring_config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;

@Component
public class AuthProviderService implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        String login = auth.getName();
        String senha = auth.getCredentials().toString();
        return new UsernamePasswordAuthenticationToken("admin", "123", Collections.emptyList());
    }

    @Override
    public boolean supports(Class<?> auth) {
        return auth.equals(UsernamePasswordAuthenticationToken.class);
    }

}*/
