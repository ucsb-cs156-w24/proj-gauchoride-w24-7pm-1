package edu.ucsb.cs156.gauchoride.interceptors;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.mock.web.MockHttpServletResponse;

import java.util.Collection;
import java.util.Map;
import java.util.HashSet;
import java.util.HashMap;
import java.util.Set;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

// Implements tests loosely following 
// https://medium.com/@nooneypradeep/spring-boot-interceptor-with-unit-testing-825cda41f618

@SpringBootTest
@AutoConfigureMockMvc
public class RoleInterceptorTests extends ControllerTestCase {

        @MockBean
        UserRepository userRepository;

        @Autowired
        private RequestMappingHandlerMapping mapping;

        @BeforeEach
        public void mockLogin() {
                Map<String, Object> attributes = new HashMap<>();
                attributes.put("sub", "mockSub");
                attributes.put("name", "mockOauthUserName");
                attributes.put("email", "mockOauth@gmail.com");

                Set<GrantedAuthority> fakeAuthorities = new HashSet<>();
                fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_DRIVER"));
                fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                fakeAuthorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));

                OAuth2User mockUser = new DefaultOAuth2User(fakeAuthorities, attributes, "name");
                Authentication authentication = new OAuth2AuthenticationToken(mockUser, fakeAuthorities,
                                "mockUserRegistrationId");

                SecurityContextHolder.setContext(SecurityContextHolder.createEmptyContext());
                SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        @Test
        public void RoleInterceptorIsPresent() throws Exception {

                MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/currentUser");

                HandlerExecutionChain chain = mapping.getHandler(request);

                assert chain != null;
                Optional<HandlerInterceptor> RoleInterceptor = chain.getInterceptorList()
                                .stream()
                                .filter(RoleInterceptor.class::isInstance)
                                .findFirst();

                assertTrue(RoleInterceptor.isPresent());
        }
}