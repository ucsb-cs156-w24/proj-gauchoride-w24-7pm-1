import { render } from "@testing-library/react";
import TodosCreatePage from "main/pages/Todos/TodosCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

describe("TodosCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TodosCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

});


