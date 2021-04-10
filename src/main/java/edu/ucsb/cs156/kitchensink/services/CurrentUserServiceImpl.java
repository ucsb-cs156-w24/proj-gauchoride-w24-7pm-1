package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.User;
import edu.ucsb.cs156.kitchensink.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Slf4j
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
      String googleSub = oAuthUser.getAttribute("sub");
      String pictureUrl = oAuthUser.getAttribute("picture");
      String fullName = oAuthUser.getAttribute("name");
      String givenName = oAuthUser.getAttribute("given_name");
      String familyName = oAuthUser.getAttribute("family_name");
      boolean emailVerified = oAuthUser.getAttribute("email_verified");
      String locale = oAuthUser.getAttribute("locale");
      String hostedDomain = oAuthUser.getAttribute("hd");

      java.util.Map<java.lang.String,java.lang.Object> attrs = oAuthUser.getAttributes();
      log.info("attrs={}",attrs);

      return userRepository.findByEmail(email)
          .orElseGet(
              () ->
                  User.builder()
                      .googleSub(googleSub)
                      .email(email)
                      .pictureUrl(pictureUrl)
                      .fullName(fullName)
                      .givenName(givenName)
                      .familyName(familyName)
                      .emailVerified(emailVerified)
                      .locale(locale)
                      .hostedDomain(hostedDomain)
                      .build()
          );
    }

    return null;
  }
}
