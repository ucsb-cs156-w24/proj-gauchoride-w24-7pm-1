package edu.ucsb.cs156.kitchensink.controllers;

import org.springframework.cloud.gateway.mvc.ProxyExchange;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Profile("development")
@RestController
public class FrontendProxyController {
  @GetMapping({"/", "/{path:^(?!api|oauth2).*}/**"})
  public ResponseEntity<String> proxy(ProxyExchange<String> proxy) {
    String path = proxy.path("/");
    return proxy.uri("http://localhost:3000/" + path).get();
  }
}
