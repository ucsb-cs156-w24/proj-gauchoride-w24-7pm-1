package edu.ucsb.cs156.kitchensink;

import edu.ucsb.cs156.kitchensink.entities.User;
import edu.ucsb.cs156.kitchensink.services.CurrentUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;

@ActiveProfiles("test")
public abstract class ControllerTestCase {
  @Autowired
  protected MockMvc mockMvc;

  @MockBean
  private CurrentUserService currentUserService;

  protected void loginAs(User user) {
    when(currentUserService.getUser()).thenReturn(user);
  }
}
