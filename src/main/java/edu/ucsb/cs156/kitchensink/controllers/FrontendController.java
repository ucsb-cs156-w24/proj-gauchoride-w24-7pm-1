package edu.ucsb.cs156.kitchensink.controllers;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Profile("!development")
@Controller
public class FrontendController {
  @GetMapping("/**")
  public String index() {
    return "/index.html";
  }
}
