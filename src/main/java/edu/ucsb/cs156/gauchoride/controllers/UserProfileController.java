package edu.ucsb.cs156.gauchoride.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.extern.slf4j.Slf4j;

import javax.validation.Valid;

import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.cs156.gauchoride.entities.User;

@Tag(name="User Profile")
@RequestMapping("/api/userprofile")
@RestController
@Slf4j
public class UserProfileController extends ApiController {

    @Autowired
    UserRepository userRepository;
    
    
    @Operation(summary = "Update a cellPhone")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/update-cellPhone")
    public Object updateCellPhone(
        @Parameter(name="cellPhone", description = "CellPhone number of User", required = true) @RequestParam String cellPhone) {
            Long id = super.getCurrentUser().getUser().getId();
            User user = userRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException(User.class, id));
            user.setCellPhone(cellPhone);
            userRepository.save(user);
            return genericMessage("User with id %s has cellPhone %s".formatted(user.getId(), cellPhone));
        }
}
