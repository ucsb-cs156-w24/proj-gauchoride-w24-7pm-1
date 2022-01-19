package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.User;
import edu.ucsb.cs156.example.models.CurrentUser;
import edu.ucsb.cs156.example.models.SystemInfo;
import edu.ucsb.cs156.example.services.CurrentUserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(description="System Information")
@RequestMapping("/api/systemInfo")
@RestController
public class SystemInfoController extends ApiController {
 
  @ApiOperation(value = "Get global information about the application")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("")
  public SystemInfo getSystemInfo() {
    return super.getSystemInfo();
  }
}