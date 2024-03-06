package edu.ucsb.cs156.gauchoride.repositories;
import edu.ucsb.cs156.gauchoride.entities.DriverAvailability;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverAvailabilityRepository extends CrudRepository<DriverAvailability, Long> {
    
}