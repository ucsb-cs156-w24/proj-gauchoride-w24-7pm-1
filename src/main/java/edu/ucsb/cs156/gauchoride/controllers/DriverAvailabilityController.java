package edu.ucsb.cs156.gauchoride.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import edu.ucsb.cs156.gauchoride.entities.DriverAvailability;
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

    //Lets admins get all driver availabilties
    @Operation(summary= "List all driver availabilities")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all")
    public Iterable<DriverAvailability> allDriverAvailabilities() {
        Iterable<DriverAvailability> availabilities = driverAvailabilityRepository.findAll();
        return availabilities;
    }

}
