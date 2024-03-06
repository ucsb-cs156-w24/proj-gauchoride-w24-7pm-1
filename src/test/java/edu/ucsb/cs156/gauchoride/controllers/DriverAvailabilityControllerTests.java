package edu.ucsb.cs156.gauchoride.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.DriverAvailability;
import edu.ucsb.cs156.gauchoride.repositories.DriverAvailabilityRepository;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@WebMvcTest(controllers = DriverAvailabilityController.class)
@Import(TestConfig.class)
public class DriverAvailabilityControllerTests extends ControllerTestCase {

    @MockBean
    DriverAvailabilityRepository driverAvailabilityRepository;
    
    @MockBean
    UserRepository userRepository;

    // Test for POST /api/driverAvailability/new

    // Authorization tests for post /api/driverAvailability/new
    @Test
    public void logged_out_users_cannot_post() throws Exception {
            mockMvc.perform(post("/api/driverAvailability/new"))
                            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void logged_in_admin_cannot_post() throws Exception {
            mockMvc.perform(post("/api/driverAvailability/new"))
                            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "RIDER" })
    @Test
    public void logged_in_rider_cannot_post() throws Exception {
            mockMvc.perform(post("/api/driverAvailability/new"))
                            .andExpect(status().is(403));
    }

    // POST
    @WithMockUser(roles = { "DRIVER" })
    @Test
    public void a_driver_can_post_a_new_driverAvailability() throws Exception {
        Long UserId = currentUserService.getCurrentUser().getUser().getId();

        DriverAvailability availability1 = DriverAvailability.builder()
                        .driverId(1)
                        .day("03/05/2024")
                        .startTime("10:30AM")
                        .endTime("2:30PM")
                        .notes("End for late lunch")
                        .build();

        when(driverAvailabilityRepository.save(eq(availability1))).thenReturn(availability1);

        // act
        MvcResult response = mockMvc.perform(
                        post("/api/driverAvailability/new?driverId=1&day=03/05/2024&startTime=10:30AM&endTime=2:30PM&notes=End for late lunch")
                                        .with(csrf()))
                        .andExpect(status().isOk()).andReturn();

        // assert
        verify(driverAvailabilityRepository, times(1)).save(availability1);
        String expectedJson = mapper.writeValueAsString(availability1);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    // Test for GET /api/driverAvailability

    // Authorization tests for GET /api/driverAvailability
    @Test
    public void logged_out_users_cannot_get() throws Exception {
            mockMvc.perform(post("/api/driverAvailability"))
                            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void logged_in_admin_cannot_get() throws Exception {
            mockMvc.perform(post("/api/driverAvailability"))
                            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "RIDER" })
    @Test
    public void logged_in_rider_cannot_get() throws Exception {
            mockMvc.perform(post("/api/driverAvailability"))
                            .andExpect(status().is(403));
    }

    //  GET ALL
    @WithMockUser(roles = { "DRIVER" })
    @Test
    public void logged_in_driver_can_get_all_their_own_availabilities() throws Exception {

        Long UserId = currentUserService.getCurrentUser().getUser().getId();

        DriverAvailability availability1 = DriverAvailability.builder()
                        .driverId(1)
                        .day("03/05/2024")
                        .startTime("10:30AM")
                        .endTime("2:30PM")
                        .notes("End for late lunch")
                        .build();

        DriverAvailability availability2 = DriverAvailability.builder()
                        .driverId(2)
                        .day("12/24/2024")
                        .startTime("5:00AM")
                        .endTime("12:00PM")
                        .notes("Early Shift")
                        .build();

        ArrayList<DriverAvailability> expectedAvailabilities = new ArrayList<>();
        expectedAvailabilities.addAll(Arrays.asList(availability1, availability2));

        when(driverAvailabilityRepository.findAllByDriverId(eq(UserId))).thenReturn(expectedAvailabilities);

        // act
        MvcResult response = mockMvc.perform(get("/api/driverAvailability"))
                        .andExpect(status().isOk()).andReturn();

        // assert

        verify(driverAvailabilityRepository, times(1)).findAllByDriverId(eq(UserId));
        String expectedJson = mapper.writeValueAsString(expectedAvailabilities);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    // Test for GET /api/driverAvailability/id

    // Authorization tests for GET /api/driverAvailability/id
    @Test
    public void logged_out_users_cannot_get_by_id() throws Exception {
            mockMvc.perform(post("/api/driverAvailability/id"))
                            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void logged_in_admin_cannot_get_by_id() throws Exception {
            mockMvc.perform(post("/api/driverAvailability"))
                            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "RIDER" })
    @Test
    public void logged_in_rider_cannot_get_by_id() throws Exception {
            mockMvc.perform(post("/api/driverAvailability"))
                            .andExpect(status().is(403));
    }

    // GET BY ID
    @WithMockUser(roles = { "DRIVER" })
    @Test
    public void test_that_logged_in_driver_can_get_by_id_when_the_id_exists_and_user_id_matches() throws Exception {
        
        Long UserId = currentUserService.getCurrentUser().getUser().getId();

        DriverAvailability availability = DriverAvailability.builder()
                        .driverId(1)
                        .day("03/05/2024")
                        .startTime("10:30AM")
                        .endTime("2:30PM")
                        .notes("End for late lunch")
                        .build();

        when(driverAvailabilityRepository.findById(eq(7L))).thenReturn(Optional.of(availability));

        // act
        MvcResult response = mockMvc.perform(get("/api/driverAvailability/id?id=7"))
                        .andExpect(status().isOk()).andReturn();

        // assert
        verify(driverAvailabilityRepository, times(1)).findById(eq(7L));
        String expectedJson = mapper.writeValueAsString(availability);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "DRIVER" })
    @Test
    public void test_that_logged_in_driver_can_get_by_id_when_the_id_does_not_exist() throws Exception {

        // arrange

        when(driverAvailabilityRepository.findById(eq(7L))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(get("/api/driverAvailability/id?id=7"))
                        .andExpect(status().isNotFound()).andReturn();

        // assert

        verify(driverAvailabilityRepository, times(1)).findById(eq(7L));
        Map<String, Object> json = responseToJson(response);
        assertEquals("EntityNotFoundException", json.get("type"));
        assertEquals("DriverAvailability with id 7 not found", json.get("message"));
    }


    // Test for PUT /api/driverAvailability
    
    // Authorization tests for put /api/riderApplication/
    @Test
    public void logged_out_users_cannot_edit() throws Exception {
            mockMvc.perform(put("/api/driverAvailability?id=9"))
                            .andExpect(status().is(403));
   }

   @WithMockUser(roles = { "ADMIN" })
   @Test
   public void logged_in_admin_cannot_edit() throws Exception {
           mockMvc.perform(put("/api/driverAvailability?id=9"))
                           .andExpect(status().is(403));
   }

   @WithMockUser(roles = { "RIDER" })
   @Test
   public void logged_in_rider_cannot_edit() throws Exception {
           mockMvc.perform(put("/api/driverAvailability?id=9"))
                           .andExpect(status().is(403));
   }

    // EDIT (UPDATE)

    @WithMockUser(roles = { "DRIVER" })
    @Test
    public void driver_can_edit_their_own_availability() throws Exception {

        Long DriverId = currentUserService.getCurrentUser().getUser().getId();

        DriverAvailability availability_original = DriverAvailability.builder()
                        .driverId(DriverId)
                        .day("03/05/2024")
                        .startTime("10:30AM")
                        .endTime("2:30PM")
                        .notes("End for late lunch")
                        .build();

        DriverAvailability availability_edited = DriverAvailability.builder()
                        .driverId(7)
                        .day("12/24/2024")
                        .startTime("5:00AM")
                        .endTime("12:00PM")
                        .notes("Early Shift")
                        .build();

        String requestBody = mapper.writeValueAsString(availability_edited);

        when(driverAvailabilityRepository.findById(eq(67L))).thenReturn(Optional.of(availability_original));

        // act
        MvcResult response = mockMvc.perform(
        put("/api/driverAvailability?id=67")
                            .contentType(MediaType.APPLICATION_JSON)
                            .characterEncoding("utf-8")
                            .content(requestBody)
                            .with(csrf()))
            .andExpect(status().isOk()).andReturn();
        // assert
        verify(driverAvailabilityRepository, times(1)).findById(eq(67L));
        verify(driverAvailabilityRepository, times(1)).save(availability_edited); // should be saved with correct user
        String responseString = response.getResponse().getContentAsString();
        assertEquals(requestBody, responseString);
    }

    @WithMockUser(roles = { "DRIVER" })
    @Test
    public void driver_cannot_edit_availability_that_does_not_exist() throws Exception {
            // arrange

            Long DriverId = currentUserService.getCurrentUser().getUser().getId();

            DriverAvailability availability_edited = DriverAvailability.builder()
                        .driverId(DriverId)
                        .day("12/24/2024")
                        .startTime("5:00AM")
                        .endTime("12:00PM")
                        .notes("Early Shift")
                        .build();
                        
            String requestBody = mapper.writeValueAsString(availability_edited);

            when(driverAvailabilityRepository.findById(eq(67L))).thenReturn(Optional.empty());

            // act
            MvcResult response = mockMvc.perform(
                            put("/api/driverAvailability?id=67")
                                            .contentType(MediaType.APPLICATION_JSON)
                                            .characterEncoding("utf-8")
                                            .content(requestBody)
                                            .with(csrf()))
                            .andExpect(status().isNotFound()).andReturn();

            // assert
            verify(driverAvailabilityRepository, times(1)).findById(67L);
            Map<String, Object> json = responseToJson(response);
            assertEquals("DriverAvailability with id 67 not found", json.get("message"));

    }

    // Test for GET /api/driverAvailability/admin/all
        
    // Authorization tests for get /api/driverAvailability/admin/all
    @Test
    public void logged_out_users_cannot_get_all_Admin() throws Exception {
            mockMvc.perform(get("/api/driverAvailability/admin/all"))
                            .andExpect(status().is(403));
   }

   @WithMockUser(roles = { "DRIVER" })
   @Test
   public void logged_in_drivers_cannot_get_all_Admin() throws Exception {
            mockMvc.perform(get("/api/driverAvailability/admin/all"))
                            .andExpect(status().is(403));
   }

   @WithMockUser(roles = { "RIDER" })
   @Test
   public void logged_in_riders_cannot_get_all_Admin() throws Exception {
            mockMvc.perform(get("/api/driverAvailability/admin/all"))
                            .andExpect(status().is(403));
   }

   @WithMockUser(roles = { "ADMIN" })
   @Test
   public void logged_in_admins_can_get_all_Admin() throws Exception {
            mockMvc.perform(get("/api/driverAvailability/admin/all"))
                            .andExpect(status().is(200));
    }


    // GET ALL ADMIN
    @WithMockUser(roles = { "ADMIN", "MEMBER" })
    @Test
    public void test_that_logged_in_admin_can_get_all_applications() throws Exception
    {
        Long UserId = currentUserService.getCurrentUser().getUser().getId();
        Long otherUserId = UserId + 1;

        DriverAvailability availability1 = DriverAvailability.builder()
                        .driverId(1)
                        .day("02/29/2024")
                        .startTime("10:30AM")
                        .endTime("2:30PM")
                        .notes("End for late lunch")
                        .build();

        DriverAvailability availability2 = DriverAvailability.builder()
                        .driverId(1)
                        .day("03/05/2024")
                        .startTime("12:30PM")
                        .endTime("5:30PM")
                        .notes("Last shift of the day")
                        .build();
        
        ArrayList<DriverAvailability> expectedAvailabilities = new ArrayList<>();
        expectedAvailabilities.addAll(Arrays.asList(availability1, availability2));

        when(driverAvailabilityRepository.findAll()).thenReturn(expectedAvailabilities);
        // act
        MvcResult response = mockMvc.perform(get("/api/driverAvailability/admin/all"))
        .andExpect(status().isOk()).andReturn();

        // assert
        verify(driverAvailabilityRepository, times(1)).findAll();
        String expectedJson = mapper.writeValueAsString(expectedAvailabilities);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

}
