package edu.ucsb.cs156.gauchoride.repositories;

import edu.ucsb.cs156.gauchoride.entities.Ride;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RideRepository extends CrudRepository<Ride, Long> {
  Iterable<Ride> findAllByRiderId(long rider_id);
}
