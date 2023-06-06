package edu.ucsb.cs156.gauchoride.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "shift")
public class Shift {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;
  private String day;
  // private LocalTime shiftStart;
  // private LocalTime shiftEnd;
  private String shiftStart; //format "HH:MM"
  private String shiftEnd; //format "HH:MM"
  private long driverID;
  private long driverBackupID;
}