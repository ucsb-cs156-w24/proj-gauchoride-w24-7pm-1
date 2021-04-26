package edu.ucsb.cs156.kitchensink.controllers;

import edu.ucsb.cs156.kitchensink.entities.User;
import edu.ucsb.cs156.kitchensink.services.CurrentUserService;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/currentUser")
@RestController
public class UserInfoController extends ApiController {
  
  @Autowired
  private CurrentUserService currentUserService;
  
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("")
  public User currentUser() {
    return super.currentUser();
  }

  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("/roles")
  public Collection<? extends GrantedAuthority> currentRoles() {
    return currentUserService.getCurrentUsersAuthorities();
  }
}
