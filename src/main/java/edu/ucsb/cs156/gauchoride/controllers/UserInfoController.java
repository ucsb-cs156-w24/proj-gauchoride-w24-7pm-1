package edu.ucsb.cs156.gauchoride.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.cs156.gauchoride.entities.User;
import edu.ucsb.cs156.gauchoride.models.CurrentUser;
import edu.ucsb.cs156.gauchoride.services.CurrentUserService;

@Tag(name="Current User Information")
@RequestMapping("/api/currentUser")
@RestController
public class UserInfoController extends ApiController {
 
  @Operation(summary = "Get information about current user")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("")
  public CurrentUser getCurrentUser() {
    return super.getCurrentUser();
  }
}
