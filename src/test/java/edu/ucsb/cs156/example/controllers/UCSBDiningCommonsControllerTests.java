package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.UCSBDiningCommons;
import edu.ucsb.cs156.example.repositories.UCSBDiningCommonsRepository;

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

@WebMvcTest(controllers = UCSBDiningCommonsController.class)
@Import(TestConfig.class)
public class UCSBDiningCommonsControllerTests extends ControllerTestCase {

        @MockBean
        UCSBDiningCommonsRepository ucsbDiningCommonsRepository;

        @MockBean
        UserRepository userRepository;

        // Authorization tests for /api/ucsbdiningcommons/admin/all

        @Test
        public void logged_out_users_cannot_get_all() throws Exception {
                mockMvc.perform(get("/api/ucsbdiningcommons/all"))
                                .andExpect(status().is(403)); // logged out users can't get all
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_users_can_get_all() throws Exception {
                mockMvc.perform(get("/api/ucsbdiningcommons/all"))
                                .andExpect(status().is(200)); // logged
        }

        @Test
        public void logged_out_users_cannot_get_by_id() throws Exception {
                mockMvc.perform(get("/api/ucsbdiningcommons?code=carrillo"))
                                .andExpect(status().is(403)); // logged out users can't get by id
        }

        // Authorization tests for /api/ucsbdiningcommons/post
        // (Perhaps should also have these for put and delete)

        @Test
        public void logged_out_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommons/post"))
                                .andExpect(status().is(403));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_regular_users_cannot_post() throws Exception {
                mockMvc.perform(post("/api/ucsbdiningcommons/post"))
                                .andExpect(status().is(403)); // only admins can post
        }

        // Tests with mocks for database actions

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists() throws Exception {

                // arrange

                UCSBDiningCommons commons = UCSBDiningCommons.builder()
                                .name("Carrillo")
                                .code("carrillo")
                                .hasSackMeal(false)
                                .hasTakeOutMeal(false)
                                .hasDiningCam(true)
                                .latitude(34.409953)
                                .longitude(-119.85277)
                                .build();

                when(ucsbDiningCommonsRepository.findById(eq("carrillo"))).thenReturn(Optional.of(commons));

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsbdiningcommons?code=carrillo"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(ucsbDiningCommonsRepository, times(1)).findById(eq("carrillo"));
                String expectedJson = mapper.writeValueAsString(commons);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_does_not_exist() throws Exception {

                // arrange

                when(ucsbDiningCommonsRepository.findById(eq("munger-hall"))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsbdiningcommons?code=munger-hall"))
                                .andExpect(status().isNotFound()).andReturn();

                // assert

                verify(ucsbDiningCommonsRepository, times(1)).findById(eq("munger-hall"));
                Map<String, Object> json = responseToJson(response);
                assertEquals("EntityNotFoundException", json.get("type"));
                assertEquals("UCSBDiningCommons with id munger-hall not found", json.get("message"));
        }

        @WithMockUser(roles = { "USER" })
        @Test
        public void logged_in_user_can_get_all_ucsbdiningcommons() throws Exception {

                // arrange

                UCSBDiningCommons carrillo = UCSBDiningCommons.builder()
                                .name("Carrillo")
                                .code("carrillo")
                                .hasSackMeal(false)
                                .hasTakeOutMeal(false)
                                .hasDiningCam(true)
                                .latitude(34.409953)
                                .longitude(-119.85277)
                                .build();

                UCSBDiningCommons dlg = UCSBDiningCommons.builder()
                                .name("De La Guerra")
                                .code("de-la-guerra")
                                .hasSackMeal(false)
                                .hasTakeOutMeal(false)
                                .hasDiningCam(true)
                                .latitude(34.409811)
                                .longitude(-119.845026)
                                .build();

                ArrayList<UCSBDiningCommons> expectedCommons = new ArrayList<>();
                expectedCommons.addAll(Arrays.asList(carrillo, dlg));

                when(ucsbDiningCommonsRepository.findAll()).thenReturn(expectedCommons);

                // act
                MvcResult response = mockMvc.perform(get("/api/ucsbdiningcommons/all"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(ucsbDiningCommonsRepository, times(1)).findAll();
                String expectedJson = mapper.writeValueAsString(expectedCommons);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void an_admin_user_can_post_a_new_commons() throws Exception {
                // arrange

                UCSBDiningCommons ortega = UCSBDiningCommons.builder()
                                .name("Ortega")
                                .code("ortega")
                                .hasSackMeal(true)
                                .hasTakeOutMeal(true)
                                .hasDiningCam(true)
                                .latitude(34.410987)
                                .longitude(-119.84709)
                                .build();

                when(ucsbDiningCommonsRepository.save(eq(ortega))).thenReturn(ortega);

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/ucsbdiningcommons/post?name=Ortega&code=ortega&hasSackMeal=true&hasTakeOutMeal=true&hasDiningCam=true&latitude=34.410987&longitude=-119.84709")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsRepository, times(1)).save(ortega);
                String expectedJson = mapper.writeValueAsString(ortega);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_delete_a_date() throws Exception {
                // arrange

                UCSBDiningCommons portola = UCSBDiningCommons.builder()
                                .name("Portola")
                                .code("portola")
                                .hasSackMeal(true)
                                .hasTakeOutMeal(true)
                                .hasDiningCam(true)
                                .latitude(34.417723)
                                .longitude(-119.867427)
                                .build();

                when(ucsbDiningCommonsRepository.findById(eq("portola"))).thenReturn(Optional.of(portola));

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/ucsbdiningcommons?code=portola")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsRepository, times(1)).findById("portola");
                verify(ucsbDiningCommonsRepository, times(1)).delete(any());

                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommons with id portola deleted", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_tries_to_delete_non_existant_commons_and_gets_right_error_message()
                        throws Exception {
                // arrange

                when(ucsbDiningCommonsRepository.findById(eq("munger-hall"))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                delete("/api/ucsbdiningcommons?code=munger-hall")
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbDiningCommonsRepository, times(1)).findById("munger-hall");
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommons with id munger-hall not found", json.get("message"));
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_can_edit_an_existing_commons() throws Exception {
                // arrange

                UCSBDiningCommons carrilloOrig = UCSBDiningCommons.builder()
                                .name("Carrillo")
                                .code("carrillo")
                                .hasSackMeal(false)
                                .hasTakeOutMeal(false)
                                .hasDiningCam(true)
                                .latitude(34.409953)
                                .longitude(-119.85277)
                                .build();

                UCSBDiningCommons carrilloEdited = UCSBDiningCommons.builder()
                                .name("Carrillo Dining Hall")
                                .code("carrillo")
                                .hasSackMeal(true)
                                .hasTakeOutMeal(true)
                                .hasDiningCam(false)
                                .latitude(34.409954)
                                .longitude(-119.85278)
                                .build();

                String requestBody = mapper.writeValueAsString(carrilloEdited);

                when(ucsbDiningCommonsRepository.findById(eq("carrillo"))).thenReturn(Optional.of(carrilloOrig));

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/ucsbdiningcommons?code=carrillo")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(ucsbDiningCommonsRepository, times(1)).findById("carrillo");
                verify(ucsbDiningCommonsRepository, times(1)).save(carrilloEdited); // should be saved with updated info
                String responseString = response.getResponse().getContentAsString();
                assertEquals(requestBody, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void admin_cannot_edit_commons_that_does_not_exist() throws Exception {
                // arrange

                UCSBDiningCommons editedCommons = UCSBDiningCommons.builder()
                                .name("Munger Hall")
                                .code("munger-hall")
                                .hasSackMeal(false)
                                .hasTakeOutMeal(false)
                                .hasDiningCam(true)
                                .latitude(34.420799)
                                .longitude(-119.852617)
                                .build();

                String requestBody = mapper.writeValueAsString(editedCommons);

                when(ucsbDiningCommonsRepository.findById(eq("munger-hall"))).thenReturn(Optional.empty());

                // act
                MvcResult response = mockMvc.perform(
                                put("/api/ucsbdiningcommons?code=munger-hall")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .characterEncoding("utf-8")
                                                .content(requestBody)
                                                .with(csrf()))
                                .andExpect(status().isNotFound()).andReturn();

                // assert
                verify(ucsbDiningCommonsRepository, times(1)).findById("munger-hall");
                Map<String, Object> json = responseToJson(response);
                assertEquals("UCSBDiningCommons with id munger-hall not found", json.get("message"));

        }
}
