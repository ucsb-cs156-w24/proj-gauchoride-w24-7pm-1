package edu.ucsb.cs156.example.controllers;

import org.springframework.cloud.gateway.mvc.ProxyExchange;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import java.net.ConnectException;

@Profile("development")
@RestController
public class FrontendProxyController {
  @GetMapping({"/", "/{path:^(?!api|oauth2|swagger-ui).*}/**"})
  public ResponseEntity<String> proxy(ProxyExchange<String> proxy) {
    String path = proxy.path("/");
    try {
      return proxy.uri("http://localhost:3000/" + path).get();
    } catch (ResourceAccessException e) {
      if (e.getCause() instanceof ConnectException) {
        return ResponseEntity.ok("Failed to connect to the frontend server! You may have forgotten to run npm start in a separate ./dev_environment window (or it hasn't loaded yet).");
      }
      throw e;
    }
  }
}
