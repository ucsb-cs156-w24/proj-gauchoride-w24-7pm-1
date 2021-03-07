package edu.ucsb.cs156.kitchensink.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
  @GetMapping("/")
  public String index() {
    return "Hello, world!";
  }
}
