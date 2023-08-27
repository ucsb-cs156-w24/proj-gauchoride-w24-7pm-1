package edu.ucsb.cs156.gauchoride.controllers;

import edu.ucsb.cs156.gauchoride.entities.RiderApplication;
import edu.ucsb.cs156.gauchoride.errors.EntityNotFoundException;
import edu.ucsb.cs156.gauchoride.repositories.RiderApplicationRepository;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Tag(name = "Rider Application")
@RequestMapping("/api")
@RestController

public class RiderApplicationController extends ApiController {

    @Autowired
    RiderApplicationRepository riderApplicationRepository;
    

    // // Endpoints for ROLE_MEMBER

    @Operation(summary = "Create a new rider application with the current user as the requester")
    @PreAuthorize("hasRole('ROLE_MEMBER')")
    @PostMapping("/riderApplication/new")
    public RiderApplication postRiderApplication(
        @Parameter(name="perm_number", description="String, Perm number consisting of 7 characters", example = "1234567", required = true) 
        @RequestParam String perm_number,

        @Parameter(name="description", description="String, Please describe the mobility limitations that cause you to need to use the Gauchoride service. ", example = "My legs are broken", required = true) 
        @RequestParam String description
    )
    {
        RiderApplication riderApplication = new RiderApplication();
        // Get the current date
        LocalDate localDate = LocalDate.now();
        Date currentDate = Date.valueOf(localDate);

        riderApplication.setStatus("pending");
        riderApplication.setUserId(getCurrentUser().getUser().getId());
        riderApplication.setEmail(getCurrentUser().getUser().getEmail());
        riderApplication.setPerm_number(perm_number);
        riderApplication.setCreated_date(currentDate);
        riderApplication.setUpdated_date(currentDate);
        riderApplication.setDescription(description);
        riderApplication.setNotes("");

        RiderApplication savedApplication = riderApplicationRepository.save(riderApplication);
        return savedApplication;
    };

    @Operation(summary = "Get all rider applications owned by the current user")
    @PreAuthorize("hasRole('ROLE_MEMBER')")
    @GetMapping("/rider")
    public Iterable<RiderApplication> allApplications()
    {
        Iterable<RiderApplication> applications;
        applications = riderApplicationRepository.findAllByUserId(getCurrentUser().getUser().getId());
        return applications;
    };

    @Operation(summary = "Get a single rider application but only if owned by the current user")
    @PreAuthorize("hasRole('ROLE_MEMBER')")
    @GetMapping("/riderApplication")
    public RiderApplication getById(
                    @Parameter(name="id", description = "Long, Id of the RiderApplication to get", 
                    required = true)  
                    @RequestParam Long id)
    {
        RiderApplication application;
        application = riderApplicationRepository.findByIdAndUserId(id, getCurrentUser().getUser().getId())
                    .orElseThrow(() -> new EntityNotFoundException(RiderApplication.class, id));
        return application;
    };    

    @Operation(summary = "Edit an existing rider application but only if it is owned by the current user and the application is in the correct status")
    @PreAuthorize("hasRole('ROLE_MEMBER')")
    @PutMapping("/riderApplication")
    public ResponseEntity<Object> updateApplication(
                            @Parameter(name="id", description="long, Id of the Application to be edited", 
                            required = true)
                            @RequestParam Long id,
                            @RequestBody @Valid RiderApplication incoming)
    {
        RiderApplication application;

        application = riderApplicationRepository.findByIdAndUserId(id, getCurrentUser().getUser().getId())
                    .orElseThrow(() -> new EntityNotFoundException(RiderApplication.class, id));

        if ("pending".equals(application.getStatus()))
        {
            // Get the current date
            LocalDate localDate = LocalDate.now();
            Date currentDate = Date.valueOf(localDate);

            application.setPerm_number(incoming.getPerm_number());
            application.setUpdated_date(currentDate);
            application.setDescription(incoming.getDescription());

            riderApplicationRepository.save(application);
            return ResponseEntity.ok(application);
        }
        else
        {
            String errorMessage = "RiderApplication with \"" + application.getStatus() + "\" status cannot be updated";
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }; 

    @Operation(summary = "Cancel an existing rider application but only if it is owned by the current user and the application is in the correct status")
    @PreAuthorize("hasRole('ROLE_MEMBER')")
    @PutMapping("/riderApplication/cancel")
    public Object cancelApplication(
                            @Parameter(name="id", description="long, Id of the Application to be edited", 
                            required = true)
                            @RequestParam Long id)
                            
    {
        RiderApplication application;

        application = riderApplicationRepository.findByIdAndUserId(id, getCurrentUser().getUser().getId())
                    .orElseThrow(() -> new EntityNotFoundException(RiderApplication.class, id));
        
        if ("pending".equals(application.getStatus()))
        {
            // Get the current date
            LocalDate localDate = LocalDate.now();
            Date currentDate = Date.valueOf(localDate);

            application.setStatus("cancelled");
            application.setUpdated_date(currentDate);
            application.setCancelled_date(currentDate);
            riderApplicationRepository.save(application);

            return genericMessage("Application with id %s is deleted".formatted(id));
        }
        else
        {
            return genericMessage("Application with \"%s\" status cannot be cancelled".formatted(application.getStatus()));
        }
    };


    // // Endpoints for ROLE_ADMIN

    @Operation(summary = "Get all rider applications")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/rider/admin/all")
    public Iterable<RiderApplication> allApplicationsAdmin()
    {
        Iterable<RiderApplication> applications;
        applications = riderApplicationRepository.findAll();
        return applications;
    };

    @Operation(summary = "Get all pending rider applications")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/rider/admin/pending")
    public Iterable<RiderApplication> allPendingApplications()
    {
        Iterable<RiderApplication> pendingApplications;
        pendingApplications = riderApplicationRepository.findAllByStatus("pending");

        return pendingApplications;
    };

    @Operation(summary = "Get a specific rider application")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/rider/admin")
    public RiderApplication specificApplication(
                            @Parameter(name="id", description="long, Id of the Application to find", 
                            required = true)
                            @RequestParam Long id)
    {
        RiderApplication application;
        application = riderApplicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(RiderApplication.class, id));
        return application;
    };

    @Operation(summary = "Update the status/notes field of an application")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/rider/admin")
    public RiderApplication updateApplicationAdmin(
                            @Parameter(name="id", description="long, Id of the Application to be updated", 
                            required = true)
                            @RequestParam Long id,

                            @Parameter(name="status", description="String, New Status of the Application", 
                                        required = false)
                            @RequestParam String status,

                            @Parameter(name="notes", description="String, Notes to notify the Applicant", 
                                        required = false)
                            @RequestParam String notes)
    {
        RiderApplication application;
        application = riderApplicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(RiderApplication.class, id));

        if (!status.isEmpty())
        {
            application.setStatus(status);
        }

        if (!notes.isEmpty())
        {
            application.setNotes(notes);
        }      
        
        riderApplicationRepository.save(application);
        return application;
    };

}
