package edu.ucsb.cs156.gauchoride.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Optional;
import java.util.HashSet;
import java.util.Set;
import java.util.Collection;
import java.util.stream.Collectors;
import edu.ucsb.cs156.gauchoride.entities.User;

@Component
public class RoleAdminDriverInterceptor implements HandlerInterceptor {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Authentication newAuth = null;
        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2User principal = ((OAuth2AuthenticationToken) authentication).getPrincipal();
            if (principal != null) {
                String email = principal.getAttribute("email");
                Optional<User> optionalUser = userRepository.findByEmail(email);
                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();
                    Set<GrantedAuthority> revisedAuthorities = new HashSet<>();
                    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
                    revisedAuthorities = authorities.stream().filter(auth -> !auth.equals("ROLE_ADMIN"))
                            .collect(Collectors.toSet());
                    if (user.getAdmin()) {
                        revisedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                    }
                    if (user.getDriver()) {
                        revisedAuthorities.add(new SimpleGrantedAuthority("ROLE_DRIVER"));
                    }
                    newAuth = new OAuth2AuthenticationToken(principal, revisedAuthorities,
                            (((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId()));
                }
            }
        }
        SecurityContextHolder.getContext().setAuthentication(newAuth);
        return true;
    }
}