package edu.ucsb.cs156.gauchoride.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.ucsb.cs156.gauchoride.entities.DriverAvailability;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.repositories.DriverAvailabilityRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "DriverAvailability")
@RequestMapping("/api/driverAvailability")
@RestController
@Slf4j
public class DriverAvailabilityController extends ApiController{

    @Autowired
    DriverAvailabilityRepository driverAvailabilityRepository;

    //Allows driver to create and post new availability
    @Operation(summary= "Create a new driver availability")
    @PreAuthorize("hasRole('ROLE_DRIVER')")
    @PostMapping("/new")
    public DriverAvailability postDriverAvailability(
            @Parameter(name="driverId") @RequestParam long driverId,
            @Parameter(name="day") @RequestParam String day,
            @Parameter(name="startTime") @RequestParam String startTime,
            @Parameter(name="endTime") @RequestParam String endTime,
            @Parameter(name="notes") @RequestParam String notes)
            throws JsonProcessingException {


        log.info("notes={}", notes);

        DriverAvailability driverAvailability = new DriverAvailability();
        driverAvailability.setDriverId(driverId);
        driverAvailability.setDay(day);
        driverAvailability.setStartTime(startTime);
        driverAvailability.setEndTime(endTime);
        driverAvailability.setNotes(notes);

        DriverAvailability savedDriverAvailability = driverAvailabilityRepository.save(driverAvailability);

        return savedDriverAvailability;
    }

    //GET all availability submissions for the current user.
    @Operation(summary = "Get all driver availabilites owned by the current user")
    @PreAuthorize("hasRole('ROLE_DRIVER')")
    @GetMapping("")
    public Iterable<DriverAvailability> allApplications() {
        Iterable<DriverAvailability> availabilities;
        availabilities = driverAvailabilityRepository.findAllByDriverId(getCurrentUser().getUser().getId());
        return availabilities;
    }

    //GET a single availability by ID if owned by the current user
    @Operation(summary = "Get a single availability but only if owned by the current user")
    @PreAuthorize("hasRole('ROLE_DRIVER')")
    @GetMapping("id")
    public DriverAvailability getById(
                    @Parameter(name="id", description = "Long, Id of the driver availability to get", 
                    required = true)  
                    @RequestParam Long id) 
    {
        DriverAvailability availability;
        availability = driverAvailabilityRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException(DriverAvailability.class, id));
        return availability;
    }

    //Edits an availability if owned by current user
    @Operation(summary = "Edit an existing driver availability but only if it is owned by the current user")
    @PreAuthorize("hasRole('ROLE_DRIVER')")
    @PutMapping("")
    public ResponseEntity<Object> updateDriverAvailability(
                            @Parameter(name="id", description="long, Id of the driver availability to be edited", 
                            required = true)
                            @RequestParam Long id,
                            @RequestBody @Valid DriverAvailability incoming)
    {
        DriverAvailability availability;

        availability = driverAvailabilityRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException(DriverAvailability.class, id));

        availability.setDriverId(incoming.getDriverId());
        availability.setDay(incoming.getDay());
        availability.setStartTime(incoming.getStartTime());
        availability.setEndTime(incoming.getEndTime());
        availability.setNotes(incoming.getNotes());

        driverAvailabilityRepository.save(availability);
        return ResponseEntity.ok(availability);

    }

    //DELETE for driver Availability
    @Operation(summary= "Delete a driver availability")
    @PreAuthorize("hasRole('ROLE_DRIVER')")
    @DeleteMapping("")
    public Object deleteDriverAvailability(
            @Parameter(name="id") @RequestParam Long id) {
        DriverAvailability availability = driverAvailabilityRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(DriverAvailability.class, id));

        driverAvailabilityRepository.delete(availability);
        return genericMessage("DriverAvailability with id %s deleted".formatted(id));
    }

    //Lets Admin GET a single availability by ID
    @Operation(summary = "Admin can get a single availability by id")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("admin")
    public DriverAvailability adminGetById(
                    @Parameter(name="id", description = "Long, Id of the driver availability to get", 
                    required = true)  
                    @RequestParam Long id) 
    {
        DriverAvailability availability;
        availability = driverAvailabilityRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException(DriverAvailability.class, id));
        return availability;
    }

    //Lets admins get all driver availabilties
    @Operation(summary= "List all driver availabilities")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all")
    public Iterable<DriverAvailability> allDriverAvailabilities() {
        Iterable<DriverAvailability> availabilities = driverAvailabilityRepository.findAll();
        return availabilities;
    }

}