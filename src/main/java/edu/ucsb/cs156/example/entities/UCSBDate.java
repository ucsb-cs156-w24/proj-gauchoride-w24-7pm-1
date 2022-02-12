package edu.ucsb.cs156.example.entities;


import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.GeneratedValue;



import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "ucsbdates")
public class UCSBDate {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String quarterYYYYQ;
  private String name;
  
  LocalDateTime localDateTime;
}