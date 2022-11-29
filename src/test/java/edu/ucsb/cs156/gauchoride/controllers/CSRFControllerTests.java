package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.controllers.CSRFController;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("development")
@WebMvcTest(controllers = CSRFController.class)
@Import(TestConfig.class)
public class CSRFControllerTests extends ControllerTestCase {

  @MockBean
  UserRepository userRepository;

  @Test
  public void csrf_returns_ok() throws Exception {
    MvcResult response = mockMvc.perform(get("/csrf"))
              .andExpect(status().isOk())
              .andReturn();

    String responseString = response.getResponse().getContentAsString();
    assertTrue(responseString.contains("parameterName"));
    assertTrue(responseString.contains("_csrf"));
    assertTrue(responseString.contains("headerName"));
    assertTrue(responseString.contains("X-XSRF-TOKEN"));

  }

}
