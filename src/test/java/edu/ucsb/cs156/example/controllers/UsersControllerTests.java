package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.repositories.UserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UsersController.class)
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

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void users__admin_logged_in() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().isOk());
  }
}
