import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import TodosIndexPage from "main/pages/Todos/TodosIndexPage";


describe("TodosIndexPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <TodosIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

});


