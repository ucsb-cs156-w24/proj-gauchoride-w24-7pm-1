package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.controllers.UserInfoController;
import edu.ucsb.cs156.gauchoride.models.CurrentUser;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserInfoController.class)
@Import(TestConfig.class)
public class UserInfoControllerTests extends ControllerTestCase {

  @MockBean
  UserRepository userRepository;

  @Test
  public void currentUser__logged_out() throws Exception {
    mockMvc.perform(get("/api/currentUser"))
        .andExpect(status().is(403));
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void currentUser__logged_in() throws Exception {

    // arrange

    CurrentUser currentUser = currentUserService.getCurrentUser();
    String expectedJson = mapper.writeValueAsString(currentUser);

    // act

    MvcResult response = mockMvc.perform(get("/api/currentUser"))
        .andExpect(status().isOk()).andReturn();

    // assert
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }
}
