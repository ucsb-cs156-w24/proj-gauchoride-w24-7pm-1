import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function DriverAvailabilityForm({ initialContents, submitAction, buttonLabel = "Create" }) {
    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialContents || {}, }
    );
    // Stryker restore all
   
    const navigate = useNavigate();

    const testIdPrefix = "DriverAvailabilityForm";

    return (
        <Form onSubmit={handleSubmit(submitAction)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">id</Form.Label>
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
                <Form.Label htmlFor="driverId">driverId</Form.Label>
                <Form.Control
                    data-testdriverId={testIdPrefix + "-driverId"}
                    driverId="driverId"
                    type="text"
                    isInvalid={Boolean(errors.driverId)}
                    {...register("driverId", {
                        required: "driverId is required.",
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.driverId?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="day">day</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-day"}
                    day="day"
                    type="text"
                    isInvalid={Boolean(errors.day)}
                    {...register("day", {
                        required: "day is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.day?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="startTime">startTime</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-startTime"}
                    startTime="startTime"
                    type="text"
                    isInvalid={Boolean(errors.startTime)}
                    {...register("startTime", {
                        required: "startTime is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.startTime?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="endTime">endTime</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-endTime"}
                    startTime="endTime"
                    type="text"
                    isInvalid={Boolean(errors.endTime)}
                    {...register("endTime", {
                        required: "endTime is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.endTime?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="notes">notes</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-notes"}
                    startTime="notes"
                    type="text"
                    isInvalid={Boolean(errors.notes)}
                    {...register("notes", {
                        required: "notes is required."
                    })}
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

export default DriverAvailabilityForm;