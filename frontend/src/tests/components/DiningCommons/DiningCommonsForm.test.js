import { render, waitFor, fireEvent } from "@testing-library/react";
import DiningCommonsForm from "main/components/DiningCommons/DiningCommonsForm";
import { diningCommonsFixtures } from "fixtures/diningCommonsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("DiningCommonsForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <DiningCommonsForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Name/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a Commons ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <DiningCommonsForm initialCommons={diningCommonsFixtures.oneDiningCommons}  buttonLabel={"Update"} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/DiningCommonsForm-code/)).toBeInTheDocument());
        expect(getByText(/Code/)).toBeInTheDocument();
        await waitFor( () => expect(getByTestId(/DiningCommonsForm-code/)).toHaveValue("carrillo") );
    });


    test("Correct Error messsages when latitude and longitude exceed the max", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <DiningCommonsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("DiningCommonsForm-code")).toBeInTheDocument());

        const latitudeField = getByTestId("DiningCommonsForm-latitude");
        const longitudeField = getByTestId("DiningCommonsForm-longitude");
        const submitButton = getByTestId("DiningCommonsForm-submit");

        fireEvent.change(latitudeField, { target: { value: '9999' } });
        fireEvent.change(longitudeField, { target: { value: '8888' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/latitude should be between -90 and 90/)).toBeInTheDocument());
        expect(getByText(/longitude should be between -180 and 180/)).toBeInTheDocument();
        expect(getByText(/Code is required/)).toBeInTheDocument();
    });


    test("Correct Error messsages when latitude and longitude are below the min", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <DiningCommonsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("DiningCommonsForm-code")).toBeInTheDocument());
   
        const latitudeField = getByTestId("DiningCommonsForm-latitude");
        const longitudeField = getByTestId("DiningCommonsForm-longitude");
        const submitButton = getByTestId("DiningCommonsForm-submit");

        fireEvent.change(latitudeField, { target: { value: '-9999' } });
        fireEvent.change(longitudeField, { target: { value: '-8888' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/latitude should be between -90 and 90/)).toBeInTheDocument());
        expect(getByText(/longitude should be between -180 and 180/)).toBeInTheDocument();
        expect(getByText(/Code is required/)).toBeInTheDocument();
    });

    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <DiningCommonsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("DiningCommonsForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("DiningCommonsForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


