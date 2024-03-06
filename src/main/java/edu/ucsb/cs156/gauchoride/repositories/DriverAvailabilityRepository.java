package edu.ucsb.cs156.gauchoride.repositories;
import edu.ucsb.cs156.gauchoride.entities.DriverAvailability;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverAvailabilityRepository extends CrudRepository<DriverAvailability, Long> {
    Iterable<DriverAvailability> findAllById(long id);
    Iterable<DriverAvailability> findAllByDriverId(long driverId);
    Optional<DriverAvailability> findByIdAndDriverId(Long id, Long driverId);
}