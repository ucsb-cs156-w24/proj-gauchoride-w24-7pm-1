package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.User;
import edu.ucsb.cs156.kitchensink.repositories.UserRepository;
import lombok.experimental.Delegate;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service("currentUser")
public class CurrentUserServiceImpl extends CurrentUserService {
  @Autowired
  private UserRepository userRepository;

  public User get() {
    SecurityContext securityContext = SecurityContextHolder.getContext();
    Authentication authentication = securityContext.getAuthentication();

    if (authentication instanceof OAuth2AuthenticationToken) {
      OAuth2User oAuthUser = ((OAuth2AuthenticationToken) authentication).getPrincipal();
      String email = oAuthUser.getAttribute("email");

      return userRepository.findByEmail(email)
          .orElseGet(
              () ->
                  User.builder()
                      .email(email)
                      .build()
          );
    }

    return null;
  }
}
