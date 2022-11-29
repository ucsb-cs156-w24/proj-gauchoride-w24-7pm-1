package edu.ucsb.cs156.gauchoride.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.gauchoride.entities.UCSBDate;


@Repository
public interface UCSBDateRepository extends CrudRepository<UCSBDate, Long> {
  Iterable<UCSBDate> findAllByQuarterYYYYQ(String quarterYYYYQ);
}