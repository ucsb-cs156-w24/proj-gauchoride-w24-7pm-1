package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.FlashAttributeResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@WebMvcTest(controllers = UsersController.class)
@Import(TestConfig.class)
public class UsersControllerTests extends ControllerTestCase {

  @MockBean
  UserRepository userRepository;

  @Test
  public void users__logged_out() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().is(403));
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void users__user_logged_in() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().is(403));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void users__admin_logged_in() throws Exception {

    // arrange

    User u1 = User.builder().id(1L).build();
    User u2 = User.builder().id(2L).build();
    User u = currentUserService.getCurrentUser().getUser();

    ArrayList<User> expectedUsers = new ArrayList<>();
    expectedUsers.addAll(Arrays.asList(u1, u2, u));

    when(userRepository.findAll()).thenReturn(expectedUsers);
    String expectedJson = mapper.writeValueAsString(expectedUsers);
    
    // act

    MvcResult response = mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().isOk()).andReturn();

    // assert

    verify(userRepository, times(1)).findAll();
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);

  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void api_users__admin_logged_in__returns_a_user_that_exists() throws Exception {

      // arrange

      User u = currentUserService.getCurrentUser().getUser();
      User user1 = User.builder().email("cgaucho@ucsb.edu").id(42L).build();
      when(userRepository.findById(eq(42L))).thenReturn(Optional.of(user1));

      // act
      MvcResult response = mockMvc.perform(get("/api/admin/users/get?id=42"))
              .andExpect(status().isOk()).andReturn();

      // assert

      verify(userRepository, times(1)).findById(42L);
      String expectedJson = mapper.writeValueAsString(user1);
      String responseString = response.getResponse().getContentAsString();
      assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void api_users__admin_logged_in__search_for_user_that_does_not_exist() throws Exception {

      // arrange

      User u = currentUserService.getCurrentUser().getUser();

      when(userRepository.findById(eq(7L))).thenReturn(Optional.empty());

      // act
      MvcResult response = mockMvc.perform(get("/api/admin/users/get?id=7"))
              .andExpect(status().isNotFound()).andReturn();

      // assert

      // verify(userRepository, times(1)).findById(7L);
      Map<String, Object> json = responseToJson(response);
      assertEquals("EntityNotFoundException", json.get("type"));
      assertEquals("User with id 7 not found", json.get("message"));
  }



  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_can_delete_a_user() throws Exception {
          // arrange
          User user1 = User.builder().email("cgaucho@ucsb.edu").id(15L).build();

    
          when(userRepository.findById(eq(15L))).thenReturn(Optional.of(user1));

          // act
          MvcResult response = mockMvc.perform(
                          delete("/api/admin/users/delete?id=15")
                                          .with(csrf()))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
          verify(userRepository, times(1)).delete(any());

          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 deleted", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_tries_to_delete_non_existant_user_and_gets_right_error_message()
                  throws Exception {
          // arrange

          when(userRepository.findById(eq(15L))).thenReturn(Optional.empty());

          // act
          MvcResult response = mockMvc.perform(
                          delete("/api/admin/users/delete?id=15")
                                          .with(csrf()))
                          .andExpect(status().isNotFound()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 not found", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_can_toggle_admin_status_of_a_user_from_false_to_true() throws Exception {
          // arrange
          User userBefore = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .admin(false)
          .build();

          User userAfter = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .admin(true)
          .build();

    
          when(userRepository.findById(eq(15L))).thenReturn(Optional.of(userBefore));
          when(userRepository.save(eq(userAfter))).thenReturn(userAfter);
          // act
          MvcResult response = mockMvc.perform(
                          post("/api/admin/users/toggleAdmin?id=15")
                                          .with(csrf()))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
          verify(userRepository, times(1)).save(userAfter);

          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 has toggled admin status", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_can_toggle_admin_status_of_a_user_from_true_to_false() throws Exception {
          // arrange
          User userBefore = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .admin(true)
          .build();

          User userAfter = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .admin(false)
          .build();

    
          when(userRepository.findById(eq(15L))).thenReturn(Optional.of(userBefore));
          when(userRepository.save(eq(userAfter))).thenReturn(userAfter);
          // act
          MvcResult response = mockMvc.perform(
                          post("/api/admin/users/toggleAdmin?id=15")
                                          .with(csrf()))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
          verify(userRepository, times(1)).save(userAfter);

          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 has toggled admin status", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_tries_to_toggleAdmin_non_existant_user_and_gets_right_error_message() throws Exception {
          // arrange
        
    
          when(userRepository.findById(eq(15L))).thenReturn(Optional.empty());
          
          // act
          MvcResult response = mockMvc.perform(
                          post("/api/admin/users/toggleAdmin?id=15")
                                          .with(csrf()))
                          .andExpect(status().isNotFound()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
         

          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 not found", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_can_toggle_driver_status_of_a_user_from_false_to_true() throws Exception {
          // arrange
          User userBefore = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .driver(false)
          .build();

          User userAfter = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .driver(true)
          .build();

    
          when(userRepository.findById(eq(15L))).thenReturn(Optional.of(userBefore));
          when(userRepository.save(eq(userAfter))).thenReturn(userAfter);
          // act
          MvcResult response = mockMvc.perform(
                          post("/api/admin/users/toggleDriver?id=15")
                                          .with(csrf()))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
          verify(userRepository, times(1)).save(userAfter);

          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 has toggled driver status", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_can_toggle_driver_status_of_a_user_from_true_to_false() throws Exception {
          // arrange
          User userBefore = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .driver(true)
          .build();

          User userAfter = User.builder()
          .email("cgaucho@ucsb.edu")
          .id(15L)
          .driver(false)
          .build();

    
          when(userRepository.findById(eq(15L))).thenReturn(Optional.of(userBefore));
          when(userRepository.save(eq(userAfter))).thenReturn(userAfter);
          // act
          MvcResult response = mockMvc.perform(
                          post("/api/admin/users/toggleDriver?id=15")
                                          .with(csrf()))
                          .andExpect(status().isOk()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
          verify(userRepository, times(1)).save(userAfter);

          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 has toggled driver status", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN", "USER" })
  @Test
  public void admin_tries_to_toggleDriver_non_existant_user_and_gets_right_error_message() throws Exception {
          // arrange
        
    
          when(userRepository.findById(eq(15L))).thenReturn(Optional.empty());
          
          // act
          MvcResult response = mockMvc.perform(
                          post("/api/admin/users/toggleDriver?id=15")
                                          .with(csrf()))
                          .andExpect(status().isNotFound()).andReturn();

          // assert
          verify(userRepository, times(1)).findById(15L);
         

          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id 15 not found", json.get("message"));
  }
}
