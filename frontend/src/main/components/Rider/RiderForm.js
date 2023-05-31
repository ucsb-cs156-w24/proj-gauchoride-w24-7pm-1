import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


function RiderForm({ initialContents, submitAction, buttonLabel = "Create" }) {

    const navigate = useNavigate();
    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker enable all
   
    const testIdPrefix = "RiderForm";

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
                        value={initialContents.id}
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
                />
                <Form.Control.Feedback type="invalid">
                    {errors.end?.message}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label htmlFor="pickup">Pick Up Location</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-pickup"}
                    id="pickup"
                    type="text"
                    isInvalid={Boolean(errors.pickup)}
                    {...register("pickup", {
                        required: "Pick Up Location is required."
                    })}
                    placeholder="e.g. Anacapa Residence Hall"  
                />
                <Form.Control.Feedback type="invalid">
                    {errors.pickup?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="dropoff">Drop Off Location</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-dropoff"}
                    id="dropoff"
                    type="text"
                    isInvalid={Boolean(errors.dropoff)}
                    {...register("dropoff", {
                        required: "Drop Off Location is required."
                    })}
                    placeholder="e.g. Phelps"  
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dropoff?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="room">Room Number for Dropoff</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-room"}
                    id="room"
                    type="text"
                    isInvalid={Boolean(errors.room)}
                    {...register("room", {
                        required: "Room number is required."
                    })}
                    placeholder="e.g. 2225"  
                />
                <Form.Control.Feedback type="invalid">
                    {errors.room?.message}
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
                />
                <Form.Control.Feedback type="invalid">
                    {errors.course?.message}
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

export default RiderForm;