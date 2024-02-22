package edu.ucsb.cs156.gauchoride.models;

import edu.ucsb.cs156.gauchoride.entities.ChatMessage;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DriverInfo {
  private String givenName;
  private String familyName;
  private String email;
  private boolean isDriver;
}