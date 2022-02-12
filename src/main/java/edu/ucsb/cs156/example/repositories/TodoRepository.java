package edu.ucsb.cs156.example.repositories;

import edu.ucsb.cs156.example.entities.Todo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoRepository extends CrudRepository<Todo, Long> {
  Iterable<Todo> findAllByUserId(Long user_id);
}