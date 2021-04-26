package edu.ucsb.cs156.kitchensink.controllers;

import edu.ucsb.cs156.kitchensink.entities.User;
import edu.ucsb.cs156.kitchensink.models.CurrentUser;
import edu.ucsb.cs156.kitchensink.services.CurrentUserService;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class ApiController {
  @Autowired
  private CurrentUserService currentUserService;

  protected User getUser() {
    return currentUserService.getUser();
  }

  protected CurrentUser getCurrentUser() {
    return currentUserService.getCurrentUser();
  }
  
}
