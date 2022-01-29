package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.SystemInfoService;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(controllers = SystemInfoController.class)
public class SystemInfoControllerTests extends ControllerTestCase {

  @MockBean
  UserRepository userRepository;

  @MockBean
  SystemInfoService mockSystemInfoService;

  @Test
  public void systemInfo__logged_out() throws Exception {
    mockMvc.perform(get("/api/systemInfo"))
        .andExpect(status().is(403));
  }

  @WithMockUser(roles={"USER"})
  @Test
  public void systemInfo__user_logged_in() throws Exception {
    mockMvc.perform(get("/api/systemInfo"))
        .andExpect(status().is(403));
  }

  @WithMockUser(roles={"ADMIN"})
  @Test
  public void systemInfo__admin_logged_in() throws Exception {
    mockMvc.perform(get("/api/systemInfo"))
        .andExpect(status().isOk());
  }
}
