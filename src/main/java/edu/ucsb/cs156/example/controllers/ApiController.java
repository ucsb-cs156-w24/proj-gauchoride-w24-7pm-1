package edu.ucsb.cs156.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.models.SystemInfo;
import edu.ucsb.cs156.example.services.CurrentUserService;
import edu.ucsb.cs156.example.services.LoggingService;
import edu.ucsb.cs156.example.services.SystemInfoService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public abstract class ApiController {
  @Autowired
  private CurrentUserService currentUserService;

  @Autowired
  protected LoggingService loggingService;

  protected CurrentUser getCurrentUser() {
    return currentUserService.getCurrentUser();
  }

  
}
