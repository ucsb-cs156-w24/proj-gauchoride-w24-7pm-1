package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.models.CurrentUser;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.http.MediaType;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
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


@WebMvcTest(controllers = UserProfileController.class)
@Import(TestConfig.class)
public class UserProfileControllerTests extends ControllerTestCase{

@MockBean
  UserRepository userRepository;

  @WithMockUser(roles = {})
  @Test
  public void user_not_logged_in() throws Exception {
    mockMvc.perform(put("/api/userprofile/update-cellPhone?cellPhone=111-222-3333"))
        .andExpect(status().is(403));
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void User_can_change_their_phone_Number1() throws Exception {
          // arrange
          User user = currentUserService.getCurrentUser().getUser();
          
          when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

          // act
          MvcResult response = mockMvc.perform(
                          put("/api/userprofile/update-cellPhone?cellPhone=111-222-3333")
                            .with(csrf()))
                            .andExpect(status().isNotFound()).andReturn();
          // assert
          verify(userRepository, times(1)).findById(user.getId());
          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id %s not found".formatted(user.getId()), json.get("message"));

         
  }
  

  @WithMockUser(roles = { "USER" })
  @Test
  public void User_can_change_their_phone_Number() throws Exception {
          // arrange
          User user = currentUserService.getCurrentUser().getUser();

          User userAfter = User.builder()
          .id(user.getId())
          .admin(user.getAdmin())
          .driver(user.getDriver())
          .email(user.getEmail())
          .emailVerified(user.getEmailVerified())
          .familyName(user.getFamilyName())
          .fullName(user.getFullName())
          .givenName(user.getGivenName())
          .googleSub(user.getGoogleSub())
          .rider(user.getRider())
          .locale(user.getLocale())
          .pictureUrl(user.getPictureUrl())
          .hostedDomain(user.getHostedDomain())
          .cellPhone("111-222-3333")
          .build();


          when(userRepository.findById(eq(user.getId()))).thenReturn(Optional.of(user));
          when(userRepository.save(eq(userAfter))).thenReturn(userAfter);

          // act
          MvcResult response = mockMvc.perform(
                          put("/api/userprofile/update-cellPhone?cellPhone=111-222-3333")
                            .with(csrf()))
                            .andExpect(status().isOk())
                            .andReturn();

          // assert
          verify(userRepository, times(1)).findById(user.getId());
          verify(userRepository, times(1)).save(userAfter);
          Map<String, Object> json = responseToJson(response);
          assertEquals("User with id %s has cellPhone 111-222-3333".formatted(user.getId()), json.get("message"));

         
  }

}
