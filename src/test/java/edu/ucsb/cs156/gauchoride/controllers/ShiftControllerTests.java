package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;
import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.Shift;
import edu.ucsb.cs156.gauchoride.repositories.ShiftRepository;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = ShiftController.class)
@Import(TestConfig.class)
public class ShiftControllerTests extends ControllerTestCase {

        @MockBean
        ShiftRepository shiftRepository;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/shift/all

        @Test
        public void logged_out_users_cannot_get_all() throws Exception {
                mockMvc.perform(get("/api/shift/all"))
                                .andExpect(status().is(403)); // logged out users can't get all
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_users_can_get_all_of_theirs() throws Exception {
                mockMvc.perform(get("/api/shift/all"))
                                .andExpect(status().is(200)); // logged
        }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void logged_in_driver_can_get_all() throws Exception {
                mockMvc.perform(get("/api/shift/all"))
                                .andExpect(status().is(200)); // logged
        }

        @WithMockUser(roles = { "ADMIN" })
        @Test
        public void logged_in_admin_can_get_all() throws Exception {
                mockMvc.perform(get("/api/shift/all"))
                                .andExpect(status().is(200)); // logged
        }

        // Authorization tests for /api/ride_request?id={}

        @Test
        public void logged_out_users_cannot_get_by_id() throws Exception {
                mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().is(403)); // logged out users can't get by id
        }

        // @WithMockUser(roles = { "USER" })
        // @Test
        // public void logged_in_users_can_get_by_id_that_is_theirs() throws Exception {
        //         mockMvc.perform(get("/api/shift/get?id=7"))
        //                         .andExpect(status().is(404)); // logged, but no id exists
        // }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void logged_in_driver_can_get_by_id() throws Exception {
                mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().is(404)); // logged, but no id exists
        }

        @WithMockUser(roles = { "ADMIN" })
        @Test
        public void logged_in_admin_can_get_by_id() throws Exception {
                mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().is(404)); // logged, but no id exists
        }

        // Authorization tests for /api/shift/post

        @Test
        public void logged_out_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/shift/post"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void logged_in_driver_cannot_post() throws Exception {
                mockMvc.perform(post("/api/shift/post"))
                                .andExpect(status().is(403));
        }

        // // Tests with mocks for database actions



        // GET BY ID


        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists_and_user_id_matches() throws Exception {

                // arrange

                long userId = currentUserService.getCurrentUser().getUser().getId();

                Shift shift = Shift.builder()
                                .driverID(userId)
                                .day("Monday")
                                .shiftStart("10:00AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(1)
                                .build();

                when(shiftRepository.findById(eq(7L))).thenReturn(Optional.of(shift));

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findById(eq(7L));
                String expectedJson = mapper.writeValueAsString(shift);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                long userId = currentUserService.getCurrentUser().getUser().getId();

                when(shiftRepository.findById(eq(7L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findById(eq(7L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("Shift with id 7 not found", json.get("message"));
        }
        
        @WithMockUser(roles = { "ADMIN" , "USER" })
        @Test
        public void test_that_logged_in_admin_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange

                long userId = currentUserService.getCurrentUser().getUser().getId();

                Shift shift = Shift.builder()
                                .driverID(userId)
                                .day("Monday")
                                .shiftStart("10:00AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(1)
                                .build();

                when(shiftRepository.findById(eq(7L))).thenReturn(Optional.of(shift));

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findById(eq(7L));
                String expectedJson = mapper.writeValueAsString(shift);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void test_that_logged_in_driver_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange

                long userId = currentUserService.getCurrentUser().getUser().getId();

                Shift shift = Shift.builder()
                                .driverID(userId)
                                .day("Monday")
                                .shiftStart("10:00AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(1)
                                .build();

                when(shiftRepository.findById(eq(7L))).thenReturn(Optional.of(shift));

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findById(eq(7L));
                String expectedJson = mapper.writeValueAsString(shift);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN" , "USER" })
        @Test
        public void test_that_logged_in_admin_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                when(shiftRepository.findById(eq(7L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findById(eq(7L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("Shift with id 7 not found", json.get("message"));
        }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void test_that_logged_in_driver_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                when(shiftRepository.findById(eq(7L))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/get?id=7"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findById(eq(7L));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("Shift with id 7 not found", json.get("message"));
        }
        


        // GET ALL

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_user_can_get_all_shifts() throws Exception {

                long userId = currentUserService.getCurrentUser().getUser().getId();

                Shift shift1 = Shift.builder()
                                .driverID(userId)
                                .day("Monday")
                                .shiftStart("10:30AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(1)
                                .build();

                Shift shift2 = Shift.builder()
                                .driverID(userId)
                                .day("Tuesday")
                                .shiftStart("10:30AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(userId + 1)
                                .build();

                ArrayList<Shift> expectedShifts = new ArrayList<>();
                expectedShifts.addAll(Arrays.asList(shift1, shift2));

                when(shiftRepository.findAll()).thenReturn(expectedShifts);

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedShifts);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN" , "USER" })
        @Test
        public void logged_in_admin_can_get_all_shifts() throws Exception {

                long userId = currentUserService.getCurrentUser().getUser().getId();

                Shift shift1 = Shift.builder()
                                .driverID(userId)
                                .day("Monday")
                                .shiftStart("10:30AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(1)
                                .build();

                Shift shift2 = Shift.builder()
                                .driverID(userId)
                                .day("Tuesday")
                                .shiftStart("10:30AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(userId + 1)
                                .build();


                ArrayList<Shift> expectedShifts = new ArrayList<>();
                expectedShifts.addAll(Arrays.asList(shift1, shift2));

                when(shiftRepository.findAll()).thenReturn(expectedShifts);

                // act
                MvcResult response = mockMvc.perform(get("/api/shift/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedShifts);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void logged_in_driver_can_get_all_shifts() throws Exception {

                long userId = currentUserService.getCurrentUser().getUser().getId();

                Shift shift1 = Shift.builder()
                                .driverID(userId)
                                .day("Monday")
                                .shiftStart("10:30AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(1)
                                .build();

                Shift shift2 = Shift.builder()
                                .driverID(userId)
                                .day("Tuesday")
                                .shiftStart("10:30AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(userId + 1)
                                .build();

                ArrayList<Shift> expectedShifts = new ArrayList<>();
                expectedShifts.addAll(Arrays.asList(shift1, shift2));
                
                when(shiftRepository.findAll()).thenReturn(expectedShifts);
                
                MvcResult response = mockMvc.perform(get("/api/shift/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(shiftRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedShifts);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }


        // POST



        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void a_driver_can_post_a_new_shift() throws Exception {
                // arrange

                long userId = currentUserService.getCurrentUser().getUser().getId();

                Shift shift1 = Shift.builder()
                                .driverID(userId)
                                .day("Monday")
                                .shiftStart("10:30AM")
                                .shiftEnd("12:30PM")
                                .driverBackupID(1)
                                .build();

                when(shiftRepository.save(eq(shift1))).thenReturn(shift1);

                String postRequestString = "day=Monday&shiftStart=10:30AM&shiftEnd=12:30PM&driverID="+userId+"&driverBackupID=1";

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/shift/post?" + postRequestString)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(shiftRepository, times(1)).save(shift1);
                String expectedJson = mapper.writeValueAsString(shift1);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }
}