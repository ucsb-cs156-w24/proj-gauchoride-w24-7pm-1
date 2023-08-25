package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.ChatMessage;
import edu.ucsb.cs156.gauchoride.models.ChatMessageWithUserInfo;
import edu.ucsb.cs156.gauchoride.repositories.ChatMessageRepository;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import static org.mockito.Mockito.atLeastOnce;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.Arrays;


@WebMvcTest(controllers = ChatMessageController.class)
@Import(TestConfig.class)
public class ChatMessageControllerTests extends ControllerTestCase {

        @MockBean
        UserRepository userRepository;

        @MockBean
        ChatMessageRepository chatMessageRepository;

        @WithMockUser(roles = { "ADMIN" })
        @Test
        public void admin_can_get_messages() throws Exception {

                // arrange

                PageRequest pageRequest = PageRequest.of(0, 5);

                ChatMessage message1 = ChatMessage.builder()
                                .userId(1)
                                .payload("message2")
                                .build();
                ChatMessage message2 = ChatMessage.builder()
                                .userId(1)
                                .payload("message2")
                                .build();

                ArrayList<ChatMessageWithUserInfo> expectedMessages = new ArrayList<>();
                expectedMessages.addAll(Arrays.asList(
                                new ChatMessageWithUserInfo(message1, "cgaucho@ucsb.edu"),
                                new ChatMessageWithUserInfo(message2, "cgaucho@ucsb.edu")));

                Page<ChatMessageWithUserInfo> expectedMessagePage = new PageImpl<>(expectedMessages, pageRequest,
                                expectedMessages.size());

                when(chatMessageRepository.findAllWithUserInfo(any())).thenReturn(expectedMessagePage);

                // act
                MvcResult response = mockMvc.perform(get("/api/chat/get?page=0&size=10"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(chatMessageRepository, atLeastOnce()).findAllWithUserInfo(any());

                String expectedJson = mapper.writeValueAsString(expectedMessagePage);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void driver_can_get_messages() throws Exception {

                // arrange

                PageRequest pageRequest = PageRequest.of(0, 5);

                ChatMessage message1 = ChatMessage.builder()
                                .userId(1)
                                .payload("message2")
                                .build();
                ChatMessage message2 = ChatMessage.builder()
                                .userId(1)
                                .payload("message2")
                                .build();

                ArrayList<ChatMessageWithUserInfo> expectedMessages = new ArrayList<>();
                expectedMessages.addAll(Arrays.asList(
                                new ChatMessageWithUserInfo(message1, "cgaucho@ucsb.edu"),
                                new ChatMessageWithUserInfo(message2, "cgaucho@ucsb.edu")));

                Page<ChatMessageWithUserInfo> expectedMessagePage = new PageImpl<>(expectedMessages, pageRequest,
                                expectedMessages.size());

                when(chatMessageRepository.findAllWithUserInfo(any())).thenReturn(expectedMessagePage);

                // act
                MvcResult response = mockMvc.perform(get("/api/chat/get?page=0&size=10"))
                                .andExpect(status().isOk()).andReturn();

                // assert

                verify(chatMessageRepository, atLeastOnce()).findAllWithUserInfo(any());

                String expectedJson = mapper.writeValueAsString(expectedMessagePage);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN" })
        @Test
        public void an_admin_can_post_a_new_message() throws Exception {
                // arrange

                long userId = currentUserService.getCurrentUser().getUser().getId();

                ChatMessage message1 = ChatMessage.builder()
                                .userId(userId)
                                .payload("message1")
                                .build();

                when(chatMessageRepository.save(eq(message1))).thenReturn(message1);

                String postRequesString = "content=message1";

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/chat/post?" + postRequesString)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(chatMessageRepository, times(1)).save(message1);
                String expectedJson = "{\"id\":0,\"userId\":1,\"payload\":\"message1\",\"timestamp\":null,\"dm\":false,\"toUserId\":null}";
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "DRIVER" })
        @Test
        public void a_driver_can_post_a_new_message() throws Exception {
                // arrange

                long userId = currentUserService.getCurrentUser().getUser().getId();

                ChatMessage message1 = ChatMessage.builder()
                                .userId(userId)
                                .payload("message1")
                                .build();

                when(chatMessageRepository.save(eq(message1))).thenReturn(message1);

                String postRequesString = "content=message1";

                // act
                MvcResult response = mockMvc.perform(
                                post("/api/chat/post?" + postRequesString)
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                verify(chatMessageRepository, times(1)).save(message1);
                String expectedJson = "{\"id\":0,\"userId\":1,\"payload\":\"message1\",\"timestamp\":null,\"dm\":false,\"toUserId\":null}";
                String responseString = response.getResponse().getContentAsString();

                assertEquals(expectedJson, responseString);
        }

}
