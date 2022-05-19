import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function DiningCommonsForm({ initialCommons, submitAction, buttonLabel = "Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialCommons || {} }
    );
    // Stryker enable all

    const navigate = useNavigate();

    const minLat = -90.0;
    const maxLat = 90.0;
    const minLong = -180.0;
    const maxLong = 180.0;

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialCommons && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="code">Code</Form.Label>
                    <Form.Control
                        data-testid="DiningCommonsForm-code"
                        id="code"
                        type="text"
                        {...register("code")}
                        value={initialCommons.code}
                        disabled
                    />
                </Form.Group>
            )}


            {!initialCommons && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="code">Code</Form.Label>
                    <Form.Control
                        data-testid="DiningCommonsForm-code"
                        id="code"
                        type="text"
                        isInvalid={Boolean(errors.code)}
                        {...register("code", {
                            required: "Code is required."
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.code?.message}
                    </Form.Control.Feedback>
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsForm-name"
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("name", {
                        required: "Name is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="hasSackMeal">Has Sack Meal?</Form.Label>
                <Form.Check
                    data-testid="DiningCommonsForm-hasSackMeal"
                    type="checkbox"
                    id="hasSackMeal"
                    {...register("hasSackMeal")}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="hasTakeOutMeal">Has Takeout Meal?</Form.Label>
                <Form.Check
                    data-testid="DiningCommonsForm-hasTakeOutMeal"
                    type="checkbox"
                    id="hasTakeOutMeal"
                    {...register("hasTakeOutMeal")}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="hasDiningCam">Has Dining Cam?</Form.Label>
                <Form.Check
                    data-testid="DiningCommonsForm-hasDiningCam"
                    type="checkbox"
                    id="hasDiningCam"
                    {...register("hasDiningCam")}
                />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="latitude">Latitude</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsForm-latitude"
                    id="latitude"
                    type="number"
                    step="0.000001"
                    precision={6}   
                    isInvalid={Boolean(errors.latitude)}
                    {...register("latitude", { required: true, min: minLat, max: maxLat })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.latitude && 'latitude is required. '}
                    {errors.latitude &&
                        (errors.latitude.type === 'min' || errors.latitude.type === 'max') && `latitude should be between ${minLat} and ${maxLat}`}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group className="mb-3" >
                <Form.Label htmlFor="longitude">Longitude</Form.Label>
                <Form.Control
                    data-testid="DiningCommonsForm-longitude"
                    id="longitude"
                    type="number"
                    step="0.000001"
                    precision={6} 
                    isInvalid={Boolean(errors.longitude)}
                    {...register("longitude", { required: true, min: -180.0, max: 180.0 })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.longitude && 'longitude is required. '}
                    {errors.longitude &&
                        (errors.longitude.type === 'min' || errors.longitude.type === 'max') && `longitude should be between ${minLong} and ${maxLong}`}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="DiningCommonsForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="DiningCommonsForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default DiningCommonsForm;
