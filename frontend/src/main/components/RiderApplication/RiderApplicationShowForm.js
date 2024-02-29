import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function RiderApplicationShowForm({ initialContents,  buttonLabel = "Apply", email}) {
    const navigate = useNavigate();
    
    // Stryker disable all
    const {
        register,
    } = useForm(
        { defaultValues: initialContents }
    );
    // Stryker enable all
   
    const testIdPrefix = "RiderApplicationShowForm";


    return (

        <Form>

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

            {initialContents && (
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

            {initialContents && (
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

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="perm_number">Perm Number</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-perm_number"}
                        id="perm_number"
                        type="text"
                        {...register("perm_number")}
                        defaultValue={initialContents?.perm_number}
                        disabled
                    />
                </Form.Group>
            )}

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Label style={{ display: 'block', fontSize: '80%', fontStyle: 'italic', color: '#888' }}>Please describe the mobility limitations that cause you to need to use the Gauchoride service.</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-description"}
                        id="description"
                        as="textarea"
                        {...register("description")}
                        defaultValue={initialContents?.description}
                        style={{ width: '100%', minHeight: '10rem', resize: 'vertical', verticalAlign: 'top' }}
                        disabled
                    />
                </Form.Group>
            )}

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