package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.repositories.TodoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@Api(description = "Todos")
@RequestMapping("/api/todos")
@RestController
@Slf4j
public class TodosController extends ApiController {

    @Autowired
    TodoRepository todoRepository;

    @ApiOperation(value = "List all todos")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all")
    public Iterable<Todo> allUsersTodos() {
        Iterable<Todo> todos = todoRepository.findAll();
        return todos;
    }

    @ApiOperation(value = "List this user's todos")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Todo> thisUsersTodos() {
        CurrentUser currentUser = getCurrentUser();
        Iterable<Todo> todos = todoRepository.findAllByUserId(currentUser.getUser().getId());
        return todos;
    }

    @ApiOperation(value = "Get a single todo (if it belongs to current user)")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public Todo getTodoById(
            @ApiParam("id") @RequestParam Long id) {
        User currentUser = getCurrentUser().getUser();
        Todo todo = todoRepository.findByIdAndUser(id, currentUser)
          .orElseThrow(() -> new EntityNotFoundException(Todo.class, id));

        return todo;
    }

    @ApiOperation(value = "Get a single todo (no matter who it belongs to, admin only)")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public Todo getTodoById_admin(
            @ApiParam("id") @RequestParam Long id) {
        Todo todo = todoRepository.findById(id)
          .orElseThrow(() -> new EntityNotFoundException(Todo.class, id));

        return todo;
    }

    @ApiOperation(value = "Create a new Todo")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public Todo postTodo(
            @ApiParam("title") @RequestParam String title,
            @ApiParam("details") @RequestParam String details,
            @ApiParam("done") @RequestParam Boolean done) {
        CurrentUser currentUser = getCurrentUser();
        log.info("currentUser={}", currentUser);

        Todo todo = new Todo();
        todo.setUser(currentUser.getUser());
        todo.setTitle(title);
        todo.setDetails(details);
        todo.setDone(done);
        Todo savedTodo = todoRepository.save(todo);
        return savedTodo;
    }

    @ApiOperation(value = "Delete a Todo owned by this user")
    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("")
    public Object deleteTodo(
            @ApiParam("id") @RequestParam Long id) {
        User currentUser = getCurrentUser().getUser();
        Todo todo = todoRepository.findByIdAndUser(id, currentUser)
          .orElseThrow(() -> new EntityNotFoundException(Todo.class, id));

        todoRepository.delete(todo);

        return genericMessage("Todo with id %s deleted".formatted(id));

    }

    @ApiOperation(value = "Delete another user's todo")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/admin")
    public Object deleteTodo_Admin(
            @ApiParam("id") @RequestParam Long id) {
        Todo todo = todoRepository.findById(id)
          .orElseThrow(() -> new EntityNotFoundException(Todo.class, id));

        todoRepository.delete(todo);

        return genericMessage("Todo with id %s deleted".formatted(id));
    }

    @ApiOperation(value = "Update a single todo (if it belongs to current user)")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("")
    public Todo putTodoById(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid Todo incomingTodo) {
        User currentUser = getCurrentUser().getUser();
        Todo todo = todoRepository.findByIdAndUser(id, currentUser)
          .orElseThrow(() -> new EntityNotFoundException(Todo.class, id));

        todo.setTitle(incomingTodo.getTitle());
        todo.setDetails(incomingTodo.getDetails());
        todo.setDone(incomingTodo.isDone());

        todoRepository.save(todo);

        return todo;
    }

    @ApiOperation(value = "Update a single todo (regardless of ownership, admin only, can't change ownership)")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/admin")
    public Todo putTodoById_admin(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid Todo incomingTodo) {
        Todo todo = todoRepository.findById(id)
          .orElseThrow(() -> new EntityNotFoundException(Todo.class, id));

        todo.setTitle(incomingTodo.getTitle());
        todo.setDetails(incomingTodo.getDetails());
        todo.setDone(incomingTodo.isDone());

        todoRepository.save(todo);

        return todo;
    }
}
