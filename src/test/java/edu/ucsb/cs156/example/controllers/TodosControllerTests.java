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
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

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

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos_admin__user_logged_in__returns_403() throws Exception {
        mockMvc.perform(get("/api/todos/admin?id=7"))
                .andExpect(status().is(403));
    }

    @WithMockUser(roles = { "ADMIN", "USER" })
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

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__returns_a_todo_that_exists() throws Exception {

        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(u).id(7L).build();
        when(todoRepository.findByIdAndUser(eq(7L), eq(u))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(get("/api/todos?id=7"))
                .andExpect(status().isOk()).andReturn();

        // assert

        verify(todoRepository, times(1)).findByIdAndUser(7L, u);
        String expectedJson = mapper.writeValueAsString(todo1);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__search_for_todo_that_does_not_exist() throws Exception {

        // arrange

        User u = currentUserService.getCurrentUser().getUser();

        when(todoRepository.findByIdAndUser(eq(7L), eq(u))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(get("/api/todos?id=7"))
                .andExpect(status().isNotFound()).andReturn();

        // assert

        verify(todoRepository, times(1)).findByIdAndUser(7L, u);
        Map<String, Object> json = responseToJson(response);
        assertEquals("EntityNotFoundException", json.get("type"));
        assertEquals("Todo with id 7 not found", json.get("message"));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__search_for_todo_that_belongs_to_another_user() throws Exception {

        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(999L).build();
        Todo otherUsersTodo = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(otherUser).id(13L)
                .build();

        when(todoRepository.findByIdAndUser(eq(13L), eq(otherUser))).thenReturn(Optional.of(otherUsersTodo));

        // act
        MvcResult response = mockMvc.perform(get("/api/todos?id=13"))
                .andExpect(status().isNotFound()).andReturn();

        // assert

        verify(todoRepository, times(1)).findByIdAndUser(13L, u);
        Map<String, Object> json = responseToJson(response);
        assertEquals("EntityNotFoundException", json.get("type"));
        assertEquals("Todo with id 13 not found", json.get("message"));
    }

    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_todos__admin_logged_in__search_for_todo_that_belongs_to_another_user() throws Exception {

        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(999L).build();
        Todo otherUsersTodo = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(otherUser).id(27L)
                .build();

        when(todoRepository.findById(eq(27L))).thenReturn(Optional.of(otherUsersTodo));

        // act
        MvcResult response = mockMvc.perform(get("/api/todos/admin?id=27"))
                .andExpect(status().isOk()).andReturn();

        // assert

        verify(todoRepository, times(1)).findById(27L);
        String expectedJson = mapper.writeValueAsString(otherUsersTodo);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_todos__admin_logged_in__search_for_todo_that_does_not_exist() throws Exception {

        // arrange

        when(todoRepository.findById(eq(29L))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(get("/api/todos/admin?id=29"))
                .andExpect(status().isNotFound()).andReturn();

        // assert

        verify(todoRepository, times(1)).findById(29L);
        Map<String, Object> json = responseToJson(response);
        assertEquals("EntityNotFoundException", json.get("type"));
        assertEquals("Todo with id 29 not found", json.get("message"));
    }

    @WithMockUser(roles = { "ADMIN", "USER" })
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
        MvcResult response = mockMvc.perform(get("/api/todos/admin/all"))
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
        MvcResult response = mockMvc.perform(get("/api/todos/all"))
                .andExpect(status().isOk()).andReturn();

        // assert

        verify(todoRepository, times(1)).findAllByUserId(eq(thisUser.getId()));
        String expectedJson = mapper.writeValueAsString(expectedTodos);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos_post__user_logged_in() throws Exception {
        // arrange

        User u = currentUserService.getCurrentUser().getUser();

        Todo expectedTodo = Todo.builder()
                .title("Test Title")
                .details("Test Details")
                .done(true)
                .user(u)
                .id(0L)
                .build();

        when(todoRepository.save(eq(expectedTodo))).thenReturn(expectedTodo);

        // act
        MvcResult response = mockMvc.perform(
                post("/api/todos/post?title=Test Title&details=Test Details&done=true")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(todoRepository, times(1)).save(expectedTodo);
        String expectedJson = mapper.writeValueAsString(expectedTodo);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__delete_todo() throws Exception {
        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(u).id(15L).build();
        when(todoRepository.findByIdAndUser(eq(15L), eq(u))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/todos?id=15")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(todoRepository, times(1)).findByIdAndUser(15L, u);
        verify(todoRepository, times(1)).delete(todo1);
        Map<String, Object> json = responseToJson(response);
        assertEquals("Todo with id 15 deleted", json.get("message"));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__delete_todo_that_does_not_exist() throws Exception {
        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(98L).build();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(otherUser).id(15L).build();
        when(todoRepository.findByIdAndUser(eq(15L), eq(otherUser))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/todos?id=15")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        // assert
        verify(todoRepository, times(1)).findByIdAndUser(15L, u);
        Map<String, Object> json = responseToJson(response);
        assertEquals("Todo with id 15 not found", json.get("message"));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__cannot_delete_todo_belonging_to_another_user() throws Exception {
        // arrange
        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(98L).build();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(otherUser).id(31L).build();
        when(todoRepository.findById(eq(31L))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/todos?id=31")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        // assert
        verify(todoRepository, times(1)).findByIdAndUser(31L, u);
        Map<String, Object> json = responseToJson(response);
        assertEquals("Todo with id 31 not found", json.get("message"));
    }


    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_todos__admin_logged_in__delete_todo() throws Exception {
        // arrange

        User otherUser = User.builder().id(98L).build();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(otherUser).id(16L).build();
        when(todoRepository.findById(eq(16L))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/todos/admin?id=16")
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(todoRepository, times(1)).findById(16L);
        verify(todoRepository, times(1)).delete(todo1);
        Map<String, Object> output = responseToJson(response);
        assertEquals("Todo with id 16 deleted", output.get("message"));
    }

    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_todos__admin_logged_in__cannot_delete_todo_that_does_not_exist() throws Exception {
        // arrange

        when(todoRepository.findById(eq(17L))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(
                delete("/api/todos/admin?id=17")
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        // assert
        verify(todoRepository, times(1)).findById(17L);
        Map<String, Object> output = responseToJson(response);
        assertEquals("Todo with id 17 not found", output.get("message"));
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__put_todo() throws Exception {
        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(999).build();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(u).id(67L).build();
        // We deliberately set the user information to another user
        // This should get ignored and overwritten with current user when todo is saved

        Todo updatedTodo = Todo.builder().title("New Title").details("New Details").done(true).user(otherUser).id(67L).build();
        Todo correctTodo = Todo.builder().title("New Title").details("New Details").done(true).user(u).id(67L).build();

        String requestBody = mapper.writeValueAsString(updatedTodo);
        String expectedReturn = mapper.writeValueAsString(correctTodo);

        when(todoRepository.findByIdAndUser(eq(67L), eq(u))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                put("/api/todos?id=67")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(todoRepository, times(1)).findByIdAndUser(67L, u);
        verify(todoRepository, times(1)).save(correctTodo); // should be saved with correct user
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedReturn, responseString);
    }

    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__cannot_put_todo_that_does_not_exist() throws Exception {
        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        Todo updatedTodo = Todo.builder().title("New Title").details("New Details").done(true).id(67L).build();

        String requestBody = mapper.writeValueAsString(updatedTodo);

        when(todoRepository.findByIdAndUser(eq(67L), eq(u))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(
                put("/api/todos?id=67")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        // assert
        verify(todoRepository, times(1)).findByIdAndUser(67L, u);
        Map<String, Object> output = responseToJson(response);
        assertEquals("Todo with id 67 not found", output.get("message"));
    }


    @WithMockUser(roles = { "USER" })
    @Test
    public void api_todos__user_logged_in__cannot_put_todo_for_another_user() throws Exception {
        // arrange

        User u = currentUserService.getCurrentUser().getUser();
        User otherUser = User.builder().id(98L).build();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(otherUser).id(31L).build();
        Todo updatedTodo = Todo.builder().title("New Title").details("New Details").done(true).id(31L).build();

        when(todoRepository.findByIdAndUser(eq(31L), eq(otherUser))).thenReturn(Optional.of(todo1));

        String requestBody = mapper.writeValueAsString(updatedTodo);

        // act
        MvcResult response = mockMvc.perform(
                put("/api/todos?id=31")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        // assert
        verify(todoRepository, times(1)).findByIdAndUser(31L, u);
        Map<String, Object> json = responseToJson(response);
        assertEquals("EntityNotFoundException", json.get("type"));
        assertEquals("Todo with id 31 not found", json.get("message"));
    }


    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_todos__admin_logged_in__put_todo() throws Exception {
        // arrange

        User otherUser = User.builder().id(255L).build();
        Todo todo1 = Todo.builder().title("Todo 1").details("Todo 1").done(false).user(otherUser).id(77L).build();
        User yetAnotherUser = User.builder().id(512L).build();
        // We deliberately put the wrong user on the updated todo
        // We expect the controller to ignore this and keep the user the same
        Todo updatedTodo = Todo.builder().title("New Title").details("New Details").done(true).user(yetAnotherUser).id(77L)
                .build();
        Todo correctTodo = Todo.builder().title("New Title").details("New Details").done(true).user(otherUser).id(77L)
                .build();

        String requestBody = mapper.writeValueAsString(updatedTodo);
        String expectedJson = mapper.writeValueAsString(correctTodo);

        when(todoRepository.findById(eq(77L))).thenReturn(Optional.of(todo1));

        // act
        MvcResult response = mockMvc.perform(
                put("/api/todos/admin?id=77")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isOk()).andReturn();

        // assert
        verify(todoRepository, times(1)).findById(77L);
        verify(todoRepository, times(1)).save(correctTodo);
        String responseString = response.getResponse().getContentAsString();
        assertEquals(expectedJson, responseString);
    }

    @WithMockUser(roles = { "ADMIN", "USER" })
    @Test
    public void api_todos__admin_logged_in__cannot_put_todo_that_does_not_exist() throws Exception {
        // arrange

        User otherUser = User.builder().id(345L).build();
        Todo updatedTodo = Todo.builder().title("New Title").details("New Details").done(true).user(otherUser).id(77L)
                .build();

        String requestBody = mapper.writeValueAsString(updatedTodo);

        when(todoRepository.findById(eq(77L))).thenReturn(Optional.empty());

        // act
        MvcResult response = mockMvc.perform(
                put("/api/todos/admin?id=77")
                        .contentType(MediaType.APPLICATION_JSON)
                        .characterEncoding("utf-8")
                        .content(requestBody)
                        .with(csrf()))
                .andExpect(status().isNotFound()).andReturn();

        // assert
        verify(todoRepository, times(1)).findById(77L);
        Map<String, Object> json = responseToJson(response);
        assertEquals("EntityNotFoundException", json.get("type"));
        assertEquals("Todo with id 77 not found", json.get("message"));
    }

}
