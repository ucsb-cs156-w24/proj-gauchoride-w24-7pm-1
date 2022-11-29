package edu.ucsb.cs156.gauchoride.repositories;

import org.springframework.beans.propertyeditors.StringArrayPropertyEditor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import edu.ucsb.cs156.gauchoride.entities.UCSBDiningCommons;


@Repository
public interface UCSBDiningCommonsRepository extends CrudRepository<UCSBDiningCommons, String> {
 
}