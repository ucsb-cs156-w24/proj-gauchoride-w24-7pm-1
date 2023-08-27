import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';



function ChatMessageForm({ initialContents, submitAction, buttonLabel = "Send" }) {
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
   
    const testIdPrefix = "ChatMessageForm";


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
                <Form.Label htmlFor="content">Message Content</Form.Label>
                <Form.Control
                    data-testid={testIdPrefix + "-content"}
                    id="content"
                    type="text"
                    isInvalid={Boolean(errors.Content)}
                    {...register("content", {
                        required: "Content is required.",
                    })}
                    placeholder="Message"
                    defaultValue={initialContents?.content}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.content?.message}
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

export default ChatMessageForm;