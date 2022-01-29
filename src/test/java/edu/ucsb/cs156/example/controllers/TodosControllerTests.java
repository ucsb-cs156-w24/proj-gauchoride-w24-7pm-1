package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.CurrentUserService;
import edu.ucsb.cs156.example.repositories.TodoRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import org.springframework.boot.test.mock.mockito.MockBean;

@WebMvcTest(controllers = TodosController.class)
public class TodosControllerTests extends ControllerTestCase {

    @MockBean
    TodoRepository todoRepository;

    @MockBean
    UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    // Authorization tests for /api/todos/admin/all

    @Test
    public void api_todos_admin_all__logged_out__returns_403() throws Exception {
        mockMvc.perform(get("/api/todos/admin/all"))
                .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos_admin_all__user_logged_in__returns_403() throws Exception {
        mockMvc.perform(get("/api/todos/admin/all"))
                .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "ADMIN" })
    @Test
    public void api_todos_admin_all__admin_logged_in__returns_200() throws Exception {
        mockMvc.perform(get("/api/todos/admin/all"))
                .andExpect(status().isOk());
    }

    // Authorization tests for /api/todos/all

    @Test
    public void api_todos_all__logged_out__returns_403() throws Exception {
        mockMvc.perform(get("/api/todos/all"))
                .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos_all__user_logged_in__returns_200() throws Exception {
        User u = User.builder().build();
        loginAs(u);
        mockMvc.perform(get("/api/todos/all"))
                .andExpect(status().isOk());
    }

    // Authorization tests for /api/todos/post

    @Test
    public void api_todos_post__logged_out__returns_403() throws Exception {
        mockMvc.perform(post("/api/todos/post"))
                .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos_post__user_logged_in__returns_200() throws Exception {
        User u = User.builder().build();
        loginAs(u);
        mockMvc.perform(
                post("/api/todos/post?title=The Title&details=The Details&done=false")
                        .with(csrf()))
                .andExpect(status().isOk());
    }

}
