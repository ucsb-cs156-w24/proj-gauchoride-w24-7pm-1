import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';



function RideForm({ initialContents, submitAction, buttonLabel = "Create" }) {
    const navigate = useNavigate();
    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents }
    );
    // Stryker enable all
   
    const testIdPrefix = "RideForm";


    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        defaultValue={initialContents.id}
                        disabled
                    />
                </Form.Group>
            )}

            

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="day">Day of Week</Form.Label>
                <Form.Select
                    data-testid={testIdPrefix + "-day"}
                    id="day"
                    isInvalid={Boolean(errors.day)}
                    {...register("day", {
                        required: "Day is required.",
                    })}
                >
                <option value="">Select a Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.day?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="start">Start Time</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-start"}
                    id="start"
                    type="text"
                    isInvalid={Boolean(errors.start)}
                    {...register("start", {
                        required: "Start time is required.",
                        pattern: {
                            value: /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/,
                            message: "Please enter time in the format HH:MM AM/PM (e.g., 3:30PM)."
                          }
                    })}
                    placeholder="Enter time in the format HH:MM AM/PM (e.g. 3:30PM)"
                    defaultValue={initialContents?.startTime}

                />
                <Form.Control.Feedback type="invalid">
                    {errors.start?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="end">End Time</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-end"}
                    id="end"
                    type="text"
                    isInvalid={Boolean(errors.start) }
                    {...register("end", {
                        required: "End time is required.",
                        pattern: {
                            value: /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/,
                            message: "Please enter time in the format HH:MM AM/PM (e.g., 3:30PM)."
                          }
                    })}
                    placeholder="Enter time in the format HH:MM AM/PM (e.g. 3:30PM)"   
                    defaultValue={initialContents?.endTime}     
                />
                <Form.Control.Feedback type="invalid">
                    {errors.end?.message}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="pickupBuilding">Pick Up Building</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-pickupBuilding"}
                    id="pickupBuilding"
                    type="text"
                    isInvalid={Boolean(errors.pickupBuilding)}
                    {...register("pickupBuilding", {
                        required: "Pick Up Building is required."
                    })}
                    placeholder="e.g. Anacapa Residence Hall"  
                    defaultValue={initialContents?.pickupBuilding} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.pickupBuilding?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="pickupRoom">Room Number for Pickup</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-pickupRoom"}
                    id="pickupRoom"
                    type="text"
                    isInvalid={Boolean(errors.pickupRoom)}
                    {...register("pickupRoom", {

                    })}
                    placeholder="e.g. 1111"  
                    defaultValue={initialContents?.pickupRoom} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.pickupRoom?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dropoffBuilding">Drop Off Building</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dropoffBuilding"}
                    id="dropoffBuilding"
                    type="text"
                    isInvalid={Boolean(errors.dropoffBuilding)}
                    {...register("dropoffBuilding", {
                        required: "Drop Off Building is required."
                    })}
                    placeholder="e.g. Phelps"  
                    defaultValue={initialContents?.dropoffBuilding}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dropoffBuilding?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dropoffRoom">Room Number for Dropoff</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dropoffRoom"}
                    id="dropoffRoom"
                    type="text"
                    isInvalid={Boolean(errors.dropoffRoom)}
                    {...register("dropoffRoom", {
                        
                    })}
                    placeholder="e.g. 2225"  
                    defaultValue={initialContents?.dropoffRoom} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dropoffRoom?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="course">Course Number</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-course"}
                    id="course"
                    type="text"
                    isInvalid={Boolean(errors.course)}
                    {...register("course", {
                        required: "Course number is required."
                    })}
                    placeholder="e.g. CMPSC 156"  
                    defaultValue={initialContents?.course} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.course?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="notes">Notes</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-notes"}
                    id="notes"
                    type="text"
                    isInvalid={Boolean(errors.notes)}
                    {...register("notes", {

                    })}
                    placeholder="e.g. 2 people"  
                    defaultValue={initialContents?.notes} 
                />
                <Form.Control.Feedback type="invalid">
                    {errors.notes?.message}
                </Form.Control.Feedback>
            </Form.Group>


            <Button
                type="submit"
                data-testid={testIdPrefix + "-submit"}
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Cancel
            </Button>

        </Form>

    )
}

export default RideForm;