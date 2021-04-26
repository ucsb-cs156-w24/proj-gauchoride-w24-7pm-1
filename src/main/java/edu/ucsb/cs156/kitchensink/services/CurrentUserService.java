package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.User;
import lombok.experimental.Delegate;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;

public abstract class CurrentUserService {
  public abstract User get();
  public abstract Collection<? extends GrantedAuthority> getCurrentUsersAuthorities();

  public final boolean isLoggedIn() {
    return get() != null;
  }

}
