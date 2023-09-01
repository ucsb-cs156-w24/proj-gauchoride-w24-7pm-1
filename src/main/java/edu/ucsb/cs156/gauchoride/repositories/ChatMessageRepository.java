package edu.ucsb.cs156.gauchoride.repositories;

import edu.ucsb.cs156.gauchoride.entities.ChatMessage;
import edu.ucsb.cs156.gauchoride.models.ChatMessageWithUserInfo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends CrudRepository<ChatMessage, Long> {
  public Page<ChatMessage> findAll(Pageable pageable);

  @Query("SELECT new edu.ucsb.cs156.gauchoride.models.ChatMessageWithUserInfo(m, u.email) FROM chat_messages m, users u WHERE m.userId = u.id")
  public Page<ChatMessageWithUserInfo> findAllWithUserInfo(Pageable pageable);
}
