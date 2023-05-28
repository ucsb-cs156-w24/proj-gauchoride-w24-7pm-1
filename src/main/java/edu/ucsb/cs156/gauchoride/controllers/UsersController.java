package edu.ucsb.cs156.gauchoride.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;

import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@Api(description = "User information (admin only)")
@RequestMapping("/api/admin/users")
@RestController
public class UsersController extends ApiController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "Get a list of all users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("")
    public ResponseEntity<String> users()
            throws JsonProcessingException {
        Iterable<User> users = userRepository.findAll();
        String body = mapper.writeValueAsString(users);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Get user by id")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get")
    public User users(
            @ApiParam(name = "id", type = "Long", value = "id number of user to get", example = "1", required = true) @RequestParam Long id)
            throws JsonProcessingException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(User.class, id));
        return user;
    }

    @ApiOperation(value = "Delete a user (admin)")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public Object deleteUser_Admin(
            @ApiParam(name = "id", type = "Long", value = "id number of user to delete", example = "1", required = true) @RequestParam Long id) {
              User user = userRepository.findById(id)
          .orElseThrow(() -> new EntityNotFoundException(User.class, id));

          userRepository.delete(user);

        return genericMessage("User with id %s deleted".formatted(id));
    }

    
    @ApiOperation(value = "Toggle the admin field")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/toggleAdmin")
    public Object toggleAdmin( @ApiParam(name = "id", type = "Long", value = "id number of user to toggle their admin field", example = "1", required = true) @RequestParam Long id){
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(User.class, id));

        user.setAdmin(!user.getAdmin());
        userRepository.save(user);
        return genericMessage("User with id %s has toggled admin status".formatted(id));
    }

    @ApiOperation(value = "Toggle the driver field")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/toggleDriver")
    public Object toggleDriver( @ApiParam(name = "id", type = "Long", value = "id number of user to toggle their driver field", example = "1", required = true) @RequestParam Long id){
        User user = userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException(User.class, id));

        user.setDriver(!user.getDriver());
        userRepository.save(user);
        return genericMessage("User with id %s has toggled driver status".formatted(id));
    }

}