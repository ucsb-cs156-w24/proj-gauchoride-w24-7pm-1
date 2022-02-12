import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function UCSBDateForm({ ucsbDate, submitAction }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: ucsbDate || {},
    });

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks
    const isodate_regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/i;

    const yyyyq_regex = /((19)|(20))\d{2}[1-4]/i; // Accepts from 1900-2099 followed by 1-4.  Close enough.

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {ucsbDate && (
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        id="id"
                        type="text"
                        isInvalid={!!errors.id}
                        {...register("id")}
                        value={ucsbDate.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3">
                <Form.Label htmlFor="quarterYYYYQ">Quarter YYYYQ</Form.Label>
                <Form.Control
                    id="quarterYYYYQ"
                    type="text"
                    isInvalid={!!errors.quarterYYYYQ}
                    {...register("quarterYYYYQ", { required: true, pattern: yyyyq_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.quarterYYYYQ?.message}{' '}
                    {errors.quarterYYYYQ && 'QuarterYYYYQ is required.'}{' '}
                    {errors.quarterYYYYQ &&
                        errors.quarterYYYYQ.type === 'pattern' &&
                        'QuarterYYYYQ must be in the format YYYYQ, e.g. 20224 for Fall 2022'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    id="name"
                    type="text"
                    isInvalid={!!errors.name}
                    {...register("name", {
                        required: "name is required"
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="localDateTime">Date (iso format)</Form.Label>
                <Form.Control
                    id="localDateTime"
                    type="text"
                    isInvalid={!!errors.localDateTime}
                    {...register("localDateTime", { required: true, pattern: isodate_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.localDateTime?.message}{' '}
                    {errors.localDateTime && 'localDateTime is required.'}{' '}
                    {errors.localDateTime &&
                        errors.localDateTime.type === 'pattern' &&
                        'localDateTime must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Create</Button>
            <Button variant="Secondary" onClick={() => navigate(-1)}>Cancel</Button>

        </Form>

    )
}

export default UCSBDateForm;
