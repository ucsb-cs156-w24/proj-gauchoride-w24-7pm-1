package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.entities.Ride;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.repositories.RideRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @ApiOperation(value = "List all rides")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/all")
    public Iterable<Ride> allRides() {
        Iterable<Ride> rides = rideRepository.findAll();
        return rides;
    }

    @ApiOperation(value = "List all user's rides")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<Ride> allRidesForUser() {
        Iterable<Ride> rides = rideRepository.findAllByRiderId(getCurrentUser().getUser().getId());
        return rides;
    }

    @ApiOperation(value = "Get any single ride")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public Ride getById(
            @ApiParam("id") @RequestParam Long id) {
        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));

        return ride;
    }

    @ApiOperation(value = "Get a single ride, if it belongs to user")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public Ride getByIdForUser(
            @ApiParam("id") @RequestParam Long id) {
        Ride ride = rideRepository.findByIdAndRiderId(id, getCurrentUser().getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException(Ride.class, id));

        return ride;
    }

    @ApiOperation(value = "Create a new ride")
    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/post")
    public Ride postRide(
        @ApiParam("day") @RequestParam String day,
        @ApiParam("startTime") @RequestParam String startTime,
        @ApiParam("endTime") @RequestParam String endTime,
        @ApiParam("pickupLocation") @RequestParam String pickupLocation,
        @ApiParam("dropoffLocation") @RequestParam String dropoffLocation,
        @ApiParam("room") @RequestParam String room,
        @ApiParam("course") @RequestParam String course
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
