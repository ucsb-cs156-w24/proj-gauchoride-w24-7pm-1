package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.ControllerTestCase;
import edu.ucsb.cs156.gauchoride.entities.ChatMessage;
import edu.ucsb.cs156.gauchoride.repositories.ChatMessageRepository;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.testconfig.TestConfig;

import org.aspectj.bridge.Message;
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

@WebMvcTest(controllers = ChatMessageController.class)
@Import(TestConfig.class)
public class ChatMessageControllerTests extends ControllerTestCase{
  
    @MockBean
    UserRepository userRepository;

    @MockBean
    ChatMessageRepository chatMessageRepository;

    @Test
    public void users__logged_out() throws Exception {
        mockMvc.perform(get("/api/chat/get"))
            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void users__user_logged_in() throws Exception {
        mockMvc.perform(get("/api/admin/get"))
            .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "RIDER", "USER" })
    @Test
    public void users__Rider_logged_in() throws Exception {
        mockMvc.perform(get("/api/admin/get"))
            .andExpect(status().is(403));
    }

    

}
