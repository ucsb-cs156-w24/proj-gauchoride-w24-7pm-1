package edu.ucsb.cs156.kitchensink.controllers;

import edu.ucsb.cs156.kitchensink.ControllerTestCase;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = UserInfoController.class)
public class UserInfoControllerTests extends ControllerTestCase {
  @Test
  public void currentUser__logged_out() throws Exception {
    mockMvc.perform(get("/api/currentUser"))
        .andExpect(status().is(403));
  }

  @WithMockUser(roles={"USER"})
  @Test
  public void currentUser__logged_in() throws Exception {
    mockMvc.perform(get("/api/currentUser"))
        .andExpect(status().isOk());
  }
}
