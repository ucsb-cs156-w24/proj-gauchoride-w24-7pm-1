package edu.ucsb.cs156.kitchensink.services;

import edu.ucsb.cs156.kitchensink.entities.User;
import lombok.experimental.Delegate;

import java.util.Map;

public abstract class CurrentUserService {
  public abstract User get();

  public final boolean isLoggedIn() {
    return get() != null;
  }

  public final boolean isMember() {
    User user = get();
    if (user == null) {
      return false;
    }

    return user.isMember();
  }
}
