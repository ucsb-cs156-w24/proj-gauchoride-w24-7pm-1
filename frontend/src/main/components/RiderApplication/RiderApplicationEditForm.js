import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

function RiderApplicationEditForm({ initialContents, submitAction, email}) {
    const navigate = useNavigate();
    
    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues
    } = useForm(
        { defaultValues: initialContents }
    );
    // Stryker enable all
   
    const testIdPrefix = "RiderApplicationEditForm";

    const onSubmit = async (data) => {
        submitAction(data);
    };
    
    const handleApprove = () => {
        const updatedData = { ...initialContents, status: 'accepted' , notes: getValues("notes") };
        handleAction(updatedData, -1);
    };

    const handleDeny = () => {
        const updatedData = { ...initialContents, status: 'declined' , notes: getValues("notes")};
        handleAction(updatedData, -1);
    };

    const handleExpired = () => {
        const updatedData = { ...initialContents, status: 'expired' , notes: getValues("notes") };
        handleAction(updatedData, -1);
    };

    const handleAction = (data, navigation) => {
        submitAction(data);
        navigate(navigation);
    };
    
    return (

        <Form onSubmit={handleSubmit(onSubmit)}>

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Application Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-id"}
                        id="id"
                        type="text"
                        {...register("id")}
                        defaultValue={initialContents?.id}
                        disabled
                    />
                </Form.Group>
            )}

            {initialContents && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="userId">Applicant Id</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-userId"}
                        id="userId"
                        type="text"
                        {...register("userId")}
                        defaultValue={initialContents?.userId}
                        disabled
                    />
                </Form.Group>
            )}

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
                    <Form.Label htmlFor="updated_date">Date Updated</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-updated_date"}
                        id="updated_date"
                        type="text"
                        {...register("updated_date")}
                        defaultValue={initialContents?.updated_date}
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

            {initialContents && initialContents.status === 'declined' && (
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

            {initialContents && initialContents.status === 'cancelled' && (
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

            {initialContents && initialContents.status === 'expired' && (
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

            {initialContents && initialContents.status !== 'declined' && initialContents.status !== 'cancelled' && initialContents.status !== 'expired' && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="notes">Notes</Form.Label>
                    <Form.Control
                        data-testid={testIdPrefix + "-notes"}
                        id="notes"
                        type="text"
                        {...register("notes")}
                        defaultValue={initialContents?.notes}
                    />
                </Form.Group>
            )} 

            {initialContents && (
                <Form.Group className="mb-3">
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

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Label style={{ display: 'block', fontSize: '80%', fontStyle: 'italic', color: '#888' }}>Please describe the mobility limitations that cause you to need to use the Gauchoride service.</Form.Label>                        
                <Form.Control
                    data-testid={testIdPrefix + "-description"}
                    id="description"
                    as="textarea"
                    isInvalid={Boolean(errors.description)}
                    {...register("description")}
                    defaultValue={initialContents?.description}
                    disabled
                    style={{ width: '100%', minHeight: '10rem', resize: 'vertical', verticalAlign: 'top' }}
                />
            </Form.Group>
            
            {initialContents && initialContents.status === 'pending' && (
                <Button
                    variant="success" // You can customize the variant based on your design
                    onClick={handleApprove}
                    data-testid={testIdPrefix + "-approve"}
                >
                    Approve
                </Button>
            )}

            {initialContents && initialContents.status === 'pending' && (
                <Button
                    variant="danger" // You can customize the variant based on your design
                    onClick={handleDeny}
                    data-testid={testIdPrefix + "-deny"}
                >
                    Deny
                </Button>
            )}

            {initialContents && initialContents.status === 'pending' && (
                <Button
                    type="submit"
                    data-testid={testIdPrefix + "-submit"}
                >
                    Save
                </Button>
            )}

            {initialContents && initialContents.status === 'accepted' && (
                <Button
                    variant="danger"
                    onClick={handleExpired}
                    data-testid={testIdPrefix + "-expire"}
                >
                    Set Status to Expired
                </Button>
            )}
            
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid={testIdPrefix + "-cancel"}
            >
                Return
            </Button>

        </Form>

    )
}

export default RiderApplicationEditForm;