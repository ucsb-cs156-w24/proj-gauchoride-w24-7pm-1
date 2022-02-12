import { render, waitFor } from "@testing-library/react";
import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm";
// import { createMemoryHistory } from "history";

import { BrowserRouter as Router } from "react-router-dom";

describe("UCSBDateForm tests", () => {

    test("renders correctly ", async () => {
        // const history = createMemoryHistory();

        const { getByText } = render(
            <Router /* history={history} */ >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Quarter YYYYQ/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a UCSBDate ", async () => {
        // const history = createMemoryHistory();

        const UCSBDate = {
            
        }

        const { getByText } = render(
            <Router /* history={history} */ >
                <UCSBDateForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Quarter YYYYQ/)).toBeInTheDocument());
    });

});


