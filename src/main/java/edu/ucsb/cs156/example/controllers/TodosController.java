package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.Todo;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.repositories.TodoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(description = "Todos")
@RequestMapping("/api/todos")
@RestController
@Slf4j
public class TodosController extends ApiController {

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    ObjectMapper mapper;

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
        Iterable<Todo> todos = todoRepository. findAllByUserId(currentUser.getUser().getId());
        return todos;
    }
    
    @ApiOperation(value = "Create a new Todo")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public Todo postTodo(
        @ApiParam("title") @RequestParam String title,
        @ApiParam("details") @RequestParam String details,
        @ApiParam("done") @RequestParam Boolean done
    ) {
        log.info("POST /api/todos/put");
        CurrentUser currentUser = getCurrentUser();
        Todo todo = new Todo();
        todo.setUser(currentUser.getUser());
        todo.setTitle(title);
        todo.setDetails(details);
        todo.setDone(done);
        Todo savedTodo = todoRepository.save(todo);
        return savedTodo;
    }

}
