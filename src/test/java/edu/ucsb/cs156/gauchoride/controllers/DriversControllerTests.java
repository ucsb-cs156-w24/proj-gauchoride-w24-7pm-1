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

@WebMvcTest(controllers = DriversController.class)
@Import(TestConfig.class)
public class DriversControllerTests extends ControllerTestCase {

  @MockBean
  UserRepository userRepository;

  @Test
  public void users__logged_out() throws Exception {
    mockMvc.perform(get("/api/drivers/all"))
        .andExpect(status().is(403));
  }
////////////////////////////////////////////////////////////////////////////////////////////
   @WithMockUser(roles = { "ADMIN" })
        @Test
        public void test1() throws Exception {

                // arrange

                User user1 = User.builder()
                                .email("a")
                                .googleSub("a")
                                .pictureUrl("a")
                                .fullName("a")
                                .givenName("a")
                                .familyName("a")
                                .emailVerified(true)
                                .locale("a")
                                .hostedDomain("a")
                                .cellPhone("a")
                                .admin(false)
                                .driver(true)
                                .rider(false)
                                .build();
                ArrayList<User> exp = new ArrayList<>();
                exp.addAll(Arrays.asList(user1));

                when(userRepository.findByDriver(true)).thenReturn(exp);  // Check not sure why id is 7

                // act
                MvcResult response = mockMvc.perform(get("/api/drivers/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(userRepository, times(1)).findByDriver(true);
                String expectedJson = mapper.writeValueAsString(exp);//need to fix
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }
}