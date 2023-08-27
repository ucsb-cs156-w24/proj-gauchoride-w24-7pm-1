package edu.ucsb.cs156.gauchoride.entities;

import javax.persistence.Entity;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.GeneratedValue;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "chat_messages")
public class ChatMessage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private long userId;
  private String payload;

  @CreationTimestamp
  private LocalDateTime timestamp;

    //UNUSED: TO IMPL LATER
  private boolean dm;
  private long toUserId;
}