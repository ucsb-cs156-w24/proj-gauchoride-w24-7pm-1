package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.models.SystemInfo;
import edu.ucsb.cs156.example.services.CurrentUserService;
import edu.ucsb.cs156.example.services.SystemInfoService;

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
