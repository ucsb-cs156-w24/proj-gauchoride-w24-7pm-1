package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.entities.Ride;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.repositories.RideRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

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


@Api(description = "Ride Request")
@RequestMapping("/api/ride_request")
@RestController

public class RideController extends ApiController {

    @Autowired
    RideRepository rideRepository;

    @ApiOperation(value = "List all rides, only users if not admin/driver")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Ride> allRidesForUser() {
        Iterable<Ride> rides;

        if (getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
            getCurrentUser().getRoles().contains(new SimpleGrantedAuthority("ROLE_DRIVER"))) {
            rides = rideRepository.findAll();
        } else {
            rides = rideRepository.findAllByRiderId(getCurrentUser().getUser().getId());
        }

        return rides;
    }

    @ApiOperation(value = "Get a single ride by id, only if users if not admin/driver")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @GetMapping("")
    public Ride getByIdForUser(
            @ApiParam(name="id", type="long", value = "Id of the Ride", 
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

    @ApiOperation(value = "Create a new ride")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public Ride postRide(
        @ApiParam(name="day", type="String", value = "Day of the week ride is requested (Monday - Sunday)", example="Tuesday", 
                    required = true, allowableValues = "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday") 
        @RequestParam String day,

        @ApiParam(name="startTime", type="String", value = "Time the ride starts HH:MM(A/P)M", example="12:30AM", required = true)
        @RequestParam String startTime,

        @ApiParam(name="endTime", type="String", value = "Time the ride ends HH:MM(A/P)M", example="12:30AM", required = true)
        @RequestParam String endTime,

        @ApiParam(name="pickupLocation", type="String", value = "Location the ride starts", example="Phelps Hall", required = true)
        @RequestParam String pickupLocation,

        @ApiParam(name="dropoffLocation", type="String", value = "Location the ride ends", example="South Hall", required = true)
        @RequestParam String dropoffLocation,

        @ApiParam(name="room", type="String", value = "Room number for the dropoffLocation", example="1431", required = true)
        @RequestParam String room,

        @ApiParam(name="course", type="String", value = "Course number for the class at the dropoffLocation", example="CMPSC 156", required = true)
        @RequestParam String course
        )
        {

        Ride ride = new Ride();
        
        ride.setRiderId(getCurrentUser().getUser().getId());
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
}
