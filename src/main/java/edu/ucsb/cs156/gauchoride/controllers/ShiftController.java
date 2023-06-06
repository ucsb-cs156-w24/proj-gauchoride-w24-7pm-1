package edu.ucsb.cs156.gauchoride.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.cs156.gauchoride.entities.Shift;
import edu.ucsb.cs156.gauchoride.repositories.ShiftRepository;
import edu.ucsb.cs156.gauchoride.repositories.UserRepository;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.models.CurrentUser;

import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;


@Api(description = "Shift information")
@RequestMapping("/api/shift")
@RestController
public class ShiftController extends ApiController {
    @Autowired
    ShiftRepository shiftRepository;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "Get a list of all shifts")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @GetMapping("/all")
    public ResponseEntity<String> allShifts()
            throws JsonProcessingException {
        Iterable<Shift> shifts = shiftRepository.findAll();
        String body = mapper.writeValueAsString(shifts);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Get shift by id")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_DRIVER') || hasRole('ROLE_USER')")
    @GetMapping("/get")
    public Shift shiftByID(
            @ApiParam(name = "id", type = "Long", value = "id number of shift to get", example = "1", required = true) @RequestParam Long id)
            throws JsonProcessingException {
        Shift shift = shiftRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Shift.class, id));
        return shift;
    }

    @ApiOperation(value = "Create a new shift for the table")
    @PreAuthorize("hasRole('ROLE_DRIVER')")
    @PostMapping("/post")
    public Shift postShift(
        @ApiParam("day") @RequestParam String day,
        @ApiParam("shiftStart") @RequestParam String shiftStart,
        @ApiParam("shiftEnd") @RequestParam String shiftEnd,
        @ApiParam("driverID") @RequestParam long driverID ,
        @ApiParam("driverBackupID") @RequestParam long driverBackupID
        )
        {

        Shift shift = new Shift();

        shift.setDriverID(getCurrentUser().getUser().getId());
        shift.setDay(day);
        shift.setShiftStart(shiftStart);
        shift.setShiftEnd(shiftEnd);
        shift.setDriverBackupID(driverBackupID);

        Shift savedShift = shiftRepository.save(shift);

        return savedShift;
    }
}