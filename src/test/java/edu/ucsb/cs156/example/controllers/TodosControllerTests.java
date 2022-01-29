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

import java.util.ArrayList;
import java.util.Arrays;

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

     @WithMockUser(roles = { "ADMIN" })
     @Test
     public void api_todos_admin_all__admin_logged_in__returns_all_todos() throws Exception {
 
         // arrange
 
         User u1 = User.builder().id(1L).build();
         User u2 = User.builder().id(2L).build();
         User u = currentUserService.getCurrentUser().getUser();
 
         Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(u1).id(1L).build();
         Todo todo2 = Todo.builder().title("Todo 2").details("Todo 2").done(false).user(u2).id(2L).build();
         Todo todo3 = Todo.builder().title("Todo 3").details("Todo 3").done(false).user(u).id(3L).build();
 
         ArrayList<Todo> expectedTodos = new ArrayList<>();
         expectedTodos.addAll(Arrays.asList(todo1, todo2, todo3));
 
         when(todoRepository.findAll()).thenReturn(expectedTodos);
 
         // act 
         MvcResult response =  mockMvc.perform(get("/api/todos/admin/all"))
                 .andExpect(status().isOk()).andReturn();
 
         // assert
 
         verify(todoRepository, times(1)).findAll();
         String expectedJson = mapper.writeValueAsString(expectedTodos);
         String responseString = response.getResponse().getContentAsString();
         assertEquals(expectedJson, responseString);
     }

     @WithMockUser(roles = { "USER" })
     @Test
     public void api_todos_all__user_logged_in__returns_only_todos_for_user() throws Exception {
 
         // arrange
 
         User thisUser = currentUserService.getCurrentUser().getUser();

         Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(thisUser).id(1L).build();
         Todo todo2 = Todo.builder().title("Todo 2").details("Todo 2").done(false).user(thisUser).id(2L).build();
        
         ArrayList<Todo> expectedTodos = new ArrayList<>();
         expectedTodos.addAll(Arrays.asList(todo1, todo2));
         when(todoRepository.findAllByUserId(thisUser.getId())).thenReturn(expectedTodos);
 
         // act 
         MvcResult response =  mockMvc.perform(get("/api/todos/all"))
                 .andExpect(status().isOk()).andReturn();
 
         // assert
 
         verify(todoRepository, times(1)).findAllByUserId(eq(thisUser.getId()));
         String expectedJson = mapper.writeValueAsString(expectedTodos);
         String responseString = response.getResponse().getContentAsString();
         assertEquals(expectedJson, responseString);
     }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos_post__user_logged_in__returns_200() throws Exception {
        // arrange

        User u = currentUserService.getCurrentUser().getUser();

        Todo expectedTodo = Todo.builder()
                .title("Test Title")
                .details("Test Details")
                .done(false)
                .user(u)
                .id(0L)
                .build();


        when(todoRepository.save(eq(expectedTodo))).thenReturn(expectedTodo);

        // act
        MvcResult response = mockMvc.perform(
                post("/api/todos/post?title=Test Title&details=Test Details&done=false")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(todoRepository, times(1)).save(expectedTodo);
        String expectedJson = mapper.writeValueAsString(expectedTodo);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

}
