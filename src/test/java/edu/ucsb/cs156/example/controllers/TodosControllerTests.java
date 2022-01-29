package edu.ucsb.cs156.example.controllers;


import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.testconfig.TestConfig;
import edu.ucsb.cs156.example.ControllerTestCase;
import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.repositories.TodoRepository;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@WebMvcTest(controllers = TodosController.class)
@Import(TestConfig.class)
public class TodosControllerTests extends ControllerTestCase {

    @MockBean
    TodoRepository todoRepository;

    @MockBean
    UserRepository userRepository;

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
        mockMvc.perform(get("/api/todos/all"))
                .andExpect(status().isOk());
    }

    // Authorization tests for /api/todos/post

    @Test
    public void api_todos_post__logged_out__returns_403() throws Exception {
        mockMvc.perform(post("/api/todos/post"))
                .andExpect(status().is(403));
    }

    // Tests with mocks for database actions

    @WithMockUser(roles={"USER"})
    @Test
    public void api_todos_post__user_logged_in__returns_200() throws Exception {
        // We expect this to update the database via a save call to 
        // todoRepsitory

        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        
        Todo expectedTodo = Todo.builder()
            .title("Test Title")
            .details("Test Details")
            .done(false)
            .user(u)
            .id(0L)
            .build();
        
        String expectedJson = mapper.writeValueAsString(expectedTodo);

        when(todoRepository.save(eq(expectedTodo))).thenReturn(expectedTodo);

        // act 
        MvcResult response = mockMvc.perform(
                post("/api/todos/post?title=Test Title&details=Test Details&done=false")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(todoRepository, times(1)).save(expectedTodo);

        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

}
