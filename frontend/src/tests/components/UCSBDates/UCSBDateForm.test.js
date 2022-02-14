import { render, waitFor, fireEvent } from "@testing-library/react";
import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm";
import { ucsbDatesFixtures } from "fixtures/ucsbDatesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("UCSBDateForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Quarter YYYYQ/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a UCSBDate ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <UCSBDateForm initialUCSBDate={ucsbDatesFixtures.oneDate} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/UCSBDateForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/UCSBDateForm-id/)).toHaveValue("1");
    });


    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBDateForm-quarterYYYYQ")).toBeInTheDocument());
        const quarterYYYYQField = getByTestId("UCSBDateForm-quarterYYYYQ");
        const localDateTimeField = getByTestId("UCSBDateForm-localDateTime");
        const submitButton = getByTestId("UCSBDateForm-submit");

        fireEvent.change(quarterYYYYQField, { target: { value: 'bad-input' } });
        fireEvent.change(localDateTimeField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/QuarterYYYYQ must be in the format YYYYQ/)).toBeInTheDocument());
        expect(getByText(/localDateTime must be in ISO format/)).toBeInTheDocument();
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBDateForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("UCSBDateForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/QuarterYYYYQ is required./)).toBeInTheDocument());
        expect(getByText(/Name is required./)).toBeInTheDocument();
        expect(getByText(/LocalDateTime is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <UCSBDateForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBDateForm-quarterYYYYQ")).toBeInTheDocument());

        const quarterYYYYQField = getByTestId("UCSBDateForm-quarterYYYYQ");
        const nameField = getByTestId("UCSBDateForm-name");
        const localDateTimeField = getByTestId("UCSBDateForm-localDateTime");
        const submitButton = getByTestId("UCSBDateForm-submit");

        fireEvent.change(quarterYYYYQField, { target: { value: '20221' } });
        fireEvent.change(nameField, { target: { value: 'noon on January 2nd' } });
        fireEvent.change(localDateTimeField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/QuarterYYYYQ must be in the format YYYYQ/)).not.toBeInTheDocument();
        expect(queryByText(/localDateTime must be in ISO format/)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBDateForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("UCSBDateForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


