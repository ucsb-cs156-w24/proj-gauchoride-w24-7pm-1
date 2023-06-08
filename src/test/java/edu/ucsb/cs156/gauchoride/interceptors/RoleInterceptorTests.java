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
                attributes.put("sub", "sub");
                attributes.put("name", "name");
                attributes.put("email", "cgaucho@ucsb.edu"); // this needs to match email below
                attributes.put("picture", "picture");
                attributes.put("given_name", "given_name");
                attributes.put("family_name", "family_name");
                attributes.put("email_verified", true);
                attributes.put("locale", "locale");
                attributes.put("hd", "hd");

                Set<GrantedAuthority> authorities = new HashSet<>();
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                authorities.add(new SimpleGrantedAuthority("ROLE_DRIVER"));
                authorities.add(new SimpleGrantedAuthority("ROLE_MEMBER"));

                OAuth2User user = new DefaultOAuth2User(authorities, attributes, "name");
                Authentication authentication = new OAuth2AuthenticationToken(user, authorities,
                                "userRegistrationId");

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

        @Test
        public void updates_admin_role_when_user_admin_false() throws Exception {
                User user = User.builder()
                                .email("cgaucho@ucsb.edu")
                                .id(15L)
                                .admin(false)
                                .driver(true)
                                .build();
                when(userRepository.findByEmail("cgaucho@ucsb.edu")).thenReturn(Optional.of(user));

                MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/currentUser");
                HandlerExecutionChain chain = mapping.getHandler(request);
                MockHttpServletResponse response = new MockHttpServletResponse();

                assert chain != null;
                Optional<HandlerInterceptor> RoleInterceptor = chain.getInterceptorList()
                                .stream()
                                .filter(RoleInterceptor.class::isInstance)
                                .findFirst();

                assertTrue(RoleInterceptor.isPresent());

                RoleInterceptor.get().preHandle(request, response, chain.getHandler());

                verify(userRepository, times(1)).findByEmail("cgaucho@ucsb.edu");

                Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext()
                                .getAuthentication().getAuthorities();

                boolean role_admin = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_ADMIN"));
                boolean role_driver = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_DRIVER"));
                boolean role_member = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_MEMBER"));
                assertFalse(role_admin, "ROLE_ADMIN should not be in roles list");
                assertTrue(role_driver, "ROLE_DRIVER should be in roles list");
                assertTrue(role_member, "ROLE_MEMBER should be in roles list");
        }

        @Test
        public void updates_driver_role_when_user_driver_false() throws Exception {
                User user = User.builder()
                                .email("cgaucho@ucsb.edu")
                                .id(15L)
                                .admin(true)
                                .driver(false)
                                .build();
                when(userRepository.findByEmail("cgaucho@ucsb.edu")).thenReturn(Optional.of(user));

                MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/currentUser");
                HandlerExecutionChain chain = mapping.getHandler(request);
                MockHttpServletResponse response = new MockHttpServletResponse();

                assert chain != null;
                Optional<HandlerInterceptor> RoleInterceptor = chain.getInterceptorList()
                                .stream()
                                .filter(RoleInterceptor.class::isInstance)
                                .findFirst();

                assertTrue(RoleInterceptor.isPresent());

                RoleInterceptor.get().preHandle(request, response, chain.getHandler());

                verify(userRepository, times(1)).findByEmail("cgaucho@ucsb.edu");

                Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext()
                                .getAuthentication().getAuthorities();

                boolean role_admin = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_ADMIN"));
                boolean role_driver = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_DRIVER"));
                boolean role_member = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_MEMBER"));
                assertTrue(role_admin, "ROLE_ADMIN should not be in roles list");
                assertFalse(role_driver, "ROLE_DRIVER should be in roles list");
                assertTrue(role_member, "ROLE_MEMBER should be in roles list");
        }

        @Test
        public void updates_nothing_when_user_not_present() throws Exception {
                User user = User.builder()
                                .email("cgaucho2@ucsb.edu")
                                .id(15L)
                                .admin(false)
                                .driver(false)
                                .build();
                when(userRepository.findByEmail("cgaucho2@ucsb.edu")).thenReturn(Optional.of(user));

                MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/currentUser");
                HandlerExecutionChain chain = mapping.getHandler(request);
                MockHttpServletResponse response = new MockHttpServletResponse();

                assert chain != null;
                Optional<HandlerInterceptor> RoleInterceptor = chain.getInterceptorList()
                                .stream()
                                .filter(RoleInterceptor.class::isInstance)
                                .findFirst();

                assertTrue(RoleInterceptor.isPresent());

                RoleInterceptor.get().preHandle(request, response, chain.getHandler());

                verify(userRepository, times(1)).findByEmail("cgaucho@ucsb.edu");

                Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext()
                                .getAuthentication().getAuthorities();

                boolean role_admin = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_ADMIN"));
                boolean role_driver = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_DRIVER"));
                boolean role_member = authorities.stream()
                                .anyMatch(grantedAuth -> grantedAuth.getAuthority().equals("ROLE_MEMBER"));
                assertTrue(role_admin, "ROLE_ADMIN should not be in roles list");
                assertTrue(role_driver, "ROLE_DRIVER should be in roles list");
                assertTrue(role_member, "ROLE_MEMBER should be in roles list");
        }
}