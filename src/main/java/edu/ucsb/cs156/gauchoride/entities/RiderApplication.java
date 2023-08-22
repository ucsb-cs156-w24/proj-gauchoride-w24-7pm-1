package edu.ucsb.cs156.gauchoride.entities;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import javax.persistence.GeneratedValue;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "riderapplication")
public class RiderApplication {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId; //user does not ned to used as an input 
    private String status;
    private String perm_number;
    @CreatedDate
    private Date created_date;
    @LastModifiedDate
    private Date updated_date;
    
    private Date cancelled_date;
    private String description;
    private String notes;

}