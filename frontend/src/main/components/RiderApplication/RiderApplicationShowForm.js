import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function RiderApplicationShowForm({ initialContents, buttonLabel = "Back", email}) {
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
   
    const testIdPrefix = "RiderApplicationShowForm";


    return (

        <Form onSubmit={handleSubmit()}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="status">Status</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-status"}
                        id="status"
                        type="text"
                        {...register("status")}
                        defaultValue={initialContents?.status}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-email"}
                    id="email"
                    type="text"
                    {...register("email")}
                    defaultValue={email}
                    disabled
                />
            </Form.Group>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="created_date">Date Applied</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-created_date"}
                        id="created_date"
                        type="text"
                        {...register("created_date")}
                        defaultValue={initialContents?.created_date}
                        disabled
                    />
                </Form.Group>
            )}
            
            
            {initialContents?.status === "cancelled" && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="cancelled_date">Date Cancelled</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-cancelled_date"}
                        id="cancelled_date"
                        type="text"
                        {...register("cancelled_date")}
                        defaultValue={initialContents?.cancelled_date}
                        disabled
                    />
                </Form.Group>
            )}

            {initialContents?.status === "expired" && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="expired_date">Date Expired</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-expired_date"}
                        id="expired_date"
                        type="text"
                        {...register("expired_date")}
                        defaultValue={initialContents?.updated_date}
                        disabled
                    />
                </Form.Group>
            )}

            {initialContents?.status === "approved" && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="approved_date">Date Approved</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-approved_date"}
                        id="approved_date"
                        type="text"
                        {...register("approved_date")}
                        defaultValue={initialContents?.approved_date}
                        disabled
                    />
                </Form.Group>
            )}

            {initialContents?.status === "declined" && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="declined_date">Date Approved</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-declined_date"}
                        id="declined_date"
                        type="text"
                        {...register("declined_date")}
                        defaultValue={initialContents?.declined_date}
                        disabled
                    />
                </Form.Group>
            )}

            {(initialContents?.notes !== "") && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="notes">Notes</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-notes"}
                        id="notes"
                        type="text"
                        {...register("notes")}
                        defaultValue={initialContents?.notes}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3">
                <Form.Label htmlFor="perm_number">Perm Number</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-perm_number"}
                    id="perm_number"
                    type="text"
                    isInvalid={Boolean(errors.perm_number)}
                    {...register("perm_number", {
                        required: "Perm Number is required.",
                        minLength: {
                            value: 7,
                            message: "Perm Number must be exactly 7 characters long."
                        },
                        maxLength: {
                            value: 7,
                            message: "Perm Number must be exactly 7 characters long."
                        }
                    })}
                    placeholder="e.g. 0000000"
                    defaultValue={initialContents?.perm_number}
                    disabled
                />
                <Form.Control.Feedback type="invalid">
                    {errors.perm_number?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Label style={{ display: 'block', fontSize: '80%', fontStyle: 'italic', color: '#888' }}>Please describe the mobility limitations that cause you to need to use the Gauchoride service.</Form.Label>                        
                <Form.Control
                    data-testid={testIdPrefix + "-description"}
                    id="description"
           horide   as="textarea"
                    isInvalid={Boolean(errors.description)}
                    {...register("description", {
                        required: "Description is required."
                    })}
                    placeholder="e.g. My legs are broken."  
                    defaultValue={initialContents?.description}
                    disabled
                    style={{ width: '100%', minHeight: '10rem', resize: 'vertical', verticalAlign: 'top' }}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Button
                type="submit"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
            {buttonLabel}
            </Button>

        </Form>

    )
}

export default RiderApplicationShowForm;