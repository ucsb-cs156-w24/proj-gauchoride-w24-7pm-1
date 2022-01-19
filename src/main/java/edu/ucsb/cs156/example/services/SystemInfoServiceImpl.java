package edu.ucsb.cs156.example.services;


import edu.ucsb.cs156.example.models.SystemInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Slf4j
@Service("systemInfo")
public class SystemInfoServiceImpl extends SystemInfoService {
  
  @Value("${spring.h2.console.enabled:false}")
  private boolean springH2ConsoleEnabled;

  @Value("${app.showSwaggerUILink:false}")
  private boolean showSwaggerUILink;

  public SystemInfo getSystemInfo() {
    SystemInfo si = SystemInfo.builder()
    .springH2ConsoleEnabled(this.springH2ConsoleEnabled)
    .showSwaggerUILink(this.showSwaggerUILink)
    .build();
  log.info("getSystemInfo returns {}",si);
  return si;
  }

}
