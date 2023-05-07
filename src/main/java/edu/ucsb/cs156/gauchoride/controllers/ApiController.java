package edu.ucsb.cs156.gauchoride.controllers;

import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.models.CurrentUser;
import edu.ucsb.cs156.gauchoride.services.CurrentUserService;

import java.util.Map;

/**
 * Base class for all API controllers.
 * 
 * Provides a method to get the current user as well as common methods for
 * error handling.
 */

@Slf4j
public abstract class ApiController {
  @Autowired
  private CurrentUserService currentUserService;

  /**
   * Get the current user
   * @return the current user
   */

  protected CurrentUser getCurrentUser() {
    return currentUserService.getCurrentUser();
  }


  /**
   * This creates a plain old java object that can be returned as a JSON response
   * @return a Map object with a single key/value pair: "message" => message
   */

  protected Object genericMessage(String message) {
    return Map.of("message", message);
  }

   /**
   * This catches any EntityNotFoundExceptions and returns a 404 (NOT_FOUND) response
   * @return a Map object that can be returned as a JSON response
   */
  @ExceptionHandler({ EntityNotFoundException.class })
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public Object handleGenericException(Throwable e) {
    return Map.of(
      "type", e.getClass().getSimpleName(),
      "message", e.getMessage()
    );
  }
}
