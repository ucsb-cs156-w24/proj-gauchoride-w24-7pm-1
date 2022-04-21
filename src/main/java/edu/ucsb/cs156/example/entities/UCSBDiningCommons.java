package edu.ucsb.cs156.example.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity(name = "ucsbdiningcommons")
public class UCSBDiningCommons {
  @Id
  private String code;
  private String name;
  private boolean hasSackMeal;
  private boolean hasTakeOutMeal;
  private boolean hasDiningCam;
  private Double latitude;
  private Double longitude;

  // public boolean getHasSackMeal() { return this.hasSackMeal; }
  // public boolean getHasTakeOutMeal() { return this.hasTakeOutMeal; }
  // public boolean getHasDiningCam() { return this.hasDiningCam; }


}