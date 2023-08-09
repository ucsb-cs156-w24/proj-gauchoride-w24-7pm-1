package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.entities.Ride;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.repositories.RideRepository;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder.SecretKeyReactiveJwtDecoderBuilder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@Tag(name = "Ride Request")
@RequestMapping("/api/ride_request")
@RestController

public class RideController extends ApiController {

    @Autowired
    RideRepository rideRepository;

    @Operation(summary = "List all rides, only user's if not admin/driver")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Ride> allRides() {
        Iterable<Ride> rides;

        if (getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
            getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_DRIVER"))) {
            rides = rideRepository.findAll();
        } else {
            rides = rideRepository.findAllByRiderId(getCurrentUser().getUser().getId());
        }

        return rides;
    }

    @Operation(summary = "Get a single ride by id, only user's if not admin/driver")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @GetMapping("")
    public Ride getById(
            @Parameter(name="id", description = "long, Id of the Ride to get", 
            required = true)  
            @RequestParam Long id) {
        Ride ride;
        
        if (getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
            getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_DRIVER"))) {
            ride = rideRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));;
        } else {
            ride = rideRepository.findByIdAndRiderId(id, getCurrentUser().getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));
        }

        return ride;
    }

    @Operation(summary = "Create a new ride")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public Ride postRide(
        @Parameter(name="day", description="String, Day of the week ride is requested (Monday - Sunday) and allows Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday", 
                    example="Tuesday", required = true) 
        @RequestParam String day,

        @Parameter(name="startTime", description="String, Time the ride starts HH:MM(A/P)M", example="12:30AM", required = true)
        @RequestParam String startTime,

        @Parameter(name="endTime", description="String, Time the ride ends HH:MM(A/P)M", example="12:30AM", required = true)
        @RequestParam String endTime,

        @Parameter(name="pickupLocation", description="String, Location the ride starts", example="Phelps Hall", required = true)
        @RequestParam String pickupLocation,

        @Parameter(name="dropoffLocation", description="String, Location the ride ends", example="South Hall", required = true)
        @RequestParam String dropoffLocation,

        @Parameter(name="room", description="String, Room number for the dropoffLocation", example="1431", required = true)
        @RequestParam String room,

        @Parameter(name="course", description="String, Course number for the class at the dropoffLocation", example="CMPSC 156", required = true)
        @RequestParam String course
        )
        {

        Ride ride = new Ride();
        
        ride.setRiderId(getCurrentUser().getUser().getId());
        ride.setStudent(getCurrentUser().getUser().getFullName());
        ride.setDay(day);
        ride.setStartTime(startTime);
        ride.setEndTime(endTime);
        ride.setPickupLocation(pickupLocation);
        ride.setDropoffLocation(dropoffLocation);
        ride.setRoom(room);
        ride.setCourse(course);

        Ride savedRide = rideRepository.save(ride);

        return savedRide;
    }

    @Operation(summary = "Delete a ride, only user's if not admin/driver")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @DeleteMapping("")
    public Object deleteRide(
        @Parameter(name="id", description="long, Id of the Ride to be deleted", 
        required = true)
        @RequestParam Long id) {

        Ride ride;

        if (getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
            getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_DRIVER"))) {
            ride = rideRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));;
        } else {
            ride = rideRepository.findByIdAndRiderId(id, getCurrentUser().getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));
        }

        rideRepository.delete(ride);
        return genericMessage("Ride with id %s deleted".formatted(id));
    }


    @Operation(summary = "Update a single ride, only user's if not admin/driver")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @PutMapping("")
    public Ride updateRide(
            @Parameter(name="id", description="long, Id of the Ride to be edited", 
            required = true)
            @RequestParam Long id,
            @RequestBody @Valid Ride incoming) {

        Ride ride;

        if (getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
            getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_DRIVER"))) {
            ride = rideRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));;
        } else {
            ride = rideRepository.findByIdAndRiderId(id, getCurrentUser().getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));
        }

        ride.setDay(incoming.getDay());
        ride.setStartTime(incoming.getStartTime());
        ride.setEndTime(incoming.getEndTime());
        ride.setPickupLocation(incoming.getPickupLocation());
        ride.setDropoffLocation(incoming.getDropoffLocation());
        ride.setRoom(incoming.getRoom());
        ride.setCourse(incoming.getCourse());

        rideRepository.save(ride);

        return ride;
    }
}
