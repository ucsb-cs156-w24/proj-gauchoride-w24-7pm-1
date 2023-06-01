package edu.ucsb.cs156.gauchoride.entities;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.GeneratedValue;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "ride")
public class Ride {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private long rider_id;

  @ApiModelProperty(allowableValues = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday")
  private String day;
  
  private String start_time; // format: HH:MM(A/P)M e.g. "11:00AM" or "1:37PM"
  private String end_time; // format: HH:MM(A/P)M e.g. "11:00AM" or "1:37PM"

  private String pickup_location;
  private String dropoff_location;
  
  private String room;
  private String course; // e.g. CMPSC 156
}