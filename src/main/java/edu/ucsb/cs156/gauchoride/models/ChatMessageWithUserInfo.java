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
public class ChatMessageWithUserInfo {
  private ChatMessage chatMessage;
  private String email;
}