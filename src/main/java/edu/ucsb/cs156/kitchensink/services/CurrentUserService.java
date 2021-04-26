package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.User;
import edu.ucsb.cs156.kitchensink.models.CurrentUser;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public abstract class CurrentUserService {
  public abstract User getUser();
  public abstract CurrentUser getCurrentUser();
  public abstract Collection<? extends GrantedAuthority> getRoles();

  public final boolean isLoggedIn() {
    return getUser() != null;
  }

}
