package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.UCSBDate;
import edu.ucsb.cs156.example.repositories.UCSBDateRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import javax.validation.Valid;


import java.time.LocalDateTime;
import java.util.Optional;

@Api(description = "UCSBDates")
@RequestMapping("/api/ucsbdates")
@RestController
@Slf4j
public class UCSBDatesController extends ApiController {

    /**
     * This inner class helps us factor out some code for checking
     * whether UCSBDate's exist,
     * along with the error messages pertaining to those situations. It
     * bundles together the state needed for those checks.
     */
    private static class UCSBDateOrError {
        Long id;
        UCSBDate ucsbDate;
        ResponseEntity<String> error;

        public UCSBDateOrError(Long id) {
            this.id = id;
        }
    }

    @Autowired
    UCSBDateRepository ucsbDateRepository;

    @Autowired
    ObjectMapper mapper;

    @ApiOperation(value = "List all ucsb dates")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<UCSBDate> allUCSBDates() {
        Iterable<UCSBDate> dates = ucsbDateRepository.findAll();
        return dates;
    }

    @ApiOperation(value = "Get a single date")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public ResponseEntity<String> getById(
            @ApiParam("id") @RequestParam Long id) throws JsonProcessingException {
        UCSBDateOrError uoe = new UCSBDateOrError(id);

        uoe = doesUCSBDateExist(uoe);
        if (uoe.error != null) {
            return uoe.error;
        }

        String body = mapper.writeValueAsString(uoe.ucsbDate);
        return ResponseEntity.ok().body(body);
    }

    @ApiOperation(value = "Create a new date")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public ResponseEntity<String> postUCSBDate(
            @ApiParam("quarterYYYYQ") @RequestParam String quarterYYYYQ,
            @ApiParam("name") @RequestParam String name,
            @ApiParam("date (in iso format, e.g. YYYY-mm-ddTHH:MM:SS; see https://en.wikipedia.org/wiki/ISO_8601)") @RequestParam("localDateTime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime localDateTime)
            throws JsonProcessingException {

        // For an explanation of @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) 
        // See: https://www.baeldung.com/spring-date-parameters

        log.info("localDateTime={}", localDateTime);

        UCSBDate ucsbDate = new UCSBDate();
        ucsbDate.setQuarterYYYYQ(quarterYYYYQ);
        ucsbDate.setName(name);
        ucsbDate.setLocalDateTime(localDateTime);

        UCSBDate savedUcsbDate = ucsbDateRepository.save(ucsbDate);
        String json = mapper.writeValueAsString(savedUcsbDate);
        return ResponseEntity.ok().body(json);
    }


    @ApiOperation(value = "Delete a UCSBDate")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public ResponseEntity<String> deleteUCSBDate(
            @ApiParam("id") @RequestParam Long id) {
        UCSBDateOrError uoe = new UCSBDateOrError(id);

        uoe = doesUCSBDateExist(uoe);
        if (uoe.error != null) {
            return uoe.error;
        }

        ucsbDateRepository.deleteById(id);
        return ResponseEntity.ok().body(String.format("UCSBDate with id %d deleted", id));
    }

    @ApiOperation(value = "Update a single date")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public ResponseEntity<String> updateUCSBDate(
            @ApiParam("id") @RequestParam Long id,
            @RequestBody @Valid UCSBDate incoming) throws JsonProcessingException {
        UCSBDateOrError uoe = new UCSBDateOrError(id);

        uoe = doesUCSBDateExist(uoe);
        if (uoe.error != null) {
            return uoe.error;
        }

        UCSBDate oldDate = uoe.ucsbDate;
        oldDate.setQuarterYYYYQ(incoming.getQuarterYYYYQ());
        oldDate.setName(incoming.getName());
        oldDate.setLocalDateTime(incoming.getLocalDateTime());

        ucsbDateRepository.save(oldDate);

        String body = mapper.writeValueAsString(oldDate);
        return ResponseEntity.ok().body(body);
    }

    /**
     * Pre-conditions: uoe.id is value to look up, uoe.ucsbDate and uoe.error are
     * null
     *
     * Post-condition: if UCSBDate with id uoe.id exists, uoe.ucsbDate now refers to
     * it, and
     * error is null.
     * Otherwise, UCSBDate with id uoe.id does not exist, and error is a suitable
     * return
     * value to
     * report this error condition.
     */
    public UCSBDateOrError doesUCSBDateExist(UCSBDateOrError uoe) {

        Optional<UCSBDate> optionalUCSBDate = ucsbDateRepository.findById(uoe.id);

        if (optionalUCSBDate.isEmpty()) {
            uoe.error = ResponseEntity
                    .badRequest()
                    .body(String.format("UCSBDate with id %d not found", uoe.id));
        } else {
            uoe.ucsbDate = optionalUCSBDate.get();
        }
        return uoe;
    }

}
