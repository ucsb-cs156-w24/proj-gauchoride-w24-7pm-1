package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.UCSBDiningCommons;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.UCSBDiningCommonsRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
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


@Api(description = "UCSBDiningCommons")
@RequestMapping("/api/ucsbdiningcommons")
@RestController
@Slf4j
public class UCSBDiningCommonsController extends ApiController {

    @Autowired
    UCSBDiningCommonsRepository ucsbDiningCommonsRepository;

    @ApiOperation(value = "List all ucsb dining commons")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/all")
    public Iterable<UCSBDiningCommons> allCommonss() {
        Iterable<UCSBDiningCommons> commons = ucsbDiningCommonsRepository.findAll();
        return commons;
    }

    @ApiOperation(value = "Get a single commons")
    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("")
    public UCSBDiningCommons getById(
            @ApiParam("code") @RequestParam String code) {
        UCSBDiningCommons commons = ucsbDiningCommonsRepository.findById(code)
                .orElseThrow(() -> new EntityNotFoundException(UCSBDiningCommons.class, code));

        return commons;
    }

    @ApiOperation(value = "Create a new commons")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/post")
    public UCSBDiningCommons postCommons(
        @ApiParam("code") @RequestParam String code,
        @ApiParam("name") @RequestParam String name,
        @ApiParam("hasSackMeal") @RequestParam boolean hasSackMeal,
        @ApiParam("hasTakeOutMeal") @RequestParam boolean hasTakeOutMeal,
        @ApiParam("hasDiningCam") @RequestParam boolean hasDiningCam,
        @ApiParam("latitude") @RequestParam double latitude,
        @ApiParam("longitude") @RequestParam double longitude
        )
        {

        UCSBDiningCommons commons = new UCSBDiningCommons();
        commons.setCode(code);
        commons.setName(name);
        commons.setHasSackMeal(hasSackMeal);
        commons.setHasTakeOutMeal(hasTakeOutMeal);
        commons.setHasDiningCam(hasDiningCam);
        commons.setLatitude(latitude);
        commons.setLongitude(longitude);

        UCSBDiningCommons savedCommons = ucsbDiningCommonsRepository.save(commons);

        return savedCommons;
    }

    @ApiOperation(value = "Delete a UCSBDiningCommons")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("")
    public Object deleteCommons(
            @ApiParam("code") @RequestParam String code) {
        UCSBDiningCommons commons = ucsbDiningCommonsRepository.findById(code)
                .orElseThrow(() -> new EntityNotFoundException(UCSBDiningCommons.class, code));

        ucsbDiningCommonsRepository.delete(commons);
        return genericMessage("UCSBDiningCommons with id %s deleted".formatted(code));
    }

    @ApiOperation(value = "Update a single commons")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("")
    public UCSBDiningCommons updateCommons(
            @ApiParam("code") @RequestParam String code,
            @RequestBody @Valid UCSBDiningCommons incoming) {

        UCSBDiningCommons commons = ucsbDiningCommonsRepository.findById(code)
                .orElseThrow(() -> new EntityNotFoundException(UCSBDiningCommons.class, code));


        commons.setName(incoming.getName());  
        commons.setHasSackMeal(incoming.getHasSackMeal());
        commons.setHasTakeOutMeal(incoming.getHasTakeOutMeal());
        commons.setHasDiningCam(incoming.getHasDiningCam());
        commons.setLatitude(incoming.getLatitude());
        commons.setLongitude(incoming.getLongitude());

        ucsbDiningCommonsRepository.save(commons);

        return commons;
    }
}
