
import React from 'react';

import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";


// Signature of ContextTemplate may look fancy but it's just 
// a function that takes a component and returns a new component
// See: https://stackoverflow.com/a/31757397

const ContextTemplate = (WrappedComponent) => (args) => {

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <WrappedComponent {...args} />
            </MemoryRouter>
        </QueryClientProvider>
    );
}

export default ContextTemplate;
