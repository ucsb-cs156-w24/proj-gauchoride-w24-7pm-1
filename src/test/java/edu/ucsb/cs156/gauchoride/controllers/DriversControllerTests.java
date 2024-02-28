package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.models.DriverInfo;
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
  public void users__logged_out_all() throws Exception {
    mockMvc.perform(get("/api/drivers/all"))
        .andExpect(status().is(403));
  }

  @Test
  public void users__logged_out_get() throws Exception {
    mockMvc.perform(get("/api/drivers/get?id=42"))
        .andExpect(status().is(403));
  }

   @WithMockUser(roles = { "ADMIN" })
        @Test
        public void test1() throws Exception {

                

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

                when(userRepository.findByDriver(true)).thenReturn(exp);  

            
                MvcResult response = mockMvc.perform(get("/api/drivers/all"))
                                .andExpect(status().isOk()).andReturn();

             

                verify(userRepository, times(1)).findByDriver(true);
                String expectedJson = mapper.writeValueAsString(exp);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN" })
        @Test
        public void returns_no_info_for_non_drivers() throws Exception {

                // arrange

                User u = currentUserService.getCurrentUser().getUser();
                User user1 = User.builder().email("cgaucho@ucsb.edu").id(42L).build();
                DriverInfo driverInfo = DriverInfo.builder().isDriver(false).build();
                when(userRepository.findById(eq(42L))).thenReturn(Optional.of(user1));

                // act
                MvcResult response = mockMvc.perform(get("/api/drivers/get?id=42"))
                        .andExpect(status().isOk()).andReturn();

                // assert

                verify(userRepository, times(1)).findById(42L);
                String expectedJson = mapper.writeValueAsString(driverInfo);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "ADMIN" })
        @Test
        public void returns_info_for_drivers() throws Exception {

                // arrange

                User u = currentUserService.getCurrentUser().getUser();
                User user1 = User.builder().email("cgaucho@ucsb.edu")
                .familyName("gaucho")
                .givenName("Chris")
                .id(42L)
                .driver(true)
                .build();
                DriverInfo driverInfo = DriverInfo.builder()
                .isDriver(true)
                .email("cgaucho@ucsb.edu")
                .familyName("gaucho")
                .givenName("Chris")
                .build();
                when(userRepository.findById(eq(42L))).thenReturn(Optional.of(user1));

                // act
                MvcResult response = mockMvc.perform(get("/api/drivers/get?id=42"))
                        .andExpect(status().isOk()).andReturn();

                // assert

                verify(userRepository, times(1)).findById(42L);
                String expectedJson = mapper.writeValueAsString(driverInfo);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void search_for_user_that_does_not_exist() throws Exception {

      // arrange

      User u = currentUserService.getCurrentUser().getUser();

      when(userRepository.findById(eq(7L))).thenReturn(Optional.empty());

      // act
      MvcResult response = mockMvc.perform(get("/api/drivers/get?id=7"))
              .andExpect(status().isNotFound()).andReturn();

      // assert

      // verify(userRepository, times(1)).findById(7L);
      Map<String, Object> json = responseToJson(response);
      assertEquals("EntityNotFoundException", json.get("type"));
      assertEquals("User with id 7 not found", json.get("message"));
  }
}